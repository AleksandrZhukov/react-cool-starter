import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { Icon, Input, Button, Table } from 'components';
import CN from 'classnames';

import css from './Home.css';

class Home extends PureComponent {
  static title = 'My Account';

  state = {
    selectedCurrency: [],
    actionName: undefined
  };

  get data() {
    return [
      { id: 1, currency: 'Bitcoin', ticker: 'BTC', balance: 0.44, value: 43434.4, price: 14120.23 },
      { id: 2, currency: 'lal', ticker: 'las', balance: 0.44, value: 43434.4, price: 345 },
      { id: 5, currency: 'lal', ticker: 'las', balance: 0.44, value: 43434.4, price: 12623 }
    ];
  }

  renderExpandedRow = (record) => {
    return (
      <div className="pt-10 pb-10">
        {this.state.actionName === 'buy' && this.renderBuyForm(record)}
        {this.state.actionName === 'transfer' && <div>transfer form here</div>}
      </div>
    );
  };

  renderBuyForm(currency) {
    return (
      <div className="text-18">
        <div className="mb-20">Buy {currency.currency} ({currency.ticker})</div>
        <div className="layout horizontal mb-10">
          <div className="flex two">Current Quoted Selling Price per {currency.ticker}:</div>
          <div className="flex two">${currency.price} CAD <span className="text-14">*Price quoted is valid for 59 secs.</span></div>
          <div className="flex" />
        </div>
        <div className="layout horizontal mb-30">
          <div className="flex two">Enter amount of {currency.ticker} to buy (in $ or {currency.ticker}):</div>
          <div className="flex two layout horizontal">
            <Input type="number" label="$" labelClassName="pl-10 pr-10" inputClassName="text-right" className="mr-5 flex" currency="CAD" />
            <Input type="number" inputClassName="text-right" className="ml-5 flex" currency={currency.ticker} />
          </div>
          <div className="flex" />
        </div>
        <div className="layout horizontal mb-10">
          <div className="flex two">Less: GetCoins fees (1.5%):</div>
          <div className="flex two">$1.50 CAD</div>
          <div className="flex" />
        </div>
        <div className="layout horizontal mb-10">
          <div className="flex two">You get:</div>
          <div className="flex two">0.0069758 {currency.ticker}</div>
          <div className="flex" />
        </div>
        <div className="layout horizontal center-center mt-30">
          <Button size="xl" className="mr-10" color="red">CANCEL</Button>
          <Button size="xl" className="ml-10" color="blue">CONFIRM (59)</Button>
        </div>
      </div>
    );
  }

  renderActions = (_, record) => (
    <div className="layout horizontal center-center">
      <Button color="purple" onClick={() => this.selectCurrency(record.id, 'buy')}>BUY</Button>
      <Button className="ml-10" color="orange" onClick={() => this.selectCurrency(record.id, 'transfer')}>TRANSFER</Button>
    </div>
  );

  selectCurrency(id, action) {
    this.setState({ selectedCurrency: [id], actionName: action });
  }

  render() {
    const { selectedCurrency } = this.state;
    return (
      <div className="pl-40 pr-40 pt-40 pb-25">
        <h2 className="m-0 mb-40">My Balances:</h2>
        <Table
          rowKey="id"
          data={this.data}
          className="mb-40"
          headerClassName="text-16 text-uppercase"
          expandedRowRender={this.renderExpandedRow}
          expandedRowKeys={selectedCurrency}
          columns={[
            {
              title: 'Currency',
              dataIndex: 'currency'
            },
            {
              title: 'Symbol',
              dataIndex: 'ticker',
              titleClassName: 'text-center',
              className: 'text-center'
            },
            {
              title: 'Balance',
              dataIndex: 'balance',
              titleClassName: 'text-right',
              className: 'text-right'
            },
            {
              title: 'VALUE ($CAD)',
              dataIndex: 'value',
              titleClassName: 'text-right',
              className: 'text-right'
            },
            {
              title: 'Action',
              titleClassName: 'text-center',
              width: 300,
              className: 'text-center',
              render: this.renderActions
            }
          ]}
        />
        <hr className="mb-20" />
        <div className="layout horizontal">
          <div className="mr-30">
            <h2 className="m-0 mb-30">Account Information:</h2>
            <div className="layout horizontal mb-10">
              <span className="mr-20">Name:</span><span>John Doe</span>
            </div>
            <div className="layout horizontal mb-10">
              <span className="mr-20">Email:</span>
              <span className="mr-10">john.doe@gmail.com</span>
              <Button className="justified-right" size="sm" color="orange">edit</Button>
            </div>
            <div className="layout horizontal mb-10">
              <span className="mr-20">Password:</span>
              <span className="mr-10">••••••••</span>
              <Button className="justified-right" size="sm" color="orange">edit</Button>
            </div>
          </div>
          <div>
            <h2 className="m-0 mb-30">Transfers (Pending & Complete)</h2>
            <div className="layout horizontal mb-10">
              <div className="mr-20 nowrap">2017-12-23</div>
              <div className="mr-20 break-all">
                BTC: <span>3QJmV3qfvL9SuYo34YihAf3sRCW3qSinyC</span>
                <Icon icon="FaLongArrowRight" className="ml-10 mr-10 orange-text text-20" />
                <span>3QJmV3qfvL9SuYo34YihAf3sRCW3qSinyC</span>
              </div>
              <div className="text-right">
                0.14 BTC
                <div className="orange-text bold-text">Completed</div>
              </div>
            </div>
            <div className="layout horizontal mb-10">
              <div className="mr-20 nowrap">2017-12-23</div>
              <div className="mr-20 break-all">
                BTC: <span>3QJmV3qfvL9SuYo34YihAf3sRCW3qSinyC</span>
                <Icon icon="FaLongArrowRight" className="ml-10 mr-10 orange-text text-20" />
                <span>3QJmV3qfvL9SuYo34YihAf3sRCW3qSinyC</span>
              </div>
              <div className="text-right">
                0.14 BTC
                <div className="orange-text bold-text">Completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
