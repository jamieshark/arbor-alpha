import React = require('external/react');
import cx = require('external/classnames');

interface ArborExpanderProps extends React.Props<ArborExpander> {
    expanderText?: string;
    indentContent?: boolean;
    animateClass?: string;
    className?: string;
}
/*
 * Expanders
 */
 // Expanders toggle the child elements it contains
 // indentChild property
export class ArborExpander extends React.Component<ArborExpanderProps, any> {
    public componentWillMount () {
        this.setState({
            open: false
        });
    }

    public handleExpanderClick(e:any) {
        e.preventDefault();
        this.setState({
            open: !this.state.open
        });
    }

    public render() {
        const expanderContainerClassName = cx({
            'expander__container': true,
        });

        const expanderClassName = cx({
            'expander__switch': true,
            'expander__switch--open': this.state.open,
        }, this.props.className);

        const contentClassName = cx({
            'expander__content': true,
            'expander__content--indented': Boolean(this.props.indentContent),
            'expander__content--visible': this.state.open
        });

        return (
            <div className={expanderContainerClassName}>
                <a
                    className={expanderClassName}
                    onClick={this.handleExpanderClick.bind(this)}
                    href='#'
                >
                    {this.props.expanderText}
                </a>

                <div className={contentClassName}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
