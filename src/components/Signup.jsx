import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/login.css";
import "../styles/universal.css";
import { Button, Form, Col, Row } from "react-bootstrap";

class Signup extends React.Component {
  state = {
    user: {
      file: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      residenceCountry: "",
      avatar: "",
    },
    emptyField: {
      firstName: false,
      lastName: false,
      email: false,
      password: false,
      residenceCountry: false,
    },
    alert: false,
  };

  //change value of state for signup
  changeField = (e, field) => {
    let user = this.state.user;
    user[field] = e.target.value;
    this.setState({ user });
    this.emptyField();
    console.log({ user });
  };

  addFile = (e) => {
    let user = this.state.user;
    user.file = e.target.files[0];
    console.log("e.target.files[0]", e.target.files[0]);
    this.setState({ user }, () => {});
  };

  //alert for empty fields in signup form
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
          if (f === "email" && this.state.alert === true) {
            emptyField[f] = !emptyField[f];
            this.setState({ emptyField });
            this.state.alert = !this.state.alert;
            this.setState({ alert });
          } else if (f === field && emptyField[f] === true) {
            emptyField[f] = !emptyField[f];
            this.setState({ emptyField });
          } else {
            console.log("no alert for field");
          }
        }
      }
    }
  };

  //signup button
  signup = (e) => {
    e.preventDefault();
    if (
      this.state.user.firstName !== "" &&
      this.state.user.lastName !== "" &&
      this.state.user.email !== "" &&
      this.state.user.password !== "" &&
      this.state.user.residenceCountry !== "" &&
      this.state.user.avatar !== ""
    ) {
      let data = new FormData();
      console.log("i am at this point");
      for (let key in this.state.user) {
        console.log("KEY", this.state.user[key]);
        data.append(key, this.state.user[key]);
        console.log("i am here", data);
      }
      console.log({ data });
      axios
        .post(`http://localhost:4000/signup`, data)
        .then((res) => {
          console.log(res);
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
            if (sessionStorage !== undefined) {
              let path = sessionStorage.getItem("path");
              this.props.history.push(`${path}`);
              sessionStorage.removeItem("path");
            } else {
              this.props.history.push("/spots");
            }
          } else {
            console.log("else statement triggered");
            this.state.alert = !this.state.alert;
            this.setState({ alert: this.state.alert });
          }
        })
        .catch((err) => {
          console.log({ err });
        });
    } else if (
      this.state.user.firstName !== "" &&
      this.state.user.lastName !== "" &&
      this.state.user.email !== "" &&
      this.state.user.password !== "" &&
      this.state.user.residenceCountry !== ""
    ) {
      console.log("thats it");
      axios
        .post(`http://localhost:4000/signup`, this.state.user)
        .then((res) => {
          console.log("here i am");
          console.log(res);
          if (res.data.token) {
            console.log("at this point");
            localStorage.setItem("token", res.data.token);
            if (sessionStorage !== undefined) {
              let path = sessionStorage.getItem("path");
              this.props.history.push(`${path}`);
              sessionStorage.removeItem("path");
            } else {
              this.props.history.push("/spots");
            }
          } else {
            console.log("else statement triggered");
            this.state.alert = !this.state.alert;
            this.setState({ alert: this.state.alert });
          }
        })
        .catch((err) => {
          console.log({ err });
        });
    } else {
      this.emptyField();
    }
  };

  render() {
    return (
      <>
        <div className="signup-image">
          <Row>
            <Col>
              {" "}
              <h1
                style={{
                  fontFamily: "Pacifico",
                  color: "white",
                  fontSize: "15vh",
                  letterSpacing: "3px",
                  margin: "15vh 15vw 5vh",
                }}
              >
                {" happy earth"}
              </h1>
              <h2
                style={{
                  fontSize: "3vh",
                  letterSpacing: "2px",
                  margin: "0 10vw 0",
                }}
              >
                Join Happy Earth to become a contributor in your city or
                whenever you travel! Save your favorite spots, view more and get
                updates
              </h2>
            </Col>
            <Col>
              <Form controlId="SignupForm" style={{ margin: "20vh 2vw 0" }}>
                <Form.Row style={{ marginBottom: "2rem" }}>
                  <Form.Group as={Col} controlId="formGridFirstName">
                    <Form.Label className="signup-label">First Name</Form.Label>
                    <Form.Control
                      className="signup-form-control"
                      type="text"
                      value={this.state.user.firstName}
                      onChange={(e) => this.changeField(e, "firstName")}
                    />
                    {this.state.emptyField.firstName ? (
                      <p className="logininfontalert">
                        Please type in your first name.
                      </p>
                    ) : null}
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridSurname">
                    <Form.Label className="signup-label">Last Name</Form.Label>
                    <Form.Control
                      className="signup-form-control"
                      type="text"
                      value={this.state.user.lastName}
                      onChange={(e) => this.changeField(e, "lastName")}
                    />
                    {this.state.emptyField.lastName ? (
                      <p className="logininfontalert">Required!</p>
                    ) : null}{" "}
                  </Form.Group>
                </Form.Row>

                <Form.Group
                  controlId="formBasicEmail"
                  style={{ marginBottom: "2rem" }}
                >
                  <Form.Label className="signup-label">
                    Email address
                  </Form.Label>
                  <Form.Control
                    className="signup-form-control"
                    type="email"
                    value={this.state.user.email}
                    onChange={(e) => this.changeField(e, "email")}
                  />
                  {this.state.emptyField.email ? (
                    <p className="logininfontalert">
                      Please type in your email
                    </p>
                  ) : null}
                  {this.state.alert ? (
                    <p className="logininfontalert">Email already exists!</p>
                  ) : null}
                </Form.Group>
                <Form.Group>
                  <Form.Label className="signup-label">Password</Form.Label>
                  <Form.Control
                    className="signup-form-control"
                    type="password"
                    value={this.state.user.password}
                    onChange={(e) => this.changeField(e, "password")}
                  />{" "}
                  <i className="fa fa-eye password-icon" />
                  {this.state.emptyField.password ? (
                    <p className="logininfontalert">
                      Please type in your password.
                    </p>
                  ) : null}
                </Form.Group>
                <Form.Row style={{ marginTop: "2rem" }}>
                  <Form.Group as={Col}>
                    <Form.Label className="signup-label">
                      Date of Birth
                    </Form.Label>
                    <Form.Control
                      className="signup-form-control"
                      type="date"
                      value="today"
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label className="signup-label">
                      Country of Residence
                    </Form.Label>
                    <Form.Control
                      className="signup-form-control"
                      type="text"
                      value={this.state.user.residenceCountry}
                      onChange={(e) => this.changeField(e, "residenceCountry")}
                    />
                    {this.state.emptyField.residenceCountry ? (
                      <p className="logininfontalert">
                        Please type in your country of residence.
                      </p>
                    ) : null}
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  {" "}
                  <Button
                    style={{
                      margin: "2vh 0 0 8vw",
                      backgroundColor: "#45607c",
                      borderColor: "#45607c",
                    }}
                    variant="dark"
                    type="submit"
                    onClick={this.signup}
                  >
                    Submit{" "}
                  </Button>{" "}
                  <Link
                    to={`/login`}
                    style={{
                      color: "#fff",
                      textDecoration: "underline",
                      margin: "5vh 0 0 2vw",
                      fontSize: "18px",
                      /* text-transform: uppercase; */
                      letterSpacing: "0.5px",
                      fontFamily: "Jost",
                      cursor: "pointer",
                    }}
                  >
                    I already have an account
                  </Link>
                </Form.Row>
              </Form>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Signup;
