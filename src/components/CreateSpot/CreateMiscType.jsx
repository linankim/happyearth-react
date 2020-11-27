import React from "react";
import axios from "axios";
import {
  Container,
  Form,
  Accordion,
  Card,
  Button,
  Col,
  Row,
  ProgressBar,
} from "react-bootstrap";
import { Link } from "react-router-dom";

// import "../styles/create.css";
// import "../styles/universal.css";

class CreateMiscType extends React.Component {
  state = {
    user: {},
    spot: {
      files: [],
      images: [],
      types: [],
      // eatins: [],
      // takeaways: [],
      features: [],
      lat: "",
      lng: "",
      // toggleEatins: false,
      // toggleTakeaways: false,
      toggleFeatures: false,
    },
    // eatins: [],
    // takeaways: [],
    features: [],
    types: [],
  };

  UNSAFE_componentWillMount() {
    let types = this.state.types;
    // let eatins = this.state.eatins;
    // let takeaways = this.state.takeaways;
    let features = this.state.features;

    axios
      .get(`http://localhost:4000/typesmisc`)
      .then((res) => {
        types = res.data;
        this.setState({ types });
      })
      .catch((err) => {
        console.log({ err });
      });
    // axios
    //   .get(`http://localhost:4000/eatins`)
    //   .then((res) => {
    //     eatins = res.data;
    //     this.setState({ eatins });
    //     console.log({ eatins });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // axios
    //   .get(`http://localhost:4000/takeaways`)
    //   .then((res) => {
    //     takeaways = res.data;
    //     this.setState({ takeaways });
    //     console.log({ takeaways });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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

  //upload files
  getFile = (e) => {
    let spot = this.state.spot;
    spot.files = e.target.files;
    this.setState({ spot }, () => {
      console.log("state", this.state);
    });
  };

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
        <ProgressBar now={50} />
        <div>
          <Button variant="light" onClick={(e) => this.toggleTakeaway(e)}>
            Add features{" "}
          </Button>

          {this.state.spot.toggleTakeaways
            ? this.state.takeaways.map((takeaway) => {
                return (
                  <label className="checkbox labelfont">
                    <input
                      type="checkbox"
                      value={takeaway._id}
                      onChange={(e) => this.checkBox(e)}
                    />
                    <i className={takeaway.icon}></i>
                    <span>{takeaway.explanation}</span>
                  </label>
                );
              })
            : null}
        </div>

        <Container>
          <Form.Group>
            <Form className="createform">
              <span style={{ fontSize: "20px", color: "gray" }}> Step 1</span>

              <Form.Label style={{ fontSize: "50px", padding: "20vh" }}>
                Suggest a spot to Happy Earth
              </Form.Label>
              <p style={{ fontSize: "30px" }}>
                Help us add to Happy Earth! If you've found a spot that meet's
                Happy Earth's standard, help our community by contirbuting to
                Happy Earth! Suggest your favorite local small businesses,
                locally owned and operated shops & eateries, and all around
                eco-friendly spots!
              </p>

              <p style={{ fontSize: "30px" }}>Info</p>
              <Form.Label> Business Name and Description</Form.Label>

              <Form.Control
                size="sm"
                type="text"
                placeholder="Enter business name"
              />
              <br />
              <Form.Control
                as="textarea"
                type="text"
                placeholder="Give a brief description of this place and what it offers in comparioson to others. Don't worry about adding sustainability features here, you'll have a chance to add that in Step 2."
                rows={3}
              />
              <br />
              <p style={{ fontSize: "30px" }}>Details</p>
              <Form.Label> Type of Spot </Form.Label>

              <Form.Control
                size="sm"
                as="select"
                onChange={(e) => this.changeField(e, "types")}
              >
                {this.state.types.map((type) => {
                  return <option value={type._id}>{type.name}</option>;
                })}
                >
              </Form.Control>
              <br />
              <div>
                <p style={{ fontSize: "30px" }}>Location</p>
                <p style={{ fontSize: "20px" }}>Where is your spot located?</p>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control size="sm" type="text" placeholder="..." />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridNighborhood">
                    <Form.Label>Neighborhood</Form.Label>
                    <Form.Control
                      size="sm"
                      type="text"
                      placeholder="Neigborhood"
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridCountry">
                    <Form.Label>Country</Form.Label>
                    <Form.Control size="sm" type="text" placeholder="Country" />
                  </Form.Group>
                </Form.Row>
                <br />

                <Form.Row>
                  <Form.Group as={Col} controlId="formGridLat">
                    <Form.Label className="labelfont">Latitude</Form.Label>
                    <Form.Control
                      type="number"
                      value={this.state.spot.lat}
                      onChange={(e) => this.changeField(e, "lat")}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridLng">
                    <Form.Label className="labelfont">Longitude</Form.Label>
                    <Form.Control
                      type="number"
                      value={this.state.spot.lng}
                      onChange={(e) => this.changeField(e, "lng")}
                    />
                  </Form.Group>
                </Form.Row>
                <Row>
                  <Col>
                    <Link to="/landing">{"< Back"}</Link>
                  </Col>
                  <Col>
                    <Link to="/create-type">{" Add Details >"}</Link>
                  </Col>{" "}
                </Row>
              </div>
            </Form>
          </Form.Group>
        </Container>
      </div>
    );
  }
}

export default CreateMiscType;
