import { createTypes } from 'redux-compose-reducer';
import io from 'socket.io-client';

export const TYPES = createTypes('app', [
  'getMarketSummaries'
]);

export function getMarketSummaries(dispatch) {
  const ioConnection = io(`${process.env.BASE_URL.replace('api/', '')}public`);
  let conter = 0;
  ioConnection.on('marketSummaries', (res) => {
    if (conter === 0 || conter === 5) {
      dispatch({ type: TYPES.getMarketSummaries, data: JSON.parse(res) });
      conter = 0;
    }
    conter += 1;
  });
}
