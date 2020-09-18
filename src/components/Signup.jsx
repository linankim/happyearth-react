import React from "react";
import axios from "axios";
import "../styles/login.css";
import "../styles/universal.css";
import Sidebar from "./Sidebar.jsx";

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
          if (f == "email" && this.state.alert == true) {
            emptyField[f] = !emptyField[f];
            this.setState({ emptyField });
            this.state.alert = !this.state.alert;
            this.setState({ alert });
          } else if (f == field && emptyField[f] == true) {
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
        .post(`${process.env.REACT_APP_API}/signup`, data)
        .then((res) => {
          console.log(res);
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
            if (sessionStorage != undefined) {
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
        .post(`${process.env.REACT_APP_API}/signup`, this.state.user)
        .then((res) => {
          console.log("here i am");
          console.log(res);
          if (res.data.token) {
            console.log("at this point");
            localStorage.setItem("token", res.data.token);
            if (sessionStorage != undefined) {
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
      <div>
        <div className="signup-grid">
          <div>
            <form className="signup-container">
              <h2
                class="secondary"
                style={{
                  color: "black",
                  fontSize: "25px",
                }}
              >
                welcome to{" "}
              </h2>
              <h1
                style={{
                  fontFamily: "Pacifico",
                  color: "black",
                  fontSize: "60px",
                  letterSpacing: "3px",
                }}
              >
                happy earth
              </h1>
              <h2
                class="secondary"
                style={{
                  color: "black",
                }}
              >
                Please create an account
              </h2>
              <div>
                <input
                  type="text"
                  value={this.state.user.firstName}
                  onChange={(e) => this.changeField(e, "firstName")}
                />
                {this.state.emptyField.firstName ? (
                  <p className="logininfontalert">
                    Please type in your first name.
                  </p>
                ) : null}
              </div>
              <div className="group">
                <label className="labelfont">Last Name</label>
                <input
                  type="text"
                  value={this.state.user.lastName}
                  onChange={(e) => this.changeField(e, "lastName")}
                />
                {this.state.emptyField.lastName ? (
                  <p className="logininfontalert">
                    Please type in your last name.
                  </p>
                ) : null}
              </div>
              <div className="group">
                <label className="labelfont">Country of Residence</label>
                <input
                  type="text"
                  value={this.state.user.residenceCountry}
                  onChange={(e) => this.changeField(e, "residenceCountry")}
                />
                {this.state.emptyField.residenceCountry ? (
                  <p className="logininfontalert">
                    Please type in your country of residence.
                  </p>
                ) : null}
              </div>
              <div className="group">
                <label className="labelfont">Email</label>
                <input
                  type="email"
                  value={this.state.user.email}
                  onChange={(e) => this.changeField(e, "email")}
                />
                {this.state.emptyField.email ? (
                  <p className="logininfontalert">Please type in your email.</p>
                ) : null}
              </div>
              <div className="group">
                <label className="labelfont">Password</label>
                <input
                  type="password"
                  value={this.state.user.password}
                  onChange={(e) => this.changeField(e, "password")}
                />
                {this.state.emptyField.password ? (
                  <p className="logininfontalert">
                    Please type in your password.
                  </p>
                ) : null}
              </div>
              <div className="group">
                <label className="labelfont">Profile Picture</label>
                <input type="file" onChange={this.addFile} />
              </div>
              {this.state.alert ? (
                <p className="logininfontalert">Email already exist</p>
              ) : null}
              <button className="primary" onClick={this.signup}>
                Signup
              </button>
            </form>
          </div>
          <div
            className="signup-image"
            style={{ width: "44vw", opacity: "0.9" }}
          ></div>
        </div>
      </div>
    );
  }
}

export default Signup;
