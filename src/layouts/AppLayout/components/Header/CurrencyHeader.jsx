import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CN from 'classnames';
import { connect } from 'react-redux';
import { getMarketSummaries } from 'actions/app';
import css from './Header.module.css';

const tickersToShow = ['BTC', 'ETH', 'XVG', 'XRP', 'NEO'];

function mapState(state) {
  return { prices: state.app.prices.filter(p => tickersToShow.includes(p.ticker)) };
}

function mapDispatch(dispatch) {
  return {
    getMarketSummaries() { getMarketSummaries(dispatch); }
  };
}

class CurrencyHeader extends PureComponent {
  static propTypes = {
    prices: PropTypes.arrayOf(PropTypes.shape({
      ticker: PropTypes.string,
      last: PropTypes.number,
      high24h: PropTypes.number,
      changed: PropTypes.number
    })),
    getMarketSummaries: PropTypes.func
  };

  componentDidMount() {
    this.props.getMarketSummaries();
  }

  renderPrice = ({ ticker, last }) => (
    <div key={ticker} className="yellow-text ml-10 mr-20">{`(${ticker}) ${last.toFixed(4)}`}</div>
  );

  render() {
    return (
      <div className={CN(css.currencyHeader)}>
        <div className={CN(css.currencyContent, 'layout horizontal center container')}>
          <div className="white-text">Last Prices($CAD):</div>
          {this.props.prices.map(this.renderPrice)}
        </div>
      </div>
    );
  }
}

export default connect(mapState, mapDispatch)(CurrencyHeader);
