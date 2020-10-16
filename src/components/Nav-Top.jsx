import React from "react";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import Login from "./Login.jsx";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import {
  Button,
  InputGroup,
  Navbar,
  Nav,
  NavLink,
  Card,
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Alert,
} from "react-bootstrap";

class TopNav extends React.Component {
  state = {
    localStorage: false,
    open: false,
    visible: false,
  };
  logoutButton(e) {
    e.preventDefault();
    localStorage.removeItem("token");
  }

  componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.setState({ localStorage: false });
    } else {
      this.setState({ localStorage: true });
    }
  }

  show = () => {
    this.setState({
      visible: true,
    });
  };

  hide = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
        <Navbar className="justify-content-end" style={{ paddingTop: "25px" }}>
          <Nav.Item>
            <Button variant="outline-light">
              <i class="fas fa-globe-africa"></i>
              Browse
            </Button>
          </Nav.Item>
          <Nav.Item>
            <Button variant="outline-light">
              <i class="far fa-edit"></i>
              Post
            </Button>

            <Button variant="outline-light" onClick={this.show.bind(this)}>
              <i class="far fa-user"></i>
              Account
            </Button>

            <Rodal
              className="loginRodal"
              visible={this.state.visible}
              onClose={this.hide.bind(this)}
              width="680"
              height="600"
            >
              <Login />
            </Rodal>
          </Nav.Item>
        </Navbar>
      </>
    );
  }
}

export default TopNav;
