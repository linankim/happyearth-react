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
            border: "1px solid #E0E0E0",
          }}
        >
          <Card.Img src={this.state.spot.images[0]} variant="top" />
          <Card.Body>
            <Card.Title>{this.state.spot.title}</Card.Title>
            <Card.Text>
              <span>
                {this.state.spot.city}, {this.state.spot.country}
              </span>
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
          <Card.Footer>
            <small className="text-muted">
              <span>
                {this.state.spot.city}, {this.state.spot.country}
              </span>
            </small>
          </Card.Footer>
        </Card>
      </>
    );
  }
}

export default Cards;
