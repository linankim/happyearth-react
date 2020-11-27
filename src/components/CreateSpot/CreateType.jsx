import React from "react";
import axios from "axios";
import {
  Container,
  Form,
  Accordion,
  Card,
  Button,
  Col,
  ProgressBar,
} from "react-bootstrap";
// import "../styles/create.css";
// import "../styles/universal.css";
import { Link } from "react-router-dom";

class Create extends React.Component {
  state = {
    user: {},
    spot: {
      // files: [],
      // images: [],
      types: "",
      eatins: [],
      takeaways: [],
      features: [],
      // lat: "",
      // lng: "",
      toggleEatins: false,
      toggleTakeaways: false,
      toggleFeatures: false,
    },
    types: [],
    eatins: [],
    takeaways: [],
    features: [],
  };

  UNSAFE_componentWillMount() {
    let types = this.state.types;
    let eatins = this.state.eatins;
    let takeaways = this.state.takeaways;
    let features = this.state.features;

    axios
      .get(`http://localhost:4000/types`)
      .then((res) => {
        types = res.data;
        this.setState({ types });
      })
      .catch((err) => {
        console.log({ err });
      });
    axios
      .get(`http://localhost:4000/eatins`)
      .then((res) => {
        eatins = res.data;
        this.setState({ eatins });
        console.log({ eatins });
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`http://localhost:4000/takeaways`)
      .then((res) => {
        takeaways = res.data;
        this.setState({ takeaways });
        console.log({ takeaways });
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`http://localhost:4000/features`)
      .then((res) => {
        features = res.data;
        this.setState({ features });
        console.log({ features });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    let spot = this.state.spot;
    if (!localStorage.getItem("token")) {
      sessionStorage.setItem("path", "/create");
      this.props.history.push("/Signup");
    } else {
      axios
        .get(`http://localhost:4000/auth`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((user) => {
          this.setState({ user: user.data });
          this.state.spot.spotters = this.state.user._id;
          this.state.spot.types = this.stae.types[0]._id;
          this.setState({ spot });
        })
        .catch((err) => console.log(err));
    }
  }

  //setState with input
  changeField = (e, field) => {
    let spot = this.state.spot;
    spot[field] = e.target.value;
    this.setState({ spot });
  };

  //toggle eatins
  toggleEatin = (e) => {
    let spot = this.state.spot;
    spot.toggleEatins = !spot.toggleEatins;
    this.setState({ spot });
  };

  //toggle takeaways
  toggleTakeaway = (e) => {
    let spot = this.state.spot;
    spot.toggleTakeaways = !spot.toggleTakeaways;
    this.setState({ spot });
  };

  //toggle features
  toggleFeature = (e) => {
    let spot = this.state.spot;
    spot.toggleFeatures = !spot.toggleFeatures;
    this.setState({ spot });
  };

  //select takeaways
  checkBox = (e) => {
    let spot = this.state.spot;
    let _id = e.target.value;
    // let takeaways = spot.takeaways;

    if (spot.takeaways.find((takeaway) => takeaway === _id)) {
      spot.takeaways = spot.takeaways.filter((takeaway) => takeaway !== _id);
    } else {
      spot.takeaways.push(_id);
      if (spot.takeaways) this.setState({ spot: spot.takeaways });
    }
    this.setState({ spot });
  };

  //select eatins
  checkbox2 = (e) => {
    let spot = this.state.spot;
    let _id = e.target.value;
    // let eatins = spot.eatins;

    if (spot.eatins.find((eatin) => eatin === _id)) {
      spot.eatins = spot.eatins.filter((eatin) => eatin !== _id);
    } else {
      spot.eatins.push(_id);
      this.setState({ spot: spot.eatins });
    }
    this.setState({ spot });
  };

  //select features
  checkbox3 = (e) => {
    let spot = this.state.spot;
    let _id = e.target.value;
    // let eatins = spot.eatins;

    if (spot.features.find((feature) => feature === _id)) {
      spot.features = spot.features.filter((feature) => feature !== _id);
    } else {
      spot.features.push(_id);
      this.setState({ spot: spot.features });
    }
    this.setState({ spot });
  };

  //no file upload on this page
  // getFile = (e) => {
  //   let spot = this.state.spot;
  //   spot.files = e.target.files;
  //   this.setState({ spot }, () => {
  //     console.log("state", this.state);
  //   });
  // };

  //button create place and upload files via cloudinary
  createPlace = (e) => {
    e.preventDefault();
    let data = new FormData();
    for (let key in this.state.spot) {
      if (
        (typeof this.state.spot[key] == "object" && key === "eatins") ||
        key === "takeaways"
      ) {
        this.state.spot[key].forEach((val) => {
          data.append(`${key}[]`, val);
        });
      } else if (typeof this.state.spot[key] == "object" && key === "files") {
        for (let i = 0; i < this.state.spot[key].length; i++) {
          data.append(key, this.state.spot[key][i]);
        }
      } else {
        data.append(key, this.state.spot[key]);
      }
    }
    console.log({ data });
    axios
      .post(`http://localhost:4000/spots`, data)
      .then((res) => {
        let spotId = res.data.spot._id;
        this.props.history.push(`/spots/${spotId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <ProgressBar now={25} />
        <Container>
          <Form.Group>
            <Form className="createform">
              <Link
                className="card link"
                to={`/create-food-drink-spot`}
                style={{ width: "15rem" }}
              >
                <div style={{ margin: "5vh 7vw" }}>
                  <i class="fas fa-utensils">{" + "}</i>

                  <i class="fas fa-glass-cheers"></i>
                </div>
                <Card.Title style={{ textAlign: "center" }}>
                  Food/Drink
                </Card.Title>{" "}
                <div className="content">
                  <Card.Text
                    className="mb-2 text-muted"
                    style={{ textAlign: "center" }}
                  >
                    Bars, Cafes, Food Trucks, Restaurants, etc.
                  </Card.Text>
                </div>
              </Link>

              <Link
                className="card link"
                to={`/create-shop-spot`}
                style={{ width: "15rem", margin: "5em" }}
              >
                <i
                  class="fas fa-shopping-basket"
                  style={{ margin: "5vh 8vw" }}
                ></i>
                <Card.Title style={{ textAlign: "center" }}>
                  Food Shop
                </Card.Title>{" "}
                <div className="content">
                  <Card.Text
                    className="mb-2 text-muted"
                    style={{ textAlign: "center" }}
                  >
                    Grocery stores, Health Food Shops, Mini Markets, Co-ops etc.
                  </Card.Text>
                </div>
              </Link>
              <Link
                className="card link"
                to={`/create-misc-spot`}
                style={{ width: "15rem", margin: "5em" }}
              >
                <i class="fas fa-store-alt" style={{ margin: "5vh 8vw" }}></i>
                <Card.Title style={{ textAlign: "center" }}>
                  Misc
                </Card.Title>{" "}
                <div className="content">
                  <Card.Text
                    className="mb-2 text-muted"
                    style={{ textAlign: "center" }}
                  >
                    Secondhand Shops, Community Gardens, Laundromats, Eco
                    Friendly Stores etc.
                  </Card.Text>
                </div>
              </Link>
            </Form>
          </Form.Group>
        </Container>
      </div>
    );
  }
}

export default Create;
