import React = require('external/react');
import cx = require('external/classnames');

// Utils
import * as requireCssWithComponent from 'modules/clean/react/css';
import * as Viewer from 'modules/clean/viewer';
import * as User from 'modules/clean/user';

// Components
import {ArborButtonAnchor} from 'modules/clean/react/arbor/elements/arbor_buttons';
import {ArborDropdownLink} from 'modules/clean/react/arbor/elements/arbor_dropdown_link';
import {ArborExpandableNavIcon, ArborExpandableNavMenu} from 'modules/clean/react/arbor/elements/arbor_expandable_nav';
import {ArborImageLinks} from 'modules/clean/react/arbor/elements/arbor_links';
import {ArborAccountMenu} from 'modules/clean/react/arbor/elements/arbor_account_menu';

interface NavLink {
  title: string;
  url?: string;
  children?: JSX.Element | Element | null;
}

// Supernav
interface ArborSuperNavProps extends React.Props<ArborSuperNavElement> {
  className?: string;
  contactLinks?: {type: string, title: string, url: string}[] | null; // Specifically used to render the contact links
  // (paired with icons). Example can be found on /business
  fixed?: boolean; // Header scrolls as you do
  leftAlignLogo?: boolean;
  legacyUI?: boolean; // Temporary prop that adds legacy UI to Business header for testing purposes
  logo: JSX.Element | Element;
  navCTA?: {title: string, url: string} | null;
  navLinksLeft?: {}[] | null;
  navLinksRight?: {}[] | null;
  onNavLinkClick?: any;
  onSelectUser?: (e: any, subjectUid: any) => void; // What you want to do when a user changes their role
  renderAccountMenu?: boolean; // Renders the avatar and account menu. You need to pass in viewer and user.
  user?: User; // Needed for renderAccountMenu
  viewer?: Viewer; // Needed for renderAccountMenu
  expCTAHover?: string | boolean | null; // EXPERIMENT (tylerryan): subgrowth_biz_all_cta_hover
}

interface ArborSuperNavState {
  mobileMenuExpanded?: boolean;
  activeDropdown?: number | null;
  scrolled?: boolean;
}

export class ArborSuperNavElement extends React.Component<ArborSuperNavProps, ArborSuperNavState> {
  constructor(){
    super();

    // Define state
    this.state = {
      mobileMenuExpanded: false,
      activeDropdown: null,
      scrolled: false,
    };
  }

  private componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  private componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  private handleScroll(event: MouseEvent) {
    const scrollThreshold = 350;
    let scrollDistance = window.pageYOffset;
    let scrolledPastThreshold: boolean = false;

    if (scrollDistance >= scrollThreshold) {
      // Adding this additional check because we don't want to continue assigning this variable if
      // we don't need to.
      if (scrolledPastThreshold === false) {
        scrolledPastThreshold = !scrolledPastThreshold;
      }
    } else {
      scrolledPastThreshold = false;
    }

    this.setState({
      scrolled: scrolledPastThreshold
    });
  }

  private handleDropdownClick(id: number) {
    let newState: {} = {};

    if (this.state.activeDropdown === id) {
      newState = {
        activeDropdown: null
      };
    } else {
      newState = {
        activeDropdown: id
      };
    }

    this.setState(newState);
  }

  private renderLinkByType(item: NavLink, index:number) {
    // We render either plain text links or dropdowns.
    let renderedLink: JSX.Element | Element;

    if (item.children) {
      let isExpanded = this.state.activeDropdown === index ? true : false;

      let dropdownLinks = cx({
        'supernav__link': true,
        'dropdown__container--no-cta': this.props.navCTA ? false : true, // If the dropdown
        // is the rightmost item (meaning no button), we add some specific positioning for
        // the dropdown
      });

      renderedLink = (
        <ArborDropdownLink
          title={item.title}
          className={dropdownLinks}
          dropdownContent={item.children}
          isExpanded={isExpanded}
          id={index}
          onDropdownClick={this.handleDropdownClick.bind(this)}
        />
      );
    } else {
      renderedLink = (
        <a
          className='supernav__link'
          href={item.url}>
          {item.title}
        </a>
      );
    }

    return (
      <li key={index} className="supernav__list-item">
        {renderedLink}
      </li>
    );
  }

