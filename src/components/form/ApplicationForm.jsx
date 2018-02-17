import BaseForm from 'react-form-base';
import validateJs from 'validate.js';

function validate(...rest) {
  const errors = validateJs.single(...rest);

  return errors && errors[0];
}

export default class ApplicationForm extends BaseForm {
  static validations = {
    presence(value, options) {
      if (typeof options !== 'object') options = {};
      if (value === false) value = undefined;

      if (options.if) {
        if (!options.if.call(this)) return;
        delete options.if;
      }

      return validate(value, { presence: options });
    },
    email(value, options = true) {
      const prepared = (value || '').trim();

      if (!prepared) return null;

      const res = validateJs.single(prepared, { email: options });

      if (res !== undefined) {
        return 'Email is not valid';
      }
    },
    equality(value, options) {
      if (!value) return;
      if (value !== this.get(options.to)) {
        return options.message || `is not equal to ${options.to.replace(/^.+\.(?!\.)/, '')}`;
      }
    },
    length(value, options) {
      return validate(value, { length: options });
    },
    userName(value, options) {
      if (!value) return;

      return validate(value, {
        length: { maximum: options && options.length || 30 },
        format: { pattern: '[a-z0-9]+', flags: 'i', message: 'Invalid name. Avoid using special symbols' }
      });
    }
  };

  get isNew() {
    return !this.get('id');
  }

  getError(name) {
    const error = super.getError(name);

    return Array.isArray(error) ? error[0] : error;
  }

  setErrors(errors, callback) {
    let proccedErrors = errors;
    const hadErrors = Object.getOwnPropertyNames(errors).length > 0;
    if (errors.code) {
      const error = this.errorMapping(errors.code);
      if (error) {
        proccedErrors = error;
      } else {
        console.log(`Unknown error: code ${errors.code}, info ${errors.info}`);
      }
    }

    this.setState({ hadErrors, errors: proccedErrors }, callback);
  }

  updateErrors(errors) {
    return this.setState({ errors: { ...this.getErrors(), ...errors } });
  }
}
