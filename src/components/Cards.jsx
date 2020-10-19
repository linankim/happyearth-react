import React from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, CardGroup, Button } from "react-bootstrap";
import "../styles/grid.css";

class Cards extends React.Component {
  state = {
    spot: this.props.spot,
    types: this.props.spot.types,
  };

  // selectBackground = (background) => {
  //   return { backgroundImage: `url('${background}')` };
  // };

  UNSAFE_componentWillReceiveProps() {
    this.setState({ spot: this.props.spot });
  }

  render() {
    return (
      <>
        <Card
          style={{
            background: "#FFFFFF",
            border: "1px solid #EOEOEO",
            width: "16rem",
          }}
        >
          <Card.Img
            src={this.state.spot.images[0]}
            variant="top"
            style={{ width: "100px", height: "160px" }}
          />
          <Card.Body>
            <Card.Title>{this.state.spot.title}</Card.Title>
            <Card.Text>
              <div>
                {this.state.types ? (
                  <small>{this.state.types.name}</small>
                ) : null}
              </div>
            </Card.Text>
            <Link className="card link" to={`/spots/${this.state.spot._id}`}>
              {"view"}
            </Link>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default Cards;
