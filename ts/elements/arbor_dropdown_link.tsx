import React = require('external/react');
import cx = require('external/classnames');
import * as requireCssWithComponent from 'modules/clean/react/css';

import {ArborImageLink} from 'modules/clean/react/arbor/elements/arbor_links';

interface DropdownLink {
    type: string;
    title: string;
    url: string;
    clickHandler?: () => void;
}

interface ArborDropdownLinkProps extends React.Props<ArborDropdownLinkElement> {
    className?: string;
    dropdownContent?: any;
    id: number;
    isExpanded: boolean;
    onDropdownClick: (id: number) => void;
    title: string;
}

export class ArborDropdownLinkElement extends React.Component<ArborDropdownLinkProps, {}> {
    constructor() {
        super();
    }

    private handleDropdownClick(e: MouseEvent) {
        e.preventDefault();

        this.props.onDropdownClick(this.props.id);
    }

    private renderDropdownLink(item: DropdownLink, index: number) {
        let renderedLink: JSX.Element | Element | null = null;

        // Contact links contain a type attribute, so we'll use this as the defining
        // conditional characteristic
        let isContactLink: boolean = item.type ? true : false;

        if (isContactLink) {
            renderedLink = (
                <ArborImageLink linkItem={item} className='dropdown__content-link' />
            );
        } else {
            renderedLink = (
                <a className='dropdown__content-link' href={item.url}>
                    {item.title}
                </a>
            );
        }

        return (
            <li key={index} className='dropdown__content-list-item'>
                {renderedLink}
            </li>
        );
    }

    private renderDropdownContent(content: any) {
        let dropdownContent: JSX.Element | Element | {};

        if (this.props.children) {
            dropdownContent = this.props.children;
        } else {
            dropdownContent = (
                <ul className='dropdown__content-list'>
                    {content.map((item: DropdownLink, index:number) =>
                        this.renderDropdownLink(item, index)
                    )}
                </ul>
            );
        }

        return dropdownContent;
    }

    public render() {
        let dropdownElementContainerClasses = cx({
            'dropdown__container': true,
        }, this.props.className);

        let linkClasses = cx({
            'dropdown__link': true,
            'dropdown__link--open': this.props.isExpanded,
        });

        let dropdownContainerClasses = cx({
            'dropdown__dropdown-container': true,
            'dropdown__dropdown-container--open': this.props.isExpanded,
        });

        let hasCustomChildren: boolean = this.props.children ? true : false;

        let dropdownClasses = cx({
            'dropdown__dropdown': true,
            'dropdown__dropdown--visible': this.props.isExpanded,
            'dropdown__dropdown--custom-content': hasCustomChildren, // If we're not  rendering a
            // preset link list, then we add padding added by said link list.
        });

        return (
            <div className={dropdownElementContainerClasses}>
                <a
                    className={linkClasses}
                    onClick={this.handleDropdownClick.bind(this)}
                    href='#'
                >
                    {this.props.title}
                </a>

                <div className={dropdownContainerClasses}>
                    <div className={dropdownClasses}>
                        {this.renderDropdownContent(this.props.dropdownContent)}
                    </div>
                </div>
            </div>
        );
    }
}

export const ArborDropdownLink = requireCssWithComponent(
    ArborDropdownLinkElement, ['/static/css/arbor/elements/dropdown.css']
);
