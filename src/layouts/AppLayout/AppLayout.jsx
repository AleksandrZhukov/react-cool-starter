import React from 'react';
import propTypes from 'prop-types';
import CN from 'classnames';
import { Header, Footer } from './components';
import { renderRoutes } from 'react-router-config';

import css from './AppLayout.module.css';

export default function AppLayout({ route }) {
  return (
    <div>
      <Header />
      <div className={CN(css.content, 'layout vertical')}>
        <div className="container flex">
          {renderRoutes(route.routes)}
        </div>
        <Footer className="justified-end" />
      </div>
    </div>
  );
}

// AppLayout.propTypes = {
//   children: propTypes.element.isRequired
// };
