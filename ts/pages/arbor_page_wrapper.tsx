/// <amd-dependency path="external/react-redux" name="ReactRedux" />

import React = require('external/react');
import * as Redux from 'external/redux';
import _ = require('external/underscore');

import {ArborPageBase} from 'modules/clean/react/arbor/pages/arbor_page_base';

// external/react-redux
declare const ReactRedux: any;
const { Provider } = ReactRedux;

export class ArborPageWrapper extends React.Component<any, any> {
    private store: Redux.Store<any>;

    private updateNestedState(prevState:any, nestedObjKey:any, updatedState:any) {
        let nestedStateObj:any = _.clone(prevState[nestedObjKey]);
        let newNestedState:any = _.extend(nestedStateObj, updatedState);
        let updateObj:any = {};
        updateObj[nestedObjKey] = newNestedState;
        return _.extend({}, prevState, updateObj);
    }

    public componentWillMount() {
        this.store = Redux.createStore(
            (state: any, action: any) => {
                switch (action.type) {
                    case 'SUBNAV.CLICK':
                        let newSubnavState:any = {};
                        newSubnavState[action.subNavKey] = action.selectedTabIndex;
                        return this.updateNestedState(state, 'subNavStates', newSubnavState);
                    case 'NAV.CLICK':
                        window.location.hash = action.page;
                        return _.extend({}, state, {
                            currentPage: action.page,
                            sideNavHide: true
                        });
                    case 'SIDENAV.TOGGLE':
                        return _.extend({}, state, {
                            sideNavHide: !this.store.getState().sideNavHide,
                        });
                    case 'SIDENAV.HIDE':
                        return _.extend({}, state, {
                            sideNavHide: true
                        });
                    case 'CHECKBOX.TOGGLE':
                        let newCheckState:any = {};
                        newCheckState[action.checkboxName] = action.checked;
                        return this.updateNestedState(state, 'inputStates', newCheckState);
                    case 'RADIO.SELECT':
                        let newRadioState:any = {};
                        newRadioState[action.radioGroupName] = action.radioValue;
                        return this.updateNestedState(state, 'inputStates', newRadioState);
                    case 'INPUT.CHANGE':
                        let newInputState:any = {};
                        newInputState[action.inputName] = action.inputValue;
                        return this.updateNestedState(state, 'inputStates', newInputState);
                    case 'HASH.CHANGE':
                        return _.extend({}, state, {
                            currentPage: action.location[0],
                            activeTabIndex: 0,
                            sideNavHide: true
                        });
                    default:
                        return state;
                }
            },
            {
                currentPage: 'overview',
                sideNavHide: true,
                navArray: [
                    {
                        title: 'Overview',
                        hash: 'overview'
                    },
                    {
                        title: 'Grid',
                        hash: 'grid',
                        subnav: [
                            'Column Grid',
                            'Vertical Spacings',
                            'Dividers',
                            'Grid Playground',
                            'Alignment Playground'
                        ]
                    },
                    {
                        title: 'Type',
                        hash: 'type'
                    },
                    {
                        title: 'Colors',
                        hash: 'color'
                    },
                    {
                        title: 'Navigation',
                        hash: 'nav',
                        subnav: ['Top Nav', 'Footer Nav', 'Tabs', 'Expanders']
                    },
                    {
                        title: 'Forms',
                        hash: 'form'
                    },
                    {
                        title: 'Buttons',
                        hash: 'buttons'
                    }
                ],
                // input states for forms on the demo site
                inputStates: {
                    checkbox1: true,
                    checkbox2: false,
                    radio1: 'bloop',
                    showGridLines: true,
                    header1links: true,
                    header1cta: true,
                    header1logo: false,
                    header1view: 'desktop',
                    header2links: true,
                    header2cta: true,
                    header2logo: false,
                    header2contact: false,
                    header2view: 'desktop',
                    button1Style: 'primary',
                    button1Width: 'wide',
                    select: 'elm',
                    gridNumColumns: 3,
                    gridXAlign: 'spaced',
                    gridYAlign: 'top',
                    alignmentSwap: false,
                    alignmentStack: 'side',
                    alignmentContainer: 'left',
                    alignmentImageX: 'left',
                    alignmentImageY: 'top',
                    alignmentCaptionWidth: 12,
                    alignmentCaptionX: 'left',
                    alignmentCaptionY: 'top'
                },
                // indices for tabs
                subNavStates: {
                    layout: 0,
                    navigation: 0,
                    fish: 0,
                    animal: 0
                }
            });
    }



    public render() {
        return (
            <Provider store={this.store}>
                <ArborPageBase />
            </Provider>
        );
    }
}
