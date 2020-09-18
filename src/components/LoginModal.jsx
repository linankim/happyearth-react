import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import axios from "axios";
import "../styles/landing.css";
import {
  FormControl,
  Form,
  Button,
  InputGroup,
  Navbar,
  Nav,
  NavLink,
  Card,
  ButtonGroup,
  Alert,
} from "react-bootstrap";

import Rodal from "rodal";
import "rodal/lib/rodal.css";

class LoginModal extends React.Component {
  state = {
    open: false,
    visible: false,
    check: false,
  };

  componentWillMount() {
    console.log("this.state.options", this.state.options);
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

  checkboxToggle = (e) => {
    this.setState({ check: true });
  };

  render() {
    return (
      <>
        <div>
          <Rodal
            visible={this.state.visible}
            onClose={this.hide.bind(this)}
            width="700"
            height="440"
          >
            <div> hry</div>
          </Rodal>
        </div>
      </>
    );
  }
}

export default LoginModal;
