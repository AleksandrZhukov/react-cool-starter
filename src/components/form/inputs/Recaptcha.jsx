import React from 'react';
import PropTypes from 'prop-types';
import BasicRecaptcha from 'react-recaptcha';
import CN from 'classnames';

export default function Recaptcha({ className, onChange, error, ...rest }) {
  const handleVerify = () => onChange(true);
  return (
    <div className={CN('layout vertical center-center', className)} {...rest}>
      <BasicRecaptcha
        sitekey="6Ley70IUAAAAAGdvNKe-VIbOPis8FP4LCZZwcG1l"
        verifyCallback={handleVerify}
      />
      {error && <div className="red-text mt-5">{error}</div>}
    </div>
  );
}

Recaptcha.propTypes = {
  onChange: PropTypes.func,
  error: PropTypes.string,
  className: PropTypes.string
};
