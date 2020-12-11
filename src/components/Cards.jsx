import React from "react";
import { Link } from "react-router-dom";
// import { Button } from "react-bootstrap";
import "../styles/grid.css";
import "../styles/cards.css";
import "../styles/spots.css";

class Cards extends React.Component {
  state = {
    spot: this.props.spot,
    types: this.props.spot.types,
  };

  selectBackground = (background) => {
    return { backgroundImage: `url('${background}')` };
  };

  UNSAFE_componentWillReceiveProps() {
    this.setState({ spot: this.props.spot });
  }

  render() {
    return (
      <>
        <Link className="card link" to={`/spots/${this.state.spot._id}`}>
          <div
            className="image"
            style={this.selectBackground(this.state.spot.images[0])}
          ></div>
          <div className="content">
            <small className="meta">{this.state.spot.title}</small>
            <div>
              <small className="meta loginfont">{this.state.types.name}</small>

              <h2>{this.state.spot.title}</h2>
            </div>
            <span>
              {this.state.spot.city} test{this.state.spot.country}
            </span>
          </div>
        </Link>
      </>
    );
  }
}

export default Cards;
