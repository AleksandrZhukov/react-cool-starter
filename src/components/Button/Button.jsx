import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CN from 'classnames';
import css from './Button.module.css';

export default class Button extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.node]),
    className: PropTypes.string,
    size: PropTypes.string,
    color: PropTypes.string,
    bordered: PropTypes.bool
  };

  render() {
    const { children, className, size, bordered, color, ...rest } = this.props;

    const classes = CN(
      css.btn, className, [css[color]],
      {
        [css.btnSm]: size === 'sm',
        [css.btnXl]: size === 'xl',
        [css.bordered]: bordered
      }
    );

    return (
      <button type="button" className={classes} {...rest}>{children}</button>
    );
  }
}
