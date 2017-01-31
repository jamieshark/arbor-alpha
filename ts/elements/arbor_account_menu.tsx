import React = require('external/react');

// Utils
import * as requireCssWithComponent from 'modules/clean/react/css';
import * as Viewer from 'modules/clean/viewer';
import * as User from 'modules/clean/user';

// Components
import * as AccountMenu from 'modules/clean/react/account_menu/account_menu';
import * as BubbleDropdown from 'modules/clean/react/bubble_dropdown_v2';

interface ArborAccountMenuProps extends React.Props<ArborAccountMenuElement> {
  user: User | null | undefined; // User is required.
  viewer: Viewer | null | undefined; // Viewer is required.
  showAccountSwitcher?: boolean; // Renders the account switcher. Most, if not all, non-product
    // pages will not render this.
  onSelectUser?: (e: any, subjectUid: any) => void;
}

export class ArborAccountMenuElement extends React.Component<ArborAccountMenuProps, {}> {
  public render() {
    return (
      <AccountMenu
        dropdownHorizontalDisplacement={-50}
        isMaestroDesign={true}
        position={BubbleDropdown.POSITIONS.BOTTOM_LEFT}
        user={this.props.user}
        viewer={this.props.viewer}
        onSelectUser={this.props.onSelectUser}
        shouldArrowDecrement={false}
        showAccountSwitcher={this.props.showAccountSwitcher}
        showNameOnButton={false}
      />
    );
  }
}

export const ArborAccountMenu = requireCssWithComponent(
  ArborAccountMenuElement, ['/static/css/arbor/elements/account_menu.css']
);
