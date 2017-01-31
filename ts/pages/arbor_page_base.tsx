/// <amd-dependency path="external/react-redux" name="ReactRedux" />

import React = require('external/react');
import cx = require('external/classnames');
import _ = require('external/underscore');

import {ArborButtonsPage} from 'modules/clean/react/arbor/pages/buttons_page';
import {ArborColorPage} from 'modules/clean/react/arbor/pages/color_page';
import {ArborFormPage} from 'modules/clean/react/arbor/pages/form_page';
import {ArborGridPage} from 'modules/clean/react/arbor/pages/grid_page';
import {ArborNavPage} from 'modules/clean/react/arbor/pages/nav_page';
import {ArborOverviewPage} from 'modules/clean/react/arbor/pages/overview_page';
import {ArborTypePage} from 'modules/clean/react/arbor/pages/type_page';

import {ArborSuperNav} from 'modules/clean/react/arbor/elements/arbor_supernav';
import {ArborLogo} from 'modules/clean/react/arbor/elements/arbor_logo';

import * as Viewer from 'modules/clean/viewer';

// external/react-redux
declare const ReactRedux: any;
const { connect } = ReactRedux;

interface ArborPageProps extends React.Props<ArborPageBaseComponent> {
    pageTitle: string;
    pageDescription: string;
    currentPage: string;
    onNavLinkClick: any;
    handleHashChange: any;
    toggleSideNav: any;
    sideNavHide: boolean;
    navArray: Array<any>;
    inputStates: any;
    onTabClick: any;
    toggleCheckbox: any;
    setRadioValue: any;
    onInputChange: any;
    subNavStates: any;
}

export class ArborPageBaseComponent extends React.Component<ArborPageProps, any> {
    static contextTypes: React.ValidationMap<any> = {
      store: React.PropTypes.object.isRequired
    };

    protected getSubNav(pageHash:any) {
        const navArray = this.props.navArray;
        const idx = _.findIndex(navArray, function(page) {
            return page.hash === pageHash;
        });
        return _.property('subnav')(navArray[idx]);
    }

    public componentDidMount() {
        // TODO(jac): janky fix to redirect to the correct view on load
        this.props.handleHashChange();
        window.addEventListener('hashchange', this.props.handleHashChange, false);
    }

    public renderNavList() {
        let navItems = this.props.navArray.map((item, index) => (
            <a
                className='arbor__nav-link type--copy-standard'
                key={index}
                onClick={e => this.props.onNavLinkClick(item.hash)}
                href={`#${item.hash}`}>
                {item.title}
            </a>
        ));

        return navItems;
    }

    public renderPage(pageHash:any) {
        const {
            navArray,
            inputStates,
            onTabClick,
            subNavStates,
            toggleCheckbox,
            setRadioValue,
            onInputChange
        } = this.props;
        const subNav = this.getSubNav(pageHash);
        const viewer = Viewer.get_viewer();

        switch (pageHash) {
            case 'overview':
                return (<ArborOverviewPage navArray={navArray} />);
            case 'grid':
                return (
                    <ArborGridPage
                        inputStates={inputStates}
                        tabArray={subNav}
                        onTabClick={onTabClick}
                        subNavStates={subNavStates}
                        toggleCheckbox={toggleCheckbox}
                        onInputChange={onInputChange}
                        setRadioValue={setRadioValue} />
                );
            case 'type':
                return (
                    <ArborTypePage />
                );
            case 'color':
                return (
                    <ArborColorPage />
                );
            case 'nav':
                return (
                    <ArborNavPage
                      inputStates={inputStates}
                      tabArray={subNav}
                      onTabClick={onTabClick}
                      toggleCheckbox={toggleCheckbox}
                      setRadioValue={setRadioValue}
                      subNavStates={subNavStates}
                      viewer={viewer}
                      user={viewer.get_users(false)[0]} // We want to grab only the first user
                    />
                );
            case 'form':
                return (
                    <ArborFormPage
                        inputStates={inputStates}
                        toggleCheckbox={toggleCheckbox}
                        setRadioValue={setRadioValue}
                        onInputChange={onInputChange} />

                );
            case 'buttons':
                return (<ArborButtonsPage
                            inputStates={inputStates}
                            toggleCheckbox={toggleCheckbox}
                            setRadioValue={setRadioValue}/>
                );
            default:
                return (<ArborOverviewPage navArray={navArray} />);
        }
    }

    public render() {
        const navClassNames = cx({
            'arbor__side-nav': true,
            'arbor__side-nav--show': !this.props.sideNavHide
        });

        const arborLogo = (
            <ArborLogo
                presetPlatform='arbor'
                glyphOnly={true}
            />
        );

        return (
            <main>
                <nav className={navClassNames}>
                    <div className='grid__container grid--x-bookend grid--y-middle arbor__side-nav--top'>
                        <a className='supernav__logo' href='/'>
                            <div className='supernav__link'></div>
                            <h1 className='supernav__nav-title type--title-4 type--first'>Arbor</h1>
                        </a>
                        <div className='arbor__nav-toggle' onClick={e => this.props.toggleSideNav()}>
                          <span className='arbro_nav-toggle-bun'></span>
                          <span className='arbro_nav-toggle-patty'></span>
                          <span className='arbro_nav-toggle-bun'></span>
                        </div>
                    </div>
                    <div className='grid__container grid__item--stack arbor__side-nav--links'>
                        {this.renderNavList()}
                    </div>
                </nav>
                <ArborSuperNav logo={arborLogo} />
                {this.renderPage(this.props.currentPage)}
            </main>
        );
    }
}

const mapStateToProps = (state:any) => state;

const mapDispatchToProps = (dispatch:any) => ({
    handleHashChange: () => {
        let location = window.location.hash.replace(/^#\/?|\/$/g, '').split('/');
        dispatch({ type: 'HASH.CHANGE', location: location });
    },
    onNavLinkClick: (pageHash:any) => {
        dispatch({ type: 'NAV.CLICK', page: pageHash });
    },
    toggleSideNav: () => {
        dispatch({ type: 'SIDENAV.TOGGLE' });
    },
    onTabClick: (e:any, tabIndex:any, key:any) => {
        dispatch({ type: 'SUBNAV.CLICK', selectedTabIndex: tabIndex, subNavKey: key });
    },
    toggleCheckbox: (e:any, checkboxName:any, checked:any) => {
        dispatch({ type: 'CHECKBOX.TOGGLE', checkboxName: checkboxName, checked: !checked });
    },
    setRadioValue: (e:any, radioGroupName:any, radioValue:any) => {
        dispatch({ type: 'RADIO.SELECT', radioGroupName: radioGroupName, radioValue: radioValue });
    },
    onInputChange: (e:any, name:any, value:any) => {
        dispatch({ type: 'INPUT.CHANGE', inputName: e.target.name, inputValue: e.target.value });
    }
});

export const ArborPageBase = connect(mapStateToProps, mapDispatchToProps)(ArborPageBaseComponent);
