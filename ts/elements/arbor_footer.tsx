/// <amd-dependency path='modules/clean/react/css' name='requireCssWithComponent' />

import React = require('external/react');
import {_} from 'modules/core/i18n';

// CSS Utility
declare const requireCssWithComponent: any;

// Locale Selector
import * as locale_selector from 'modules/clean/react/locale_selector';
const {LocaleSelector} = locale_selector;

// importing content
import * as contentStore from 'modules/clean/react/basic/basic-footer-content-store';

export class ArborFooterComponent extends React.Component<any, void> {
  content:any;
  keys:any;

  constructor() {
    super();

    this.content = contentStore.getAllContent();
    this.keys = contentStore.getListKeys();
  }

  private renderLinkItem(linkData:any) {
    /* Generates the actual list of links */
    return (
      <li key={linkData.linkText} className='footer__link-list-item'>
        <a href='{linkData.linkHref}' className='footer__link'>
          {linkData.linkText}
        </a>
      </li>
    );
  }

  private renderSectionListItem(keyValue:any) {
    /* Generates the top level list item which is Header followed by
    list of links */
    let linkList:any = [];
    let listContent = this.content.get(keyValue);

    for (let linkData of listContent.links) {
      linkList.push(this.renderLinkItem(linkData));
    }

    return (
      <li key={keyValue} className='footer__group-list-item'>
        <h1 className='footer__headline'>{listContent.title}</h1>

        <ul className='footer__link-list'>
          {linkList}
        </ul>
      </li>
    );
  }

  private renderList() {
    /* Renders the top level list */
    let sectionList:any = [];

    for (let keyValue of this.keys) {
      sectionList.push(this.renderSectionListItem(keyValue));
    }

    return (
      <ul className='footer__group-list'>
        {sectionList}
      </ul>
    );
  }

  public render() {
      return (
          <section className='footer'>
            {this.renderList()}

            <LocaleSelector />
          </section>
      );
  }
}

export class ArborMinimalFooterComponent extends React.Component<any, void> {

  public render() {
      return (
          <section className='footer footer--minimal'>
            <ul className='footer__group-list'>
             <li className='footer__group-list-item'>
               <ul className='footer__link-list'>
                 <li className='footer__link-list-item'>
                     <a href='/privacy' className='footer__link'>
                       {_("Terms & Privacy")}
                     </a>
                   </li>
               </ul>
             </li>
             <li className='locale-selector-item'>
               <LocaleSelector />
             </li>
           </ul>
          </section>
      );
  }
}

export const ArborFooter = requireCssWithComponent(
    ArborFooterComponent,
    [
    '/static/css/arbor/elements/footer.css',
    '/static/css/components/react_locale_selector.css',
    '/static/css/modal.css',
    ]
);

export const ArborMinimalFooter = requireCssWithComponent(
    ArborMinimalFooterComponent,
    [
    '/static/css/arbor/elements/footer.css',
    '/static/css/components/react_locale_selector.css',
    '/static/css/modal.css',
    ]
);