  public renderNavLinks(navArray: {}[]) {
    // Takes an array of links that we'll parse as links
    let navItems = navArray.map((item:NavLink, index:number) => this.renderLinkByType(item, index));

    return (
      <ul className="supernav__section-list">
        {navItems}
      </ul>
    );
  }

  public renderNavButton(buttonInfo: {title: string, url: string}) {
    let importance: "primary" | "secondary" | undefined = "secondary";

    if (this.state.scrolled) {
      importance = "primary";
    }

    return (
      <ArborButtonAnchor
        href={buttonInfo.url}
        importance={importance}
        expCTAHover={this.props.expCTAHover} // EXPERIMENT (tylerryan): subgrowth_biz_all_cta_hover
      >
        {buttonInfo.title}
      </ArborButtonAnchor>
    );
  }

  private handleHamburgerClick() {
    // Manages the state for mobile nav
    this.setState({mobileMenuExpanded: !this.state.mobileMenuExpanded});
  }

  public render() {
    // Assign immutable properties to constants
    const logoOnLeft = this.props.leftAlignLogo || this.props.contactLinks;
    const renderLeftSection = this.props.navLinksLeft && !logoOnLeft;
    const renderRightSection = this.props.navLinksRight || this.props.navCTA || this.props.contactLinks;
    const renderLeftAndRight = renderLeftSection && renderRightSection;
    const logoOnly = !renderLeftSection && !this.props.navLinksRight && !this.props.navCTA;
    const atLeastThreeSections = (this.props.navCTA && renderLeftSection) || renderLeftAndRight;

    // Setting conditional elements to null before we set them. This is because some of them
    // may never be set and we want to make sure we're at least setting them as null.
    let leftNavSection: JSX.Element | Element | null = null;
    let rightNavSection: JSX.Element | Element | null = null;
    let buttonElement: JSX.Element | Element | {} | null = null;
    let navLinksRight: JSX.Element | Element | null = null;
    let navLinksLeft: JSX.Element | Element | null | undefined = null;

    // There's a lot of complex logic here in order to account for both a left aligned logo
    // and a centered header and also the alignment when not all sections are provided
    const headerClassName = cx({
      'supernav__container': true,
      'supernav__container--expanded': this.state.mobileMenuExpanded,
      'supernav__container--fixed': this.props.fixed,
      'supernav__container--legacy-ui': this.props.legacyUI
    }, this.props.className);

    const headerSectionClassName = cx({
      'supernav': true, // Default class for supernav
      'supernav--x-right': !atLeastThreeSections && !logoOnly && !logoOnLeft, // With links on the right only
      'supernav--x-center': logoOnly && !logoOnLeft, // No links, only logo
      'supernav--x-bookend': Boolean(!atLeastThreeSections && logoOnLeft), // Logo on the left, links on the right
    });

    // supernav__section--center: center the logo if it's not left aligned
    // supernav__section--x-left: this will place the section to the left
    // supernav__section--1-3: if there aren't at least 3 sections and the logo is centered
    const logoSectionClassName = cx({
      'supernav__section': true,
      'supernav__section--center': !logoOnLeft,
      'supernav__section--x-left': Boolean(logoOnLeft),
      'supernav__section--1-3': !atLeastThreeSections && !logoOnLeft
    });
    const outerSectionClassName = cx({
      'supernav__section': true,
      'supernav__section--1-3': !atLeastThreeSections && !logoOnLeft // if there aren't at least 3 sections
    });

    let logoNavSection = (
      <div className={logoSectionClassName}>
        {this.props.logo}
      </div>
    );

    // render the left section if we have links on the left
    // NOTE: If you decide to set leftAlignLogo to true AND you also provide
    // a number of links for the left hand side, the links will actually render
    // in the center of the header due to the nature of the ordering of the sections
    // Better to just stick all the links into navLinksRight
    // As a catchall, the links will be appended to the right section
    if (renderLeftSection && this.props.navLinksLeft) {
      navLinksLeft = this.renderNavLinks(this.props.navLinksLeft);

      leftNavSection = (
        <div className={outerSectionClassName}>
          {navLinksLeft}
        </div>
      );
    }

    // render the right section if we have either a CTA or right links
    let expandableNavMenu: JSX.Element | Element | null = null;
    let expandableNavIcon: JSX.Element | Element | null = null;

    if (renderRightSection) {
      buttonElement = this.props.navCTA ? this.renderNavButton(this.props.navCTA) : null;

      // if right-side links were provided
      // render the links and button in the same section
      if (this.props.contactLinks) {
        navLinksRight = (
          <ArborImageLinks
            linksToRender={this.props.contactLinks}
            className="large-show--flex base-hide"
          />
        );
      } else if (this.props.navLinksRight) {
        navLinksRight = this.renderNavLinks(this.props.navLinksRight);
      }

      // if left-side links were provided to a header that aligns to the left, they'll render
      // in the right section, adjacent to the right links otherwise, it returns null because
      // we don't want to repeat a section. If the dev specifies they want the contactLinks
      // to render, we won't render the leftNavLinks either.
      if (this.props.navLinksLeft && logoOnLeft && !this.props.contactLinks) {
        navLinksLeft = this.renderNavLinks(this.props.navLinksLeft);
      } else {
        navLinksLeft = null;
      }

      // Check for a left-aligned logo as that is the only Supernav version that renders a mobile menu
      if (logoOnLeft) {
        expandableNavIcon = (
          <ArborExpandableNavIcon
            onHamburgerClick={this.handleHamburgerClick.bind(this)}
            expanded={this.state.mobileMenuExpanded}
            className="large-hide"
          />
        );

        let expandableNavContent: any;

        if (this.props.contactLinks) {
          expandableNavContent = this.props.contactLinks;
        } else {
          expandableNavContent = this.props.navLinksRight;
        }

        expandableNavMenu = (
          <ArborExpandableNavMenu
            expanded={this.state.mobileMenuExpanded}
            linkContent={expandableNavContent}
            buttonContent={this.props.navCTA ? this.props.navCTA : null}
            className="large-hide"
          />
        );
      }

      // If account menu, we will only render that. Otherwise, we'll render everything else.
      if (this.props.renderAccountMenu) {
        rightNavSection = (
          <div className={outerSectionClassName}>
            <ArborAccountMenu
              user={this.props.user}
              viewer={this.props.viewer}
              showAccountSwitcher={true}
              onSelectUser={this.props.onSelectUser}
            />
          </div>
        );
      } else {
        rightNavSection = (
          <div className={outerSectionClassName}>
            {navLinksLeft}

            {navLinksRight}

            {buttonElement}

            {expandableNavIcon}
          </div>
        );
      }
    }

    // This is the actual header syntax that will be rendered on the page. We define this as a variable because
    // we need to wrap it and add additional syntax if the fixed prop is true
    let header = (
      <header className={headerClassName}>
        <section className={headerSectionClassName}>
          {leftNavSection}

          {logoNavSection}

          {rightNavSection}
        </section>

        {expandableNavMenu}
      </header>
    );

    if (this.props.fixed) {
      header = (
        <div>
          {header}

          <div className="supernav__fixed-dummy"></div>
        </div>
      );
    }

    return header;
  }
}

export const ArborSuperNav = requireCssWithComponent(
  ArborSuperNavElement, ['/static/css/arbor/elements/supernav.css']
);
