import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/login.css";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import Signup from "./Signup.jsx";

import { Button, Form, Col, Row, Container } from "react-bootstrap";

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
    isPasswordShown: false,
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
      if (`${user[field]}` === "") {
        for (f in emptyField) {
          if (f === field && emptyField[f] === false) {
            emptyField[f] = !emptyField[f];
            this.setState(emptyField);
          } else {
            console.log("user[field] in loop has input");
          }
        }
      } else {
        for (f in emptyField) {
          if (f === field && emptyField[f] === true) {
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
        .post(`http://localhost:4000/login`, this.state.user)
        .then((res) => {
          this.setState(this.state.user);
          if (!res.data.token) {
            this.state.alert = !this.state.alert;
            this.setState({ alert: this.state.alert });
          } else {
            localStorage.setItem("token", res.data.token);
            if (sessionStorage !== undefined) {
              let path = sessionStorage.getItem("path");
              this.props.history.push(`${path}`);
              sessionStorage.removeItem("path");
            } else {
              this.props.history.push("/spots"); ///wtf does this go to??
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

  componentWillMount() {
    console.log("this.state.options", this.state.options);
  }

  //show-hide password
  togglePasswordVisibility = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  };

  render = () => {
    const { isPasswordShown } = this.state;
    return (
      <>
        <Row style={{ height: "100vh" }}>
          <Col className="login-image"></Col>
          <Col style={{ margin: "12vh -4vw 0 10vw" }}>
            <Row>
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
            </Row>
            <Row>
              <Form style={{ width: "35vw" }}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
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
                    // type="password"
                    type={isPasswordShown ? "text" : "password"}
                    value={this.state.user.password}
                    onChange={(e) => this.changeField(e, "password")}
                  />
                  <i
                    className={`fa ${
                      isPasswordShown ? "fa-eye-slash" : "fa-eye"
                    } password-icon`}
                    onClick={this.togglePasswordVisibility}
                  />
                  {this.state.emptyField.password ? (
                    <p>Please type in your password</p>
                  ) : null}
                  {this.state.alert ? (
                    <p>Either email or password incorrect</p>
                  ) : null}{" "}
                </Form.Group>
              </Form>
            </Row>
            <Row>
              <Button
                style={{
                  color: "#000",
                  backgroundColor: "#fff",
                  borderColor: "black",
                  marginTop: "15px",
                  padding: "5px",
                }}
                variant="dark"
                type="submit"
                onClick={this.login}
              >
                Login
              </Button>
              <Link to={`/signup`}>
                <Button
                  style={{
                    color: "#000",
                    backgroundColor: "#fff",
                    borderColor: "black",
                    marginTop: "15px",
                    padding: "5px",
                  }}
                >
                  Create an account
                </Button>
              </Link>
            </Row>
          </Col>
        </Row>
      </>
    );
  };
}

export default Login;
