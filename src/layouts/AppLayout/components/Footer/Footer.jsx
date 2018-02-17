import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import CN from 'classnames';
import { Icon } from 'components';
import css from './Footer.module.css';
import logo from './logo.png';

export default class Footer extends Component {
  get navItems() {
    return [
      { title: 'Home', to: '/', exact: true },
      { title: 'FAQ', to: '/faq' },
      { title: 'Contacts', to: '/contacts' },
      { title: 'Sign In', to: '/sign-in' },
      { title: 'Sign Up', to: '/sign-up' }
    ];
  }

  renderNav = () => (
    <nav className={CN(css.nav, 'layout horizontal bold-text')}>
      {this.navItems.map(item => (
        <NavLink
          key={item.to}
          className={CN('layout horizontal center-center white-text no-underline mr-20 relative', css.navItem)}
          activeClassName={css.active}
          exact={item.exact}
          to={item.to}
        >
          {item.title}
        </NavLink>
      ))}
    </nav>
  );

  renderCopyRight = () => (
    <div className={CN(css.copyRightHolder, 'layout horizontal center white-text')}>
      <div className="container layout horizontal">
        <div>
          ® Trade-mark of Interac Inc., Flexepin, Visa, Mastercard Used under licence.
        </div>
        <div className="justified-right">Copyright © GetCoins Inc. 2018</div>
      </div>
    </div>
  );

  render() {
    const { className } = this.props;
    return (
      <footer className={CN(css.footer, className)}>
        <div className={CN(css.footerHolder, 'layout vertical')}>
          <div className="container layout horizontal start p-15">
            {this.renderNav()}
            <div className="justified-right text-right">
              <div className="mb-3">Follow us on:</div>
              <Icon icon="FaTwitter" className="text-18 mr-5" />
              <Icon icon="FaFacebookSquare" className="text-18" />
            </div>
          </div>
          <div className="container layout horizontal end justified-end mb-10">
            <img src={logo} />
            <div className="justified-right layout horizontal">
              <a className={CN(css.socialLink, 'layout horizontal center mr-15')} href="tel:+1 (877) 698-7464">
                <Icon icon="FaPhone" className="mr-5" />
                +1 (877) 698-7464
              </a>
              <a className={CN(css.socialLink, 'layout horizontal center')} href="mailto:hello@getcoins.ca">
                <Icon icon="FaEnvelope" className="mr-5" />
                hello@getcoins.ca
              </a>
            </div>
          </div>
        </div>
        {this.renderCopyRight()}
      </footer>
    );
  }
}
