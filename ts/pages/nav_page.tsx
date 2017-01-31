import React = require('external/react');

// Utils
import * as Viewer from 'modules/clean/viewer';
import * as User from 'modules/clean/user';

// Components
import {ArborCheckboxInput} from 'modules/clean/react/arbor/elements/arbor_inputs';
import {ArborButton} from 'modules/clean/react/arbor/elements/arbor_buttons';
import {ArborExpander} from 'modules/clean/react/arbor/elements/arbor_expander';
import {ArborSuperNav} from 'modules/clean/react/arbor/elements/arbor_supernav';
import {ArborLogo} from 'modules/clean/react/arbor/elements/arbor_logo';
import {ArborTabs} from 'modules/clean/react/arbor/elements/arbor_tabs';
import {ArborFooter} from 'modules/clean/react/arbor/elements/arbor_footer';


interface ArborNavPageProps extends React.Props<ArborNavPage> {
    onTabClick: any;
    inputStates: any;
    tabArray: Array<any>;
    subNavStates: any;
    toggleCheckbox: any;
    setRadioValue: any;
    viewer?: Viewer;
    user?: User;
}

export class ArborNavPage extends React.Component<ArborNavPageProps, any> {
    public renderNavLinks(navArray:any) {
        let navItems = navArray.map((item:any, index:any) => (
            <a
                className='supernav__link'
                key={index}
                href='#'>
                {item.title}
            </a>
        ));
        return navItems;
    }

