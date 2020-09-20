import React from "react";
import axios from "axios";
import "../styles/login.css";
import { Link, Route, Switch } from "react-router-dom";

import {
  Button,
  Modal,
  Navbar,
  Nav,
  NavLink,
  FormControl,
  Form,
  FormGroup,
  FormLabel,
  FormText,
} from "react-bootstrap";

class Login extends React.Component {
  state = {
    user: {
      email: "",
      password: "",
    },
    emptyField: {
      email: false,
      password: false,
    },
    alert: false,
  };

  // change value of state for login
  changeField = (e, field) => {
    let user = this.state.user;
    user[field] = e.target.value;
    this.setState({ user });
    this.emptyField();
    console.log({ user });
  };

  //alert for empty fields in login form
  emptyField = (field, f) => {
    let user = this.state.user;
    let emptyField = this.state.emptyField;
    for (field in user) {
      if (`${user[field]}` == "") {
        for (f in emptyField) {
          if (f == field && emptyField[f] == false) {
            emptyField[f] = !emptyField[f];
            this.setState(emptyField);
          } else {
            console.log("user[field] in loop has input");
          }
        }
      } else {
        for (f in emptyField) {
          if (f == field && emptyField[f] == true) {
            emptyField[f] = !emptyField[f];
            this.setState(emptyField);
          } else {
            console.log("no alert for field");
          }
        }
      }
    }
  };

  //login button
  login = (e) => {
    e.preventDefault();
    if (this.state.user.email !== "" && this.state.user.password !== "") {
      axios
        .post(`${process.env.REACT_APP_API}/login`, this.state.user)
        .then((res) => {
          this.setState(this.state.user);
          if (!res.data.token) {
            this.state.alert = !this.state.alert;
            this.setState({ alert: this.state.alert });
          } else {
            localStorage.setItem("token", res.data.token);
            if (sessionStorage != undefined) {
              let path = sessionStorage.getItem("path");
              this.props.history.push(`${path}`);
              sessionStorage.removeItem("path");
            } else {
              this.props.history.push("/spots");
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.emptyField();
    }
  };

  render() {
    return (
      <>
        <div style={{}}>
          <h1
            style={{
              fontFamily: "Pacifico",
              color: "black",
              fontSize: "70px",
              letterSpacing: "3px",
              marginBottom: "50px",
              marginTop: "50px",
            }}
          >
            {" happy earth"}
          </h1>
          <h2
            style={{
              color: "black",
              fontSize: "20px",
              fontFamily: "Jost",
              fontSize: "20px",
              letterSpacing: "1px",
              margin: "0 0vw 4vh 0",
            }}
          >
            Welcome back! Please log in using your details
          </h2>

          <div style={{ padding: "0 15vw" }}>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={this.state.user.email}
                  onChange={(e) => this.changeField(e, "email")}
                />
                {this.state.emptyField.email ? (
                  <p>Please type in your email</p>
                ) : null}
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={this.state.user.password}
                  onChange={(e) => this.changeField(e, "password")}
                />
                {this.state.emptyField.password ? (
                  <p>Please type in your password</p>
                ) : null}
                {this.state.alert ? (
                  <p>Either email or password incorrect</p>
                ) : null}{" "}
              </Form.Group>
              <Button
                style={{ margin: "2vh 0 2vh 0" }}
                variant="dark"
                type="submit"
                onClick={this.login}
              >
                Login
              </Button>
            </Form>
            <div style={{ fontFamily: "Jost" }}>
              Not a member? <Link to="signup">Create an account</Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Login;
