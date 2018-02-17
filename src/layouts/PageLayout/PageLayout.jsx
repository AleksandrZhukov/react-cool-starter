import React from 'react';
import CN from 'classnames';
import css from './PageLayout.module.css';

export default function PageLayout({ children, title, centered, maxWidth, style, ...rest }) {
  return (
    <div
      className={CN(css.container, 'pt-40 pb-40', { 'layout horizontal center-center center-block': centered })}
      style={style}
    >
      <div className={css.page}>
        {title &&
          <h1 className={CN(css.title, 'layout horizontal center-center')}>{title}</h1>
        }
        {children}
      </div>
    </div>
  );
}
