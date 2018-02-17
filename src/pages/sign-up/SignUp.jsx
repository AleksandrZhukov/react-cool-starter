import React, { PureComponent } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Form, { bindState, Input, Checkbox, Recaptcha } from 'components/form';
import { Button } from 'components';
import auth from 'utils/auth';
import CN from 'classnames';
import { PasswordStrength } from './components';

import css from './SignUp.module.css';

class SignUp extends PureComponent {
  static title = 'Sign Up';

  state = {
    errors: null,
    passwordStrength: 0
  };

  componentWillMount() {
    if (auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  async componentDidMount() {
    this.pLib = await import(/* webpackChunkName: 'zxcvbn' */ 'zxcvbn');
  }

  pLib = null;

  validations = {
    firstName: {
      presence: { allowEmpty: false },
      userName: true
    },
    lastName: {
      presence: { allowEmpty: false },
      userName: true
    },
    email: {
      presence: { allowEmpty: false },
      email: { message: 'You have entered an invalid email address.' }
    },
    confirmEmail: {
      presence: { allowEmpty: false },
      equality: { to: 'email' }
    },
    password: {
      presence: {
        allowEmpty: false,
        message: 'Please enter your password.'
      },
      length: {
        minimum: 6,
        tooShort: 'Minimum 6 characters'
      }
    },
    confirmPassword: {
      presence: { allowEmpty: false },
      equality: { to: 'password' }
    },
    recaptcha: {
      presence: { allowEmpty: false, message: 'Please verify.' }
    }
  };

  handleSubmit = () => {
    const { history } = this.props;
    this.form.ifValid(() => {
      this.setState({ errors: '' });
      auth.logIn(this.state.form)
        .then(() => { history.push('/requests'); })
        .catch((e) => {
          if (e.response.data && e.response.data.code === 1) {
            this.setState({ errors: 'Some error' });
          }
        });
    });
  };

  handlePassChange(value) {
    this.set('password', value);
    this.props.checkPasswordStrength(value); // eslint-disable-line
  }

  checkPasswordStrength = (pass) => {
    if (this.pLib) {
      this.setState({ passwordStrength: this.pLib(pass).score });
    }
  };

  render() {
    const { errors, passwordStrength } = this.state;

    return (
      <div className="pl-40 pr-40 pt-40 pb-25">
        <h2>Register for an Account:</h2>
        <div>Complete the following form to start buying from GetCoins. True and accurate information is required to pass account verification and also to reset your login info or password. Fields marked with an asterisk (*) are required.</div>
        <hr className="mt-40 mb-40" />
        <Form
          {...bindState(this)}
          ref={form => this.form = form}
          validations={this.validations}
          checkPasswordStrength={this.checkPasswordStrength}
        >
          {$ => (
            <div>
              <div className="layout horizontal">
                <div className="flex">
                  <Input
                    {...$('firstName')}
                    className="mb-20 inline"
                    big
                    label="First Name"
                    labelClassName={css.inputLabel}
                    required
                    placeholder="First Name"
                  />
                  <Input
                    {...$('lastName')}
                    className="inline"
                    big
                    label="Last Name"
                    labelClassName={css.inputLabel}
                    required
                    placeholder="Last Name"
                  />
                </div>
                <div className="flex">
                  <Input
                    {...$('email')}
                    className="mb-20 inline"
                    big
                    label="Email"
                    labelClassName={css.inputLabelMd}
                    required
                    type="email"
                    placeholder="Email"
                  />
                  <Input
                    {...$('confirmEmail')}
                    className="inline"
                    big
                    label="Confirm Email"
                    labelClassName={css.inputLabelMd}
                    required
                    type="email"
                    placeholder="Email"
                  />
                </div>
              </div>
              <hr className="mt-40 mb-40" />
              <div className="layout horizontal center mb-20">
                <Input
                  {...$('password')(this.handlePassChange)}
                  className="inline mr-20"
                  big
                  label="Password"
                  labelClassName={css.inputLabelXl}
                  required
                  type="password"
                  placeholder="Password"
                />
                <div className="layout horizontal center">
                  <div className="mr-10 bold-text">Password Strength:</div>
                  <PasswordStrength score={passwordStrength} />
                </div>
              </div>
              <div className="layout horizontal center">
                <Input
                  {...$('confirmPassword')}
                  className="inline mr-20"
                  big
                  label="Confirm Password"
                  labelClassName={css.inputLabelXl}
                  required
                  type="password"
                  placeholder="Password"
                />
              </div>
              <hr className="mt-40 mb-40" />
              <div className="layout horizontal center-center">
                <Checkbox {...$('terms')} required>I agree to the</Checkbox>
                &nbsp;
                <Link className="black-text underline" to="/terms">Terms of Service</Link>
              </div>
              <Recaptcha {...$('recaptcha')} className="mt-20" />
            </div>
          )}
        </Form>
        {errors && <div className="red-text text-center mt-5 error">{errors}</div>}
        <div className="layout horizontal center-center mt-20">
          <Button className={CN('mr-10 text-uppercase', css.cancelBtn)} size="xl" bordered>Cancel</Button>
          <Button className="ml-10 text-uppercase" size="xl" color="indigo" onClick={this.handleSubmit}>Submit</Button>
        </div>
        <div className={CN('layout horizontal center-center mt-40', css.links)}>
          Already have an account? Sign in&nbsp;<Link className={CN(css.links, 'underline')} to="/sign-in">here</Link>.
        </div>
      </div>
    );
  }
}

export default withRouter(SignUp);
