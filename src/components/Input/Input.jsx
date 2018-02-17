import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CN from 'classnames';
import css from './Input.module.css';

export default class Input extends PureComponent {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    className: PropTypes.string,
    inputClassName: PropTypes.string,
    labelClassName: PropTypes.string,
    currency: PropTypes.string,
    label: PropTypes.string,
    required: PropTypes.bool,
    big: PropTypes.bool,
    onPressEnter: PropTypes.func
  };

  handleChange = e => this.props.onChange(e.target.value, e);

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.props.onPressEnter(e);
    }
  };

  render() {
    const {
      value,
      className,
      inputClassName,
      labelClassName,
      currency,
      label,
      required,
      big,
      error,
      onPressEnter,
      ...rest
    } = this.props;

    const input = (
      <input
        className={CN(css.input, inputClassName)}
        {...rest}
        value={value || ''}
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}
      />
    );

    return (
      <div className={CN(className, css.holder, 'layout horizontal center', { [css.big]: big, [css.error]: error })}>
        {label &&
          <label className={CN('flex self-stretch layout horizontal')}>
            <div
              className={CN(
                labelClassName,
                css.label,
                'shrink-0 layout horizontal center end-justified pointer',
                { [css.required]: required, 'pl-15 pr-15': big, 'pl-5 pr-5': !big }
              )}
            >
              {label}
            </div>
            <div className={CN(css.separator, 'self-stretch')} />
            {input}
          </label>
        }
        {!label && input}
        {currency && <div className={CN(css.currency, { [css.currencyBig]: big })}>{currency}</div>}
      </div>
    );
  }
}
