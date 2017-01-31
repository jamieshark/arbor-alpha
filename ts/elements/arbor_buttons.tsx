import React = require('external/react');
import cx = require('external/classnames');
import * as requireCssWithComponent from 'modules/clean/react/css';

type Importance = "primary" | "secondary" | null;
type Size = "big" | "medium" | "small" | null;
type Width = "standard" | "wide" | "extra-wide" | null;
type Classname = string | null;
type ExpCTAHover = string | boolean | null; // EXPERIMENT (tylerryan): subgrowth_biz_all_cta_hover

function returnButtonClasses(
  importance: Importance = 'primary',
  size: Size = 'small',
  width: Width = null,
  classname: Classname = null,
  expCTAHover: ExpCTAHover = null
) {
  // Size and width are combined. If width is null (the default), we want to just return the size
  let sizeClass = `button--${size}`;
  if (width) {
    sizeClass = `button--${size}--${width}`;
  }

  // EXPERIMENT (tylerryan): subgrowth_biz_all_cta_hover
  let hoverClass = '';
  if (expCTAHover) {
    hoverClass = 'button--exp-with-transition';
  }
  // END EXPERIMENT (tylerryan): subgrowth_biz_all_cta_hover

  // Produce classes to be returned
  let buttonClasses = cx(['button', [`button--${importance}`], sizeClass, classname, hoverClass]);

  return buttonClasses;
}

interface ArborButtonBaseProps {
  className?: string;
  importance?: "primary" | "secondary";
  size?: "big" | "medium" | "small";
  width?: "standard" | "wide" | "extra-wide";
  expCTAHover?: string | boolean | null; // EXPERIMENT (tylerryan): subgrowth_biz_all_cta_hover
}

// Exports as an anchor tag
interface ArborButtonAnchorProps extends ArborButtonBaseProps, React.Props<ArborButtonAnchorElement> {
  href: string;
}

export class ArborButtonAnchorElement extends React.Component<ArborButtonAnchorProps, {}> {
  public render() {
    // EXPERIMENT (tylerryan): subgrowth_biz_all_cta_hover - expCTAHover added below
    const { importance, size, width, className, expCTAHover } = this.props;

    let buttonClasses: string = (returnButtonClasses(importance, size, width, className, expCTAHover));

    return (
      <a href={this.props.href} className={buttonClasses}>
        {this.props.children}
      </a>
    );
  }
}

export const ArborButtonAnchor = requireCssWithComponent(
  ArborButtonAnchorElement, ['/static/css/arbor/elements/button.css']
);

interface ArborButtonProps extends ArborButtonBaseProps, React.Props<ArborButtonElement> {
  onClick: () => void;
}

export class ArborButtonElement extends React.Component<ArborButtonProps, {}> {
  public render() {
    const { importance, size, width, className} = this.props;

    let buttonClasses: string = (returnButtonClasses(importance, size, width, className));

    return (
      <button className={buttonClasses} onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

export const ArborButton = requireCssWithComponent(
  ArborButtonElement, ['/static/css/arbor/elements/button.css']
);