    public renderSuperNavSection() {
        let navLinks = {
            'three-links': [
                {
                    title: 'Link left',
                    url: '#',
                }
            ],
            'links-sign-in-1': [
                {
                    title: 'Link right',
                    url: '#',
                }
            ],
            'links-sign-in-2': [
                {
                    title: 'Link one',
                    url: '#',
                },
                {
                    title: 'Link two',
                    url: '#',
                },
                {
                    title: 'Dropdown link',
                    children: [
                        {
                            title: 'Dropdown child link 1',
                            url: '#'
                        },
                        {
                            title: 'Dropdown child link 2',
                            url: '#'
                        },
                        {
                            title: 'Dropdown child link 3',
                            url: '#'
                        },
                    ]
                },
                {
                    title: 'Contact link dropdown',
                    children: [
                        {
                            type: 'email',
                            title: "Email",
                            url: 'mailto:dropbox@dropbox.com',
                        },
                        {
                            type: 'chat',
                            title: 'Chat',
                            url: '#'
                        },
                        {
                            type: 'phone',
                            title: '1-800-DROPBOX',
                            url: 'tel:1-800-DROPBOX'
                        },
                    ]
                }
            ],
            'sign-in': [
                {
                    title: 'Sign In',
                    url: '#',
                }
            ],
            'button': {
                title: 'Download',
                url: '/'
            },
            'contact-links': [
                {
                    type: 'email',
                    title: "Email",
                    url: 'mailto:dropbox@dropbox.com',
                },
                {
                    type: 'chat',
                    title: 'Chat',
                    url: '#'
                },
                {
                    type: 'phone',
                    title: '1-800-DROPBOX',
                    url: 'tel:1-800-DROPBOX'
                },
            ],
        };

        // Header bar uno
        let navLinksRight1 = this.props.inputStates.header1links ? navLinks['links-sign-in-1'] : null;
        let navLinksLeft1 = this.props.inputStates.header1links ? navLinks['three-links'] : null;
        let navCTA1 = this.props.inputStates.header1cta ? navLinks['button'] : null;
        let glyphOnly1 = this.props.inputStates.header1logo ? true : undefined;
        let accountMenu1 = this.props.inputStates.header1accountmenu ? true : false;

        // Header bar dos
        let navLinksRight2 = this.props.inputStates.header2links ? navLinks['links-sign-in-2'] : null;
        let navCTA2 = this.props.inputStates.header2cta ? navLinks['button'] : null;
        let glyphOnly2 = this.props.inputStates.header2logo ? true : undefined;
        let contactItems2 = this.props.inputStates.header2contact ? navLinks['contact-links'] : null;

        return (
            <div className='grid__section'>
                <div className='grid__container'>
                    <div className='grid__item grid__item-1-2 grid__item--stack'>
                        <h1 className='demo__title type--copy-large'>Centered Logo</h1>
                        <p className='type--copy-small'>
                            The center-aligned supernav can contain two sets of links on the left and right. The center-aligned supernav does not allow for contact links or an expandable nav on smaller screens (use the left-aligned supernav).
                        </p>
                    </div>
                    <div className='grid__item grid__item-1-2'>
                        <div className='grid__item grid__item--stack'>
                            <ArborCheckboxInput
                                name='header1links'
                                checked={this.props.inputStates.header1links}
                                onClick={this.props.toggleCheckbox}
                                labelText='With Links'
                                labelClassName='demo__element__input'
                            />
                            <ArborCheckboxInput
                                name='header1cta'
                                checked={this.props.inputStates.header1cta}
                                onClick={this.props.toggleCheckbox}
                                labelText='With CTA'
                                labelClassName='demo__element__input'
                            />
                            <ArborCheckboxInput
                                name='header1logo'
                                checked={this.props.inputStates.header1logo}
                                onClick={this.props.toggleCheckbox}
                                labelText='Glyph Only'
                                labelClassName='demo__element__input'
                            />
                            <ArborCheckboxInput
                                name='header1accountmenu'
                                checked={this.props.inputStates.header1accountmenu}
                                onClick={this.props.toggleCheckbox}
                                labelText='Account Bubble'
                                labelClassName='demo__element__input'
                            />
                        </div>
                    </div>
                </div>
                <ArborSuperNav
                    className='demo__header'
                    navLinksLeft={navLinksLeft1}
                    navLinksRight={navLinksRight1}
                    navCTA={navCTA1}
                    logo={<ArborLogo glyphOnly={glyphOnly1} />}
                    renderAccountMenu={accountMenu1}
                    viewer={this.props.viewer}
                    user={this.props.user}
                    onSelectUser={(e:any, subjectUid: any) => alert("You need to specify a click handler, smarty pants.")}
                />

                <hr className='divider' />

                <div className='grid__container'>
                    <div className='grid__item grid__item-1-2 grid__item--stack'>
                        <h1 className='demo__title type--copy-large'>Left Align Logo</h1>
                        <p className='type--copy-small'>
                            The left-aligned supernav gives more space to navigation items on the right. Unlike the center-aligned supernav, you can add contact items (paired with images), but they cannot be paired with other links. In addition, an expandable nav is shown by default on small screens.
                        </p>
                    </div>
                    <div className='grid__item grid__item-1-2'>
                        <div className='grid__item grid__item--stack'>
                            <ArborCheckboxInput
                                name='header2links'
                                checked={this.props.inputStates.header2links}
                                disabled={this.props.inputStates.header2contact}
                                onClick={this.props.toggleCheckbox}
                                labelText='With Links'
                                labelClassName='demo__element__input' />
                            <ArborCheckboxInput
                                name='header2cta'
                                checked={this.props.inputStates.header2cta}
                                onClick={this.props.toggleCheckbox}
                                labelText='With CTA'
                                labelClassName='demo__element__input' />
                            <ArborCheckboxInput
                                name='header2logo'
                                checked={this.props.inputStates.header2logo}
                                onClick={this.props.toggleCheckbox}
                                labelText='Glyph Only'
                                labelClassName='demo__element__input' />
                            <ArborCheckboxInput
                              name='header2contact'
                              checked={this.props.inputStates.header2contact}
                              disabled={this.props.inputStates.header2links}
                              onClick={this.props.toggleCheckbox}
                              labelText='Contact links'
                              labelClassName='demo__element__input'
                            />
                        </div>
                    </div>
                </div>
                <ArborSuperNav
                    className='demo__header'
                    navLinksRight={navLinksRight2}
                    navCTA={navCTA2}
                    leftAlignLogo={true}
                    logo={<ArborLogo glyphOnly={glyphOnly2} />}
                    contactLinks={contactItems2}
                />
                <hr className='divider' />
            </div>
        );
    }
    public renderFooterSection() {
        return (
            <div className='grid__section'>
                <div className='grid__container'>
                    <div className='grid__item grid__item--stack'>
                        <h1 className='demo__title type--copy-large'>Footer</h1>
                        <p className='type--copy-small'>Stuff about footers</p>
                    </div>
                </div>
                <div className='demo__footer demo__color--gray-30'>
                    <ArborFooter />
                </div>
            </div>
        );
    }
    public renderTabsSection() {
        return (
            <div className='grid__section'>
                <div className='grid__container'>
                    <div className='grid__container'>
                        <div className='grid__item grid__item--medium--fluid grid__item--stack'>
                            <h1 className='demo__title type--copy-large'>Standard tabs</h1>
                            <p className='type--copy-small'>Stuff about navigation</p>
                        </div>
                        <aside className='grid__item grid__item--medium--1-4 grid--vcjc demo__aside'>
                            <img className='demo__icon--success'
                                src='/static/images/arbor/inputs/icon-success.svg' />
                            tabs on tabs on tabs
                        </aside>
                    </div>
                    <div className='grid__container demo__element'
                          ref='code-snippet-example'>
                        <ArborTabs
                            tabArray={['One Fish', 'Two Fish']}
                            subNavKey='fish'
                            onTabClick={this.props.onTabClick}
                            activeTabIndex={this.props.subNavStates.fish}>
                            <div className='grid__container grid__container--p-large grid--vcjc'>
                                <img className='demo__icon'
                                src='/static/images/arbor/demo-assets/shark.svg' />
                            </div>
                            <div className='grid__container grid__container--p-large grid--vcjc'>
                                <img className='demo__icon'
                                src='/static/images/arbor/demo-assets/shark.svg' />
                                <img className='demo__icon'
                                src='/static/images/arbor/demo-assets/shark.svg' />
                            </div>
                        </ArborTabs>
                    </div>
                </div>
                <hr className='divider divider--section' />
                <div className='grid__container'>
                    <div className='grid__container'>
                        <div className='grid__item grid__item--stack'>
                            <h1 className='demo__title type--copy-large'>Container Tabs</h1>
                            <p className='type--copy-small'>Stuff about navigation</p>
                        </div>
                    </div>
                    <div className='grid__container demo__element'>
                        <ArborTabs
                            tabArray={['Bloop', 'Peep']}
                            subNavKey='animal'
                            onTabClick={this.props.onTabClick}
                            activeTabIndex={this.props.subNavStates.animal}
                            containContent={true}>
                            <div className='grid__container grid__container--p-large grid--vcjc'>
                                <img className='demo__icon'
                                    src='/static/images/arbor/demo-assets/fish.svg' />
                                <img className='demo__icon'
                                    src='/static/images/arbor/demo-assets/fish.svg' />
                                <img className='demo__icon'
                                    src='/static/images/arbor/demo-assets/fish.svg' />
                            </div>
                            <div className='grid__container grid__container--p-large grid--vcjc'>
                                <img className='demo__icon'
                                    src='/static/images/arbor/demo-assets/chick.svg' />
                                <img className='demo__icon'
                                    src='/static/images/arbor/demo-assets/chick.svg' />
                                <img className='demo__icon'
                                    src='/static/images/arbor/demo-assets/chick.svg' />
                            </div>
                        </ArborTabs>
                    </div>
                </div>
                <hr className='divider divider--section' />
            </div>
        );
    }
    public renderExpanderSection() {
        return (
            <div className='grid__section'>
                <div className='grid__container'>
                    <div className='grid__item grid__item--stack'>
                        <h1 className='demo__title type--copy-large'>Expanders</h1>
                        <p className='type--copy-small'>Stuff about expanders</p>
                    </div>
                </div>
                <div className='grid__container'>
                    <div className='grid__container demo__element grid--vcjc'>
                        <div className='grid__item--stack'>
                            <ArborExpander expanderText='Knock Knock' indentContent={true}>
                                <p>Who's there?</p>
                            </ArborExpander>
                            <ArborExpander expanderText='Banana' indentContent={true}>
                                <p>Banana who?</p>
                            </ArborExpander>
                            <ArborExpander
                                expanderText='There is always money' indentContent={true}>
                                <p>...in the banana stand.</p>
                            </ArborExpander>
                        </div>
                    </div>
                </div>
                <hr className='divider divider--section' />
            </div>
        );
    }
    public render () {
        return (
            <div className='grid__section'>
                <div className='grid__container '>
                    <div className='grid__item grid__item--stack'>
                        <h1 className='type--title-1'>Navigation</h1>
                    </div>
                </div>
                <ArborTabs
                    tabArray={this.props.tabArray}
                    onTabClick={this.props.onTabClick}
                    subNavKey='navigation'
                    activeTabIndex={this.props.subNavStates.navigation}>
                    {this.renderSuperNavSection()}
                    {this.renderFooterSection()}
                    {this.renderTabsSection()}
                    {this.renderExpanderSection()}
                </ArborTabs>
            </div>
        );
    }
}
