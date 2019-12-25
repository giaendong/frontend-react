import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { login, logout, getMe } from '../../sagas/Auth/actions';
import { getConfig } from '../../sagas/TV/actions';
import logo from '../images/logo.png';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.submitLogout = this.submitLogout.bind(this);
  }

  componentDidMount() {
    this.props.getConfig();
    if (Cookies.get('auth_key')) {
      this.props.getMe();
    }
  }

  componentDidUpdate(prevProps) {
    const { isAuthenticated } = this.props;
    if (isAuthenticated !== prevProps.isAuthenticated && isAuthenticated) {
      this.props.getMe();
    }
  }

  handleUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  handlePassword(e){
    this.setState({
      password: e.target.value
    })
  }

  submitLogin() {
    const { username, password } = this.state;
    this.props.login(username, password)
  }

  submitLogout() {
    this.props.logout()
  }

  render() {
    const { isAuthenticated, meData } = this.props;
    return(
      <nav className='navbar navbar-expand-lg navbar-light bg-light fixed-top'>
        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <a className='navbar-brand' href='/'>
          <img src={logo} alt='Logo' style={{width: '100px'}} />
        </a>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='nav navbar-nav flex-row justify-content-between ml-auto'>
            { 
              isAuthenticated && meData ?
              <li className='dropdown order-1'>
                <button type='button' id='userDropdown' data-toggle='dropdown' className='btn login-button'>Hi, { meData.username }</button>
                <ul className='dropdown-menu dropdown-menu-right mt-2'>
                  <li className='px-3 py-2'>
                    <button type='button' className='btn btn-secondary btn-block' onClick={ this.submitLogout }>Logout</button>
                  </li>
                </ul>
              </li> :
              <li className='dropdown order-1'>
                <button type='button' id='loginDropdown' data-toggle='dropdown' className='btn login-button'>Login</button>
                <ul className='dropdown-menu dropdown-menu-right mt-2'>
                  <li className='px-3 py-2'>
                      <div className='form-group'>
                        <input 
                          id='emailInput'
                          placeholder='Username'
                          className='form-control form-control-sm'
                          type='text'
                          required
                          onChange={ this.handleUsername } />
                      </div>
                      <div className='form-group'>
                        <input
                          id='passwordInput'
                          placeholder='Password'
                          className='form-control form-control-sm'
                          type='password'
                          required
                          onChange={ this.handlePassword } />
                      </div>
                      <div className='form-group'>
                        <button type='submit' className='btn login-button btn-block' onClick={ this.submitLogin }>Login</button>
                      </div>
                  </li>
                </ul>
              </li>
            }
          </ul>
        </div>
      </nav>
    )
  }
}

// redux providing state takeover
const mapStateToProps = (state) => {
    return {
      isAuthenticated: state.auth.get('isAuthenticated'),
      meData: state.auth.get('meData'),
      configData: state.tv.get('configData')
    }
}
export default connect(mapStateToProps, { login, logout, getMe, getConfig })(Header)