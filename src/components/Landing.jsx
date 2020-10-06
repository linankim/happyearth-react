import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import axios from "axios";
import "../styles/landing.css";
import TopNav from "./Navbar.jsx";
import Spots from "./Spots.jsx";

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

class Landing extends React.Component {
  state = {
    options: [],
    open: false,
  };

  search = (e) => {
    axios
      .get(`${process.env.REACT_APP_API}/cities?name=${e.target.value}`)
      .then((res) => {
        console.log({ res });
        // if length, set state options
        // else set state options = "Not found"
        if (res.data[0]) {
          console.log("res.data", res.data);
          this.setState({ options: res.data });
        } else {
          this.setState({
            options: ["Not available"],
          });
        }
      })
      .catch((err) => {
        console.log("errorr >>>", { err });
        // else set state options = "Not found"
      });
    this.setState({ open: true });
  };

  selectOption = (e) => {
    this.props.history.push(`/spots?city=${e.target.id}`);
  };
  dropdownStatus = () => {
    if (this.state.open) {
      return "dropdown open";
    } else {
      return "dropdown";
    }
  };

  componentWillMount() {
    console.log("this.state.options", this.state.options);
  }

  render() {
    return (
      <>
        <div className="bg-img ">
          <TopNav />

          <div className="hero-text ">
            <div
              style={{
                marginTop: "0px",
              }}
            >
              <h1
                style={{
                  fontFamily: "Pacifico",
                  color: "white",
                  fontSize: "150px",
                  letterSpacing: "3px",
                  marginBottom: "50px",
                }}
              >
                {" happy earth"}
              </h1>
            </div>
            <h2 class="secondary">
              Crowd-sourced reviews of your city's most eco-friendly and
              sustainable restaurants, shops and cafes.
            </h2>

            <div className="center-search">
              <i className="fas fa-search-location searchIcon"></i>
              <input
                className="center-searchBox"
                type="text"
                placeholder="Search by city"
                onChange={this.search}
                style={{
                  boxShadow: "none",
                  fontFamily: "Jost",
                  fontSize: "22px",
                  letterSpacing: "3px",
                  color: "black",
                  padding: "5px",
                }}
              ></input>
            </div>
            {/*
						1. insert dropdown with results
						2. each option has onClick={this.selectOption}
						*/}
            <div className={this.dropdownStatus()}>
              {this.state.options.map((option) => {
                return (
                  <div
                    className="option"
                    onClick={this.selectOption}
                    id={option}
                  >
                    {option}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div style={{ height: "85vh" }}>
          <div className="center-box">
            <div className="grid five">
              <h2 className="secondary" style={{ color: "black" }}>
                Browse Happy Earth's Top Reviewed Cities:
              </h2>{" "}
              <Card
                style={{
                  width: "22vw",
                  height: "60vh",
                  borderRadius: "30px",
                  backgroundColor: "#fbd2d7",
                }}
              >
                <Card.Img
                  style={{}}
                  variant="top"
                  src="https://source.unsplash.com/AFlG5jpMvYg/1600x900"
                />
                <Card.Body>
                  <Card.Title>City Name</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button
                    variant="primary"
                    style={{
                      margin: "5vh 4vw 0 2vw",
                      width: "200px",
                      height: "8vh",
                      borderRadius: "12px",
                    }}
                  >
                    See $cityname Spots
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Landing;
