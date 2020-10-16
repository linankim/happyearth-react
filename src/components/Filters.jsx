import React from "react";
import { Form, FormGroup, Button } from "react-bootstrap";
import "../styles/filters.css";

class Filters extends React.Component {
  state = {};

  render() {
    return (
      <Form>
        <Form.Group className="filter-borders">
          <div className="filter-borders-padding">
            <Form.Label>Search</Form.Label>
            <Form.Control
              type="search"
              placeholder="search by name.."
              onChange={(e) => this.props.updateSearchField(e)}
            />
          </div>
        </Form.Group>

        <Form.Group className="filter-borders ">
          <div className="filter-borders-padding">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => this.props.filterByType(e)}
            >
              <option value="All">All</option>
              <option value="Restaurant">Restaurant</option>
              <option value="Cafe">Cafe</option>
              <option value="Bar">Bar</option>
              <option value="Water Refill Station">Water Refill Station</option>
              <option value="Bulk Food">Bulk Food</option>
            </Form.Control>
            <Form.Label>Price Range</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => this.props.filterByType(e)}
            >
              <option value="All">Any</option>
              <option value="$">$</option>
              <option value="$$">$$</option>
              <option value="$$$">$$$</option>
            </Form.Control>
          </div>
        </Form.Group>

        <Form.Group className="filter-borders">
          <div className="filter-borders-padding">
            <Form.Label>View By</Form.Label>
            <Form.Label>Features</Form.Label>
          </div>
        </Form.Group>
      </Form>
    );
  }
}

export default Filters;
