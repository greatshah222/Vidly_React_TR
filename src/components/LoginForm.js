import React, { Component } from 'react';
import '../Modules/login.css';

export class LoginForm extends Component {
  state = {
    account: { username: '', password: '' },
    errors: {},
  };

  username = React.createRef();
  password = React.createRef();
  componentDidMount() {
    // after the page is rendered this will be called and this will focus the username section
    this.username.current.focus();
  }
  // setting up the validation
  validate = () => {
    const errors = {};
    if (this.state.account.username.trim() === '')
      errors.username = 'username is required';
    if (this.state.account.password.trim() === '')
      errors.password = 'password is required';
    // if there is no error we should return null else these error objects
    // this will return an array of all the keys in errors property. if there is no error it means length is 0 so return null else return the errors object
    return Object.keys(errors).length === 0 ? null : errors;
  };
  handleSumbit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    // we have to out {} cause if there is no erro it will just return null and gives an error
    this.setState({ errors: errors || {} });
    // if there is an error we will return immediately instead of calling the server
    if (errors) return;
    // call the server and direct the user
    // to get the value of username and password we have to use the ref property in the React . first initialize them by React.createRef() and then pass the refrence value in the input field
    // u can access later these value by using this.username.current.value
    // also minimize the use of refs
    console.log('submitted');
  };
  validateProperty = (input) => {
    if (input.name === 'username') {
      if (input.value.trim() === '') {
        return 'Username is required';
      }
    }
    if (input.name === 'password') {
      if (input.value.trim() === '') {
        return 'password is required';
      }
    }
  };
  handleChange = (e) => {
    // to check the validation when user are typing in the input field
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) {
      errors[e.currentTarget.name] = errorMessage;
    } else delete errors[e.currentTarget.name];

    // we want to handle both the username and password at the same place so instead of dotnotation we should use the bracket notation
    const account = { ...this.state.account };
    // specify the name property in the form input so that we can get their value dynamically
    account[e.currentTarget.name] = e.currentTarget.value;

    this.setState({
      account: account,
      errors: errors,
    });
  };
  render() {
    return (
      <>
        <h1>Login</h1>
        <form onSubmit={this.handleSumbit}>
          <div className='login-container'>
            <div className='login-container-primary'>
              <label htmlFor='username'>UserName</label>
              <input
                value={this.state.account.username}
                onChange={this.handleChange}
                type='text'
                placeholder='Enter your Username'
                className='input-login'
                id='username'
                name='username'
                ref={this.username}
              />
            </div>
            {this.state.errors.username && (
              <div className='alert alert-danger'>
                {this.state.errors.username}
              </div>
            )}
            <div className='login-container-primary'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                placeholder='Enter your Password'
                className='input-login'
                id='password'
                onChange={this.handleChange}
                value={this.state.account.password}
                ref={this.password}
                name='password'
              />
            </div>
            {this.state.errors.password && (
              <div className='alert alert-danger'>
                {this.state.errors.password}
              </div>
            )}
            {/* make the button disabled unless the form is valid */}
            {/* Our this.validate will return null if there is no error which means
            false */}
            <button disabled={this.validate()} className='button-login'>
              Login
            </button>
            {/* only show this div if there is an error  */}
          </div>
        </form>
      </>
    );
  }
}

export default LoginForm;
