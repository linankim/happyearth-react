import React from "react";
import axios from "axios";

class Login extends React.Component {
  state = {
    user: {}
  };

  // Login button
  changeField = (e, field) => {
    let user = this.state.user;
    user[field] = e.target.value;
    this.setState({ user });
    console.log({ user });
  };

  login = e => {
    e.preventDefault();
    console.log("whats wrong");
    axios
      .post(`${process.env.REACT_APP_API}/login`, this.state.user)
      .then(res => {
        this.setState(this.state.user);
        console.log("this.state.user", this.state.user);
      })
      .catch(err => {
        console.log(err);
        console.log("no");
      });
  };

  render() {
    return (
      <div className="grid center middle tall image">
        <div className="card small">
          <div className="content">
            <div className="logo">
              <h1>Happy Earth</h1>
            </div>
            <form>
              <div className="group">
                <label>Email</label>
                <input
                  type="email"
                  value={this.state.email}
                  onChange={e => this.changeField(e, "email")}
                />
              </div>
              <div className="group">
                <label>Password</label>
                <input
                  type="password"
                  value={this.state.password}
                  onChange={e => this.changeField(e, "password")}
                />
              </div>
              <button className="primary" onClick={this.login}>
                Login
              </button>
            </form>
            <p className="footer">
              <a href="">Signup</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
