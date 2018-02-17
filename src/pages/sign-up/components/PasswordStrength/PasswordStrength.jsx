import React from 'react';
import PropTypes from 'prop-types';
import CN from 'classnames';
import css from './PasswordStrength.css';

export default function PasswordStrength({ score }) {
  const getTitle = () => {
    const titles = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    return titles[score];
  };
  const getClassName = () => {
    const names = ['vw', 'w', 'f', 'g', 's'];
    return names[score];
  };
  return (
    <div>
      <div className={CN('mb-5 text-16 bold-text text-uppercase', css[getClassName()])}>{getTitle()}</div>
      <div className="layout horizontal center">
        {Array.from(new Array(5)).map((_, i) =>
          <div key={i} className={CN(css.bar, { [css[getClassName()]]: i <= score })} />)
        }
      </div>
    </div>
  );
}

PasswordStrength.propTypes = {
  score: PropTypes.number.isRequired
};
