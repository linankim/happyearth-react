import React from "react";
import { Form, Button } from "react-bootstrap";
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
              className="sidebar-search"
              type="search"
              placeholder="Search by name.."
              onChange={(e) => this.props.updateSearchField(e)}
            />
          </div>
        </Form.Group>

        <Form.Group className="filter-borders ">
          <div className="filter-borders-padding">
            <Form.Label className="form-label">Category</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => this.props.filterByType(e)}
              style={{ margin: "5px 0 25px" }}
            >
              <option value="All">All</option>
              <option value="Bar">Bars</option>
              <option value="Bulk Food">Bulk Food</option>
              <option value="Cafe">Cafes</option>
              <option value="Bulk Food">Grocery</option>
              <option value="Restaurant">Restaurants</option>
              <option value="Water Refill Station">Water Refill Station</option>
            </Form.Control>
            <Form.Label>Price Range</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => this.props.filterByType(e)}
              style={{ margin: "5px 0 10px" }}
            >
              <option value="All">Any</option>
              <option value="$">$ </option>
              <option value="$$">$$</option>
              <option value="$$$">$$$</option>
            </Form.Control>
          </div>
        </Form.Group>

        <Form.Group className="filter-borders">
          <div className="filter-borders-padding">
            <Form.Label
              className="feature-buttons"
              style={{ margin: "0 0 25px" }}
            >
              Products:
            </Form.Label>
            <div style={{ marginBottom: "30px" }}>
              <Button
                variant="light"
                size="sm"
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid #eeeeef",
                  borderRadius: "15px",
                  width: "30%",
                  fontSize: "12px",
                }}
              >
                Zero Waste
              </Button>
              <Button
                variant="light"
                size="sm"
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid #eeeeef",
                  borderRadius: "14px",
                  width: "30%",
                  fontSize: "12px",
                }}
              >
                Plastic Free{" "}
              </Button>

              <Button
                variant="light"
                size="sm"
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid #eeeeef",
                  borderRadius: "14px",
                  width: "40%",
                  fontSize: "12px",
                }}
              >
                Vegetarian/Vegan
              </Button>
            </div>

            <Form.Label
              className="feature-buttons"
              style={{ margin: "0 0 25px" }}
            >
              Business Features:
            </Form.Label>
            <Button
              variant="light"
              size="sm"
              style={{
                backgroundColor: "transparent",
                border: "1px solid #eeeeef",
                borderRadius: "14px",
                width: "40%",
                fontSize: "12px",
              }}
            >
              Bulk Bin
            </Button>
            <Button
              variant="light"
              size="sm"
              style={{
                backgroundColor: "transparent",
                border: "1px solid #eeeeef",
                borderRadius: "14px",
                width: "40%",
                fontSize: "12px",
              }}
            >
              Second-Hand
            </Button>
            <Button
              variant="light"
              size="sm"
              style={{
                backgroundColor: "transparent",
                border: "1px solid #eeeeef",
                borderRadius: "14px",
                width: "45%",
                fontSize: "12px",
              }}
            >
              BYO Reusable Items{" "}
            </Button>
          </div>
        </Form.Group>
      </Form>
    );
  }
}

export default Filters;
