import React, { Children, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Select as AntSelect, Spin } from 'antd';
import { Icon } from 'elements';
import { castArray, noop, compact, without, union, isObject } from 'lodash';
// import { strFilter } from 'utils';
import CN from 'classnames';
import css from './Select.module.css';

const Option = AntSelect.Option;
const excludedKeys = ['select-all', 'deselect-all'];

export default class Select extends PureComponent {
  static Option = Option;

  static caseInsensitiveFilter = (val, opt) => opt.props.children.toLowerCase().includes(val.toLowerCase());

  static propTypes = {
    error: PropTypes.string,
    className: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    labelClassName: PropTypes.string,
    mode: PropTypes.string,
    selectAll: PropTypes.bool,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.array
    ]),
    onChange: PropTypes.func,
    loading: PropTypes.bool,
    unblockedLoading: PropTypes.bool,
    icon: PropTypes.string,
    iconClassName: PropTypes.string,
    children: PropTypes.node,
    optionFilterProp: PropTypes.string,
    containerId: PropTypes.string
  };

  static defaultProps = {
    optionFilterProp: 'children',
    loading: false,
    unblockedLoading: false,
    containerId: 'scrollContainer',
    selectAll: true
  };

  static contextTypes = {
    containerId: PropTypes.string
  };

  state = {
    filterValue: ''
  };

  getInput() {
    // eslint-disable-next-line react/no-find-dom-node
    return ReactDOM.findDOMNode(this.select).querySelector('input');
  }

  onChange = (value) => {
    this.props.onChange(value);
    this.setState({ filterValue: '' });
  };

  setInnerState(state) {
    this.select.setState(state);
  }

  selectRef = select => this.select = select;

  getAllFilteredItems() {
    return compact(Children.map(this.props.children, child => this.filter(child, this.state.filterValue) ? child.props.value || child.key : null));
  }

  filterOption = (inputValue, option) => {
    this.setState({ filterValue: inputValue });
    return excludedKeys.includes(option.key) || this.filter(option, inputValue);
  };

  filter = (option, filter) => {
    return option.props[this.props.optionFilterProp];
  };

  getPopupContainer = () => {
    return document.querySelector(`#${this.context.containerId}`);
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const { mode, error, className, label, labelClassName, loading, unblockedLoading, icon, children, iconClassName, ...rest } = this.props;

    rest.onChange = this.onChange;
    if (mode === 'combobox') {
      rest.onSearch = rest.onChange;
      rest.onChange = noop;
    }

    const dropdownAlign = { offset: [0, 0] };

    const select = (
      <AntSelect
        ref={this.selectRef}
        key="select"
        mode={mode}
        className={`block ${css.select}`}
        getPopupContainer={this.getPopupContainer}
        optionLabelProp="children"
        dropdownAlign={dropdownAlign}
        {...rest}
      >
        {children}
      </AntSelect>
    );

    return (
      <div className={CN(className, { 'with-icon relative': icon })}>
        {label &&
          <label className={labelClassName}>{label}</label>
        }
        <div className="relative layout horizontal center">
          {icon &&
            <Icon className={CN(iconClassName, 'text-30 icon')} icon={icon} />
          }
          {unblockedLoading
            ? [select, <Spin key="spinner" className={css.spinner} spinning={loading} />]
            : <Spin wrapperClassName="block full-width" spinning={loading}>{select}</Spin>
          }
        </div>
        {error &&
          <div className="error">{error}</div>
        }
      </div>
    );
  }
}
