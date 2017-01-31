import React = require('external/react');
import cx = require('external/classnames');

import * as requireCssWithComponent from 'modules/clean/react/css';
import * as i18n from 'modules/core/i18n';
const {_} = i18n;

interface ImageLinkMap {
  type: string;
  title: string;
  url: string;
  clickHandler?: () => void;
}

interface TypeMap {
  [key: string]: {
    iconSrc: string,
    title: string,
  };
}

interface ArborImageLinkProps extends React.Props<ArborImageLinkElement> {
  linkItem: ImageLinkMap;
  className?: string;
}

export class ArborImageLinkElement extends React.Component<ArborImageLinkProps, {}> {
  // Define the approved icon and alt sets for each contact link type
  public typeImageMap: TypeMap = {
    email: {
      iconSrc: '/static/images/arbor/icons/email.svg',
        title: _('Email'),
    },
    chat: {
      iconSrc: '/static/images/arbor/icons/chat.svg',
      title: _('Chat'),
    },
    phone: {
      iconSrc: '/static/images/arbor/icons/phone.svg',
      title: _('Call'),
    }
  };

  public render() {
    // define link content
    const linkItem: ImageLinkMap = this.props.linkItem;

    // get appropriate icon and title from typeImageMap for link content
    const typeData = this.typeImageMap[linkItem.type];

    const imageLinkClasses = cx({
      'image-link': true
    }, this.props.className);

    // Icon
    const imageLinkIcon = (
      <span className="image-link__icon-container">
        <img
          src={typeData.iconSrc}
          alt={typeData.title}
          className="image-link__icon-image"
        />
      </span>
    );

    // Text
    const imageLinkText = (
      <span className="image-link__text">{linkItem.title}</span>
    );

    // Create a wrappedItem element because the phone link is actually not a link. Yes, I know.
    // Talk to inbound sales if you're passionate enough about it.
    let wrappedItem: JSX.Element | Element | null = null;
    if (linkItem.type === 'phone') {
      wrappedItem = (
        <span className={imageLinkClasses}>
          {imageLinkIcon}

          {imageLinkText}
        </span>
      );
    } else {
      wrappedItem = (
        <a href={linkItem.url} className={imageLinkClasses} onClick={linkItem.clickHandler}>
          {imageLinkIcon}

          {imageLinkText}
        </a>
      );
    };

    return wrappedItem;
  }
}

export const ArborImageLink = requireCssWithComponent(
  ArborImageLinkElement, ['/static/css/arbor/elements/arbor-image-link.css']
);

// List
interface ArborImageLinksProps extends React.Props<ArborImageLinksElement> {
  linksToRender: ImageLinkMap[];
  className?: string;
}

export class ArborImageLinksElement extends React.Component<ArborImageLinksProps, {}> {
  public render() {
    let links = this.props.linksToRender.map(
      (item: ImageLinkMap, index: number) => (
        <li key={index} className="image-links__list-item">
          <ArborImageLink linkItem={item} />
        </li>
      )
    );

    const imageLinksClasses = cx({
      'image-links': true
    }, this.props.className);

    return (
      <ul className={imageLinksClasses}>
          {links}
      </ul>
    );
  }
}

export const ArborImageLinks = requireCssWithComponent(
  ArborImageLinksElement, ['/static/css/arbor/elements/arbor-image-links.css']
);
