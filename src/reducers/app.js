import { composeReducer } from 'redux-compose-reducer';
import update from 'update-js';

const initialState = {
  prices: []
};

function getMarketSummaries(state, { data }) {
  return update(state, 'prices', data);
}

export default composeReducer(
  'app',
  {
    getMarketSummaries
  },
  initialState
);
