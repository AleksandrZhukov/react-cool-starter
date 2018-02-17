import React, { PureComponent } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Form, { bindState, Input } from 'components/form';
import { Icon, Button } from 'components';
import auth from 'utils/auth';
import CN from 'classnames';

import css from './SignIn.module.css';
import secureLocation from './secureLocation.png';
import { PageLayout } from 'layouts';
import { hot } from "react-hot-loader";

class SignIn extends PureComponent {
  state = {
    errors: null
  };

  static maxWidth = 680;
  static centered = true;

  componentWillMount() {
    if (auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  validations = {
    login: {
      presence: { allowEmpty: false },
      email: { message: 'You have entered an invalid email address.' }
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

  render() {
    const { errors } = this.state;

    return (
      <PageLayout maxWidth={680} centered>
        <div className="pl-40 pr-40 pt-40 pb-25">
          <div className="layout horizontal center-center">
            <Icon icon="Logo" className={CN(css.logo, 'mr-10')} />
            <span className="text-24 bold-text">GetCoins.ca</span>
          </div>
          <h1 className={CN('text-20 text-center layout horizontal center mb-20', css.title)} >Login</h1>
          <div className="layout horizontal center-center text-16 red-text mb-20">
            <Icon icon="FaExclamationTriangle" className="mr-5 text-18" />
            Please ensure that you are securely browsing https://www.getcoins.ca
          </div>
          <img src={secureLocation} className="center-block block mb-25" />
          <hr className="mb-25" />
          <Form
            {...bindState(this)}
            ref={form => this.form = form}
            validations={this.validations}
          >
            {$ => (
              <div className={CN(css.form, 'center-block')}>
                <Input
                  {...$('login')}
                  className="mb-20"
                  onPressEnter={this.handleSubmit}
                  big
                  label="Email"
                  labelClassName={css.inputLabel}
                  required
                  type="email"
                  placeholder="Email"
                />
                <Input
                  {...$('password')}
                  onPressEnter={this.handleSubmit}
                  big
                  label="Password"
                  labelClassName={css.inputLabel}
                  required
                  type="password"
                  placeholder="Password"
                />
              </div>
            )}
          </Form>
          { errors && <div className="red-text text-center mt-5 error">{errors}</div>}
          <div className="layout horizontal center-center">
            <Button className="mt-20 text-uppercase" size="xl" color="indigo" onClick={this.handleSubmit}>Login</Button>
          </div>
          <div className={CN('layout horizontal justified center-block mt-20', css.footer)}>
            <Link className={CN(css.links, 'underline')} to="/forgot-password">Forgot Password</Link>
            <div className={css.links}>
              New to GetCoins? <Link className={CN(css.links, 'underline')} to="/sign-up">Sign up now</Link>
            </div>
          </div>
        </div>
      </PageLayout>

    );
  }
}

export default hot(module)(withRouter(SignIn));
