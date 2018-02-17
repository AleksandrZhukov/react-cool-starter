/* @flow */

import React from 'react';

import styles from './styles.module.scss';

type Props = { error: Object };

export default ({ error }: Props) => (
  <div className={styles.Error}>
    <p>Oops! {error.message}</p>
  </div>
);
