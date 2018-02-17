import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CN from 'classnames';
import css from './Table.module.css';

export default class Table extends PureComponent {
  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      dataIndex: PropTypes.string,
      titleClassName: PropTypes.string,
      className: PropTypes.string,
      width: PropTypes.number,
      render: PropTypes.func
    })),
    data: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line
    rowKey: PropTypes.string,
    rowClassName: PropTypes.string,
    className: PropTypes.string,
    headerClassName: PropTypes.string,
    expandedRowRender: PropTypes.func,
    expandedRowKeys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
  };

  renderHeader() {
    const { headerClassName, columns } = this.props;
    return (
      <div className={CN(css.header, headerClassName, 'layout horizontal center pt-15 pb-15 pl-10 pr-10')}>
        {columns.map((c, i) => {
          const styles = {};
          if (c.width) {
            styles.flexBasis = c.width;
            styles.flexGrow = 0;
          }
          return (
            <div key={i} className={CN('flex', c.titleClassName)} style={styles}>{c.title}</div>
          );
        })}
      </div>
    );
  }

  renderCells = data => (
    this.props.columns.map((c, i) => {
      const content = (c.render && c.render(data[c.dataIndex], data)) || data[c.dataIndex];
      const styles = {};
      if (c.width) {
        styles.flexBasis = c.width;
        styles.flexGrow = 0;
      }
      return (
        <div key={c.dataIndex || i} className={CN('flex', c.className)} style={styles}>{content}</div>
      );
    })
  );

  renderRows = () => {
    const { data, rowKey, rowClassName, expandedRowRender, expandedRowKeys } = this.props;
    return data.map((row, i) => (
      <div key={row[rowKey]} className={CN(css.row, rowClassName)}>
        <div className={CN('layout horizontal center pl-10 pr-10 p-5', { [css.even]: i % 2 === 0 })}>
          {this.renderCells(row)}
        </div>
        {expandedRowRender && expandedRowKeys.includes(row[rowKey]) &&
          <div className={CN(css.expandedRow, 'pl-10 pr-10 p-5')}>{expandedRowRender(row)}</div>
        }
      </div>
    ));
  };

  render() {
    const { className } = this.props;
    return (
      <div className={CN(className)}>
        {this.renderHeader()}
        {this.renderRows()}
      </div>
    );
  }
}
