import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import CN from 'classnames';
import { Icon, ButtonLink } from 'components';
import CurrencyHeader from './CurrencyHeader';
import css from './Header.module.css';

export default class Header extends Component {
  get navItems() {
    return [
      { title: 'Home', to: '/', exact: true },
      { title: 'FAQ', to: '/faq' },
      { title: 'Contacts', to: '/contacts' },
      { title: 'Sign In', to: '/sign-in' }
    ];
  }

  renderNav = () => (
    <nav className={CN(css.nav, 'layout horizontal')}>
      {this.navItems.map(item => (
        <NavLink
          key={item.to}
          className={CN('layout horizontal center-center white-text no-underline p-10 relative', css.navItem)}
          activeClassName={css.active}
          exact={item.exact}
          to={item.to}
        >
          {item.title}
        </NavLink>
      ))}
    </nav>
  );

  render() {
    return (
      <header className={css.header}>
        <CurrencyHeader />
        <div className={CN(css.headerContent, 'layout horizontal center container')}>
          <Link to="/" className="white-text no-underline layout horizontal center">
            <Icon icon="Logo" className={CN(css.logo, 'mr-10')} />
            <span className="text-18">GetCoins.ca</span>
          </Link>
          <div className="justified-right self-stretch layout horizontal">
            {this.renderNav()}
            <ButtonLink to="/sign-up" className="self-center white-text ml-20" size="xl" bordered>Sing Up</ButtonLink>
          </div>
        </div>
      </header>
    );
  }
}
