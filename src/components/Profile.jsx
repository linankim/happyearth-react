import React from "react";
import axios from "axios";
// import Nav from "./Nav.jsx";
import Popup from "./Popup.jsx";
import "../styles/profile.css";
import "../styles/forms.css";
import { Button, Form, Col, Container, Row } from "react-bootstrap";

class Profile extends React.Component {
  state = {
    user: {
      file: "",
    },
    showPopup: false,
  };

  componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/");
    } else {
      axios
        .get(`http://localhost:4000/auth`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((user) => {
          console.log("works");
          this.setState({ user: user.data });
          console.log({ user: user.data });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  //logout button
  logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    this.props.history.push("/");
  };

  //change profile details
  changeField = (e, field) => {
    let user = this.state.user;
    user[field] = e.target.value;
    console.log(user[field]);
    this.setState({ user });
    console.log({ user });
  };

  //change profile picture
  changePicture = (e) => {
    let user = this.state.user;
    user.file = e.target.files[0];
    console.log("e.target.files[0]", e.target.files[0]);
    this.setState({ user });
    console.log({ user });
  };

  //save changed profile details
  savesChanges = () => {
    console.log("button pushed");
    let userId = this.state.user._id;
    let data = new FormData();
    console.log("i am at this point");
    for (let key in this.state.user) {
      console.log("KEY", this.state.user[key]);
      data.append(key, this.state.user[key]);
      console.log("i am here", data);
    }
    console.log({ data });
    axios
      .patch(`http://localhost:4000/users/${userId}`, data)
      .then((res) => {
        console.log("works until here");
        console.log({ res });
      })
      .catch((err) => {
        console.log({ err });
        console.log("not working in react");
      });
  };

  //alert button
  alertButton = (e) => {
    e.preventDefault();
    let showPopup = this.state.showPopup;
    showPopup = !showPopup;
    this.setState({ showPopup });
  };

  //delete Profile
  deleteProfile = (e) => {
    e.preventDefault();
    let userId = this.state.user._id;
    axios
      .delete(`http://localhost:4000/users/${userId}`)
      .then((res) => {
        console.log("working");
        console.log(res);
        localStorage.removeItem("token");
        this.props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <Container>
        <Form style={{ margin: "2vh 0 0 2vh" }}>
          <Form.Row>Profile</Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label className="loginfont">Change Profile Pic</Form.Label>

              <Form.Control
                className="avatar"
                style={{
                  backgroundImage: `url(${this.state.user.avatar})`,
                }}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Control type="file" onChange={this.changePicture} />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label> First Name</Form.Label>
              <Form.Control
                style={{ height: "10vh ", padding: "1em " }}
                type="text"
                value={this.state.user.firstName}
                onChange={(e) => this.changeField(e, "firstName")}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label> Last Name</Form.Label>
              <Form.Control
                style={{ height: "10vh ", padding: "1em " }}
                type="text"
                value={this.state.user.lastName}
                onChange={(e) => this.changeField(e, "lastName")}
              />{" "}
            </Form.Group>{" "}
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label> Email</Form.Label>
              <Form.Control
                style={{ height: "10vh ", padding: "1em " }}
                type="email"
                value={this.state.user.email}
                onChange={(e) => this.changeField(e, "email")}
              />
            </Form.Group>{" "}
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Country of Residence</Form.Label>
              <Form.Control
                style={{ height: "10vh ", padding: "1em " }}
                type="text"
                value={this.state.user.residenceCountry}
                onChange={(e) => this.changeField(e, "residenceCountry")}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>DOB</Form.Label>
              <Form.Control
                style={{ height: "10vh ", padding: "1em " }}
                type="text"
                value={this.state.user.dateofbirth}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group style={{ width: "100%", paddingLeft: "1vh" }}>
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                style={{ height: "30vh ", padding: "2em " }}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Button onClick={this.savesChanges()}>Save Changes</Button>
          </Form.Row>
          <Form.Row>
            <Button onClick={(e) => this.alertButton(e)}>
              {this.state.showPopup ? (
                <Popup deleteProfile={this.deleteProfile} />
              ) : null}
              Delete My Profile
            </Button>
            <Button className="logout" onClick={this.logout}>
              Logout
            </Button>
          </Form.Row>
        </Form>
      </Container>
    );
  }
}

export default Profile;
