import React = require('external/react');
import cx = require('external/classnames');
import * as requireCssWithComponent from 'modules/clean/react/css';

import {ArborButtonAnchor} from 'modules/clean/react/arbor/elements/arbor_buttons';
import {ArborImageLink} from 'modules/clean/react/arbor/elements/arbor_links';

/*
This file contains three elements that are all related to the expandable nav group found in the
supernav:
1. ExpandableNavIcon (aka the hamburger icon for you buzzword-loving developers)
2. ArborExpandableChildNavMenu
   This is a list of child dropdown links that are meant to be placed inside ArborExpandableNavMenu
3. ArborExandableNavMenu
   The main container for the expandable nav, open/closed state management and high-level
   list of links
*/

// Expandable nav is only to be used on Supernav, which is why you're seeing it declared here.
interface ExpandableNavIconProps extends React.Props<ArborExpandableNavIconElement> {
  onHamburgerClick: () => void;
  expanded?: boolean;
  className?: string; // Use this to pass in a breakpoint class (hide or show)
}

export class ArborExpandableNavIconElement extends React.Component<ExpandableNavIconProps, {}> {
  private handleHamburgerClick(e: MouseEvent) {
    e.preventDefault();

    this.props.onHamburgerClick();
  }

  public render() {
    const hamburgerClassNames = cx({
      'hamburger-helper': true,
      'hamburger-helper--expanded': this.props.expanded
    }, this.props.className);

    return (
      <a
        onClick={this.handleHamburgerClick.bind(this)}
        className={hamburgerClassNames}
        href="#"
      >
        <div className="hamburger-helper__container">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </a>
    );
  }
}

export const ArborExpandableNavIcon = requireCssWithComponent(
  ArborExpandableNavIconElement, ['/static/css/arbor/elements/expandable-nav-icon.css']
);

// The dropdown menu used for children in the dropdown. Yes, so meta.
interface ArborExpandableChildNavMenuProps extends React.Props<ArborExpandableChildNavMenuElement> {
  linkContent: any;
}

interface ArborExpandableChildNavMenuState {
  childDropdownExpanded?: boolean;
}

export class ArborExpandableChildNavMenuElement extends React.Component<ArborExpandableChildNavMenuProps, ArborExpandableChildNavMenuState> {
  constructor(){
    super();

    // Define state
    this.state = {childDropdownExpanded: false};
  }

  private renderChildLinks(item: any, index: number) {
    return (
      <li key={index} className="expandable-child-nav__list-item">
        <a href={item.url} className="expandable-child-nav__link">
          {item.title}
        </a>
      </li>
    );
  }

  private handleChildDropdownLink(e: MouseEvent) {
    e.preventDefault();

    this.setState({childDropdownExpanded: !this.state.childDropdownExpanded});
  }

  public render() {
    let childLinkList: {}[] = [];

    childLinkList.push(
      this.props.linkContent.children.map(
        (item: {title: string, url: string}, index: number) => this.renderChildLinks(item, index)
      )
    );

    const parentLinkClasses = cx({
      'hamburger-menu__link': true,
      'expandable-child-nav__parent-link': true,
      'expandable-child-nav__parent-link--expanded': this.state.childDropdownExpanded
    });

    const childLinkListClasses = cx({
      'expandable-child-nav': true,
      'expandable-child-nav--expanded': this.state.childDropdownExpanded
    });

      return (
        <div>
          <a
            href="#"
            className={parentLinkClasses}
            onClick={this.handleChildDropdownLink.bind(this)}
          >
            {this.props.linkContent.title}
          </a>

          <ul className={childLinkListClasses}>
            {childLinkList}
          </ul>
        </div>
      );
  }
}

export const ArborExpandableChildNavMenu = requireCssWithComponent(
  ArborExpandableChildNavMenuElement, ['/static/css/arbor/elements/expandable-child-nav.css']
);

// This is the actual dropdown menu that will be mapped to the hamburger icon in the parent
interface ArborExpandableNavMenuProps extends React.Props<ArborExpandableNavMenuElement> {
  expanded?: boolean;
  linkContent: {}[];
  buttonContent?: {title: string, url: string} | null;
  className?: string; // Use this to pass in a breakpoint class (hide or show)
}

export class ArborExpandableNavMenuElement extends React.Component<ArborExpandableNavMenuProps, {}> {
  private renderLinks(item: any, index: number) {
    let renderedLink: JSX.Element | Element | null = null;

    // Contact links contain a type attribute, so we'll use this as the defining
    // conditional characteristic
    let isContactLink: boolean = item.type ? true : false;

    if (isContactLink) {
      renderedLink = (<ArborImageLink linkItem={item} className='hamburger-menu__link' />);
    } else {
      if (item.children) {
        renderedLink = (<ArborExpandableChildNavMenu linkContent={item} />);
      } else {
        // At this point, the item should have a title and a url.
        // Enforce the item structure
        renderedLink = (<a href={item.url} className='hamburger-menu__link'>{item.title}</a>);
      }
    }

    return (
      <li className='hamburger-menu__list-item' key={index}>
        {renderedLink}
      </li>
    );
  }

  public render() {
    const hamburgerClassNames = cx({
      'hamburger-menu': true,
      'hamburger-menu--expanded': this.props.expanded
    }, this.props.className);

    interface LinkItem {
      title: string;
      url?: string;
      children: {}[];
    }

    // Define the button
    let button: JSX.Element | Element | null = null;
    if (this.props.buttonContent) {
      button = (
        <ArborButtonAnchor
          href={this.props.buttonContent.url}
          importance="primary" // Design decision to always have the expanded button be primary
        >
          {this.props.buttonContent.title}
        </ArborButtonAnchor>
      );
    }

    // Define list of links
    let linkContent: (Object | string)[][] = [];

    if (this.props.linkContent) {
      linkContent.push(
        this.props.linkContent.map(
          (item: LinkItem, index: number) => this.renderLinks(item, index)
        )
      );
    }

    return (
      <section className={hamburgerClassNames}>
        <div className="hamburger-menu__list-container">
          <ul className='hamburger-menu__list'>
            {linkContent}
          </ul>

          {button}
        </div>
      </section>
    );
  }
}

export const ArborExpandableNavMenu = requireCssWithComponent(
  ArborExpandableNavMenuElement, ['/static/css/arbor/elements/expandable-nav.css']
);
