import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import "../styles/nav.css";

class NavSpots extends React.Component {
  state = {
    user: {
      avatar: "",
      firstName: "",
    },
    menuOpen: false,
    guest: true,
    firstName: "Guest",
    avatar: "fas fa-smile-beam",
  };

  componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.setState({ guest: true });
    } else {
      this.setState({ guest: false });
    }
    axios
      .get(`http://localhost:4000/auth`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((user) => this.setState({ user: user.data }))
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <nav className="height">
        <Link
          to="/"
          className="logo"
          style={{
            backgroundImage: `url('')`,
          }}
        ></Link>
        <div className="profile">
          <Link to="/profile" className="button">
            {this.state.guest ? (
              <wrapper>
                <div
                  className="fas fa-smile-beam"
                  style={{
                    backgroundImage: `url(${this.state.avatar})`,
                  }}
                ></div>
                <span>{this.state.firstName}</span>
              </wrapper>
            ) : (
              <wrapper>
                <div
                  className="avatar "
                  style={{
                    backgroundImage: `url(${this.state.user.avatar})`,
                  }}
                ></div>
                <span> {this.state.user.firstName} </span>
              </wrapper>
            )}
          </Link>
        </div>
      </nav>
    );
  }
}

export default NavSpots;
