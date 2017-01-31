import React = require('external/react');
import cx = require('external/classnames');

interface ArborTabsProps extends React.Props<ArborTabs> {
    tabArray: Array<any>;
    onTabClick: any;
    activeTabIndex?: number;
    subNavKey?: string;
    containContent?: boolean;
}

// tabs use the prop `onTabClick` to determine which of its children should be shown
// the event listener provides the tab index as one of the arguments so that parent handlers
// can access that value
// children should be nested within all at the same level for them to be indexed correctly
// you can also specify a subnav key that can uniquely identify the tab set that is emitting
// the event
// TODO: Accessibility stuff
export class ArborTabs extends React.Component<ArborTabsProps, any> {
    public renderTabs() {
        const {tabArray, onTabClick, activeTabIndex} = this.props;
        let navItems = tabArray.map((item, index) => {
            const tabClasses = cx({
                'tabnav__tab': true,
                'tabnav__tab--selected': index === activeTabIndex
            });

            return (
                <div
                    key={index}
                    className={tabClasses}
                    onClick={e => onTabClick(e, index, this.props.subNavKey)}
                >
                    {item}
                </div>
            );
        });

        return navItems;
    }

    public render() {
        const {activeTabIndex} = this.props;
        const tabContainerClassName = cx({
            'tabnav__container': true,
            'tabnav__container--contained': Boolean(this.props.containContent)
        });
        return (
            <div className={tabContainerClassName}>
                <nav className='tabnav__bar'>
                    {this.renderTabs()}
                </nav>
                <div className='tabnav__content'>
                    {
                        React.Children.map(this.props.children!,
                          (child: React.ReactElement<any>, index: number) => {
                            let tabContent = child;
                            if (index === activeTabIndex) {
                                return React.cloneElement(tabContent);
                            } else {
                                return null;
                            }
                          }
                        )
                    }
                </div>
            </div>
        );
    }
}
