import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CN from 'classnames';
import css from './Checkbox.module.css';

export default class Checkbox extends PureComponent {
  static propTypes = {
    // string value is passed to checkbox when it is used in conjunction with CheckboxGroup
    value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    onChange: PropTypes.func,
    error: PropTypes.string
  };

  handleChange = e => this.props.onChange(e.target.checked, e);

  render() {
    // eslint-disable-next-line no-unused-vars
    const { value, className, error, onChange, required, children, ...rest } = this.props;

    return (
      <label {...rest} className={CN(css.wrapper, className, 'pointer', { [css.required]: required })}>
        <input type="checkbox" value={value} onChange={this.handleChange} />
        {children && <span className="ml-5">{children}</span>}
      </label>
    );
  }
}
