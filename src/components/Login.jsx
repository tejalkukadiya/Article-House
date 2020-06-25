import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import history from '../history';

const userData = {
  email: 'jack@gmail.com',
  password: '12345',
}
class Login extends React.Component {

  state = {
    email: "",
    password: "",
    emailError: false,
    passwordError: false,
  };

  componentDidMount() {
    if (window.localStorage.getItem('isAuthenticated')) {
      history.push('/');
    }
  }

  submitHandler = event => {
    event.preventDefault();
    const { email, password } = this.state;
    let isError = false;
    if (email.length === 0 || email !== userData.email) {
      isError = true;
      this.setState({
        emailError: true,
      })
    } else {
      this.setState({
        emailError: false,
      })
    }
    if (password.length === 0 || password !== userData.password) {
      isError = true;
      this.setState({
        passwordError: true,
      })
    } else {
      this.setState({
        passwordError: false,
      })
    }
    if (!isError) {
      window.localStorage.setItem('isAuthenticated', true);
      history.push('/articles');
    }
  };

  changeHandler = event => {
    const { emailError, passwordError } = this.state;
    this.setState({ [event.target.name]: event.target.value }, () => {
      if (emailError || passwordError) {
        this.setState({
          emailError: false,
          passwordError: false,
        });
      }
    });
  };


  render() {
    const { emailError, passwordError } = this.state;
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol className="col-md-6 offset-md-3">
            <div className="card login-card">
              <form className="needs-validation"
                onSubmit={this.submitHandler}
                noValidate>
                <p className="h5 text-center mb-4">Sign In</p>
                <div className="grey-text">
                  <MDBRow className="mb-4">
                    <MDBCol>
                      <label
                        htmlFor="defaultFormemailEx4"
                        className="grey-text"
                      >
                        Email address
              </label>
                      <input
                        value={this.state.email}
                        onChange={this.changeHandler}
                        type="text"
                        id="defaultFormemailEx4"
                        className={`form-control ${emailError ? 'is-invalid' : ''}`}
                        name="email"
                        placeholder="enter your email"
                        required
                      />
                      {emailError &&
                        <div className="invalid-feedback">
                          Please provide a valid email..
              </div>}
                    </MDBCol>
                  </MDBRow>

                  <MDBRow className="mb-4">
                    <MDBCol>
                      <label
                        htmlFor="defaultFormPasswordEx4"
                        className="grey-text"
                      >
                        Password
              </label>
                      <input
                        value={this.state.password}
                        onChange={this.changeHandler}
                        type="password"
                        id="defaultFormPasswordEx4"
                        className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                        name="password"
                        placeholder="enter password"
                        required
                      />
                      {passwordError &&
                        <div className="invalid-feedback">
                          Please provide a valid password..
              </div>}
                    </MDBCol>
                  </MDBRow>
                </div>
                <div className="text-center">
                  <MDBBtn type="submit" color="primary">
                    Submit
                  </MDBBtn>
                </div>
              </form>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    )
  }
}

export default Login;