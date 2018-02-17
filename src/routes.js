/* @flow */

import type { Dispatch } from './types';
import { fetchUsersIfNeeded } from './actions/users';
import { fetchUserIfNeeded } from './actions/user';
import './css';
import { asyncHome, asyncUserInfo, NotFound } from './containers';
import { AppLayout } from './layouts';
import { Home, SignIn, SignUp } from './pages';

export default [
  {
    component: AppLayout,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home, // Add your route here
        loadData: (dispatch: Dispatch) =>
          Promise.all([
            dispatch(fetchUsersIfNeeded())
            // Register other server-side pre-fetched action here
          ])
      },
      {
        path: '/UserInfo/:id',
        component: asyncUserInfo,
        loadData: (dispatch: Dispatch, params: Object) =>
          Promise.all([dispatch(fetchUserIfNeeded(params.id))])
      },
      {
        path: '/sign-in',
        component: SignIn
      },
      {
        path: '/sign-up',
        component: SignUp
      },
      {
        component: NotFound
      }
    ]
  }
];
