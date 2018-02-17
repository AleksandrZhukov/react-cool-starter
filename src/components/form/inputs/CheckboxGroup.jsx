import React, { Children, PureComponent } from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';

export default class CheckboxGroup extends PureComponent {
  static propTypes = {
    value: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    onChange: PropTypes.func,
    error: PropTypes.string,
    className: PropTypes.string,
    checkboxClassName: PropTypes.string,
    children: PropTypes.node
  };

  handleChange = (checked, e) => {
    const { value = [], onChange } = this.props;
    const inputValue = e.target.name;

    return onChange(checked ? [...value, inputValue] : value.filter(v => v !== inputValue), e);
  };

  render() {
    const {
      value = [],
      onChange, // eslint-disable-line no-unused-vars
      error,
      className,
      checkboxClassName,
      children,
      label,
      labelClassName,
      ...rest
    } = this.props;

    return (
      <div>
        {label &&
          <label className={labelClassName}>{label}</label>
        }
        <div className={className}>
          {Children.map(children, element => (
            element.type === Checkbox ? React.cloneElement(element, {
              ...rest,
              className: element.props.className || checkboxClassName,
              value: value.includes(element.props.value),
              name: element.props.value,
              onChange: this.handleChange
            }) : element
          ))}
        </div>
        {error &&
          <div className="error">{error}</div>
        }
      </div>
    );
  }
}
