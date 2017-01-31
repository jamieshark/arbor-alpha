import React = require('external/react');
import cx = require('external/classnames');

import * as requireCssWithComponent from 'modules/clean/react/css';

interface PlatformMap {
  [key: string]: {
    imageSrc: string,
    platformName: string,
    url: string,
    slug?: string, // If a slug is passed in, we'll append it to the logomark class for specific sizing
  };
}

interface ArborLogoProps extends React.Props<ArborLogoElement> {
  presetPlatform?: string;
  glyphOnly?: boolean;
  customPlatform?: PlatformMap;
}

export class ArborLogoElement extends React.Component<ArborLogoProps, {}> {
  public renderLogoType(platform: any):JSX.Element | null {
    let logoType: JSX.Element | null;

    if (this.props.glyphOnly) {
      logoType = null;
    } else {
      let logotypeClasses = cx({
        'arbor-logo__logotype': true,
        [`arbor-logo__logotype--${platform.slug}`]: platform.slug,
      });

      logoType = (
        <img
          src={platform.imageSrc}
          alt={platform.platformName}
          className={logotypeClasses}
        />
      );
    }

    return logoType;
  }

  public render() {
    // We don't support content in tsx files. The reason the paths exist here is to serve as a
    // source of truth for the preset platforms. Arbor users can define custom platforms as
    // well.

    let platformMap: PlatformMap = {
      default: {
        imageSrc: '/static/images/arbor/logos/wordmark--dropbox.svg',
        platformName: "Dropbox",
        url: '/',
        slug: 'dropbox',
      },
      business: {
        imageSrc: '/static/images/arbor/logos/wordmark--business.svg',
        platformName: "Dropbox Business",
        url: '/business',
        slug: 'business',
      },
      arbor: {
        imageSrc: '/static/images/arbor/logos/wordmark--dropbox.svg',
        platformName: "Arbor",
        url: '/arbor'
      }
    };

    // Determine the data we'll use
    const { customPlatform, presetPlatform } = this.props;

    // Define the default platform
    let platform: any = platformMap['default'];

    // Override platform if customPlatform or presetPlatform is passed in
    if (customPlatform) {
      platform = customPlatform;
    } else if (presetPlatform && presetPlatform in platformMap) {
      platform = platformMap[presetPlatform];
    }

    // Glyph rendering
    let glyph: JSX.Element = (
      <img
        src="/static/images/arbor/logos/glyph.svg"
        alt=""
        className="arbor-logo__glyph"
      />
    );

    // Logotype rendering
    let logoType: JSX.Element | null = this.renderLogoType(platform);

    return (
      <a className='arbor-logo' href={platform.url}>
          {glyph}

          {logoType}
      </a>
    );
  }
}

export const ArborLogo = requireCssWithComponent(
    ArborLogoElement, ['/static/css/arbor/elements/logo.css']
);
