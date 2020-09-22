import React from "react";
import axios from "axios";
import "../styles/login.css";
import "../styles/universal.css";
import Sidebar from "./Sidebar.jsx";
import {
  Button,
  FormControl,
  Form,
  FormGroup,
  FormLabel,
  FormText,
  Col,
} from "react-bootstrap";

class Signup extends React.Component {
  state = {
    user: {
      file: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      residenceCountry: "",
      avatar: "",
    },
    emptyField: {
      firstName: false,
      lastName: false,
      email: false,
      password: false,
      residenceCountry: false,
    },
    alert: false,
  };

  //change value of state for signup
  changeField = (e, field) => {
    let user = this.state.user;
    user[field] = e.target.value;
    this.setState({ user });
    this.emptyField();
    console.log({ user });
  };

  addFile = (e) => {
    let user = this.state.user;
    user.file = e.target.files[0];
    console.log("e.target.files[0]", e.target.files[0]);
    this.setState({ user }, () => {});
  };

  //alert for empty fields in signup form
  emptyField = (field, f) => {
    let user = this.state.user;
    let emptyField = this.state.emptyField;
    for (field in user) {
      if (`${user[field]}` == "") {
        for (f in emptyField) {
          if (f == field && emptyField[f] == false) {
            emptyField[f] = !emptyField[f];
            this.setState(emptyField);
          } else {
            console.log("user[field] in loop has input");
          }
        }
      } else {
        for (f in emptyField) {
          if (f == "email" && this.state.alert == true) {
            emptyField[f] = !emptyField[f];
            this.setState({ emptyField });
            this.state.alert = !this.state.alert;
            this.setState({ alert });
          } else if (f == field && emptyField[f] == true) {
            emptyField[f] = !emptyField[f];
            this.setState({ emptyField });
          } else {
            console.log("no alert for field");
          }
        }
      }
    }
  };

  //signup button
  signup = (e) => {
    e.preventDefault();
    if (
      this.state.user.firstName !== "" &&
      this.state.user.lastName !== "" &&
      this.state.user.email !== "" &&
      this.state.user.password !== "" &&
      this.state.user.residenceCountry !== "" &&
      this.state.user.avatar !== ""
    ) {
      let data = new FormData();
      console.log("i am at this point");
      for (let key in this.state.user) {
        console.log("KEY", this.state.user[key]);
        data.append(key, this.state.user[key]);
        console.log("i am here", data);
      }
      console.log({ data });
      axios
        .post(`${process.env.REACT_APP_API}/signup`, data)
        .then((res) => {
          console.log(res);
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
            if (sessionStorage != undefined) {
              let path = sessionStorage.getItem("path");
              this.props.history.push(`${path}`);
              sessionStorage.removeItem("path");
            } else {
              this.props.history.push("/spots");
            }
          } else {
            console.log("else statement triggered");
            this.state.alert = !this.state.alert;
            this.setState({ alert: this.state.alert });
          }
        })
        .catch((err) => {
          console.log({ err });
        });
    } else if (
      this.state.user.firstName !== "" &&
      this.state.user.lastName !== "" &&
      this.state.user.email !== "" &&
      this.state.user.password !== "" &&
      this.state.user.residenceCountry !== ""
    ) {
      console.log("thats it");
      axios
        .post(`${process.env.REACT_APP_API}/signup`, this.state.user)
        .then((res) => {
          console.log("here i am");
          console.log(res);
          if (res.data.token) {
            console.log("at this point");
            localStorage.setItem("token", res.data.token);
            if (sessionStorage != undefined) {
              let path = sessionStorage.getItem("path");
              this.props.history.push(`${path}`);
              sessionStorage.removeItem("path");
            } else {
              this.props.history.push("/spots");
            }
          } else {
            console.log("else statement triggered");
            this.state.alert = !this.state.alert;
            this.setState({ alert: this.state.alert });
          }
        })
        .catch((err) => {
          console.log({ err });
        });
    } else {
      this.emptyField();
    }
  };

  render() {
    return (
      <>
        <div className="signup-grid">
          <div className="signup-image"></div>
          <div>
            <h1
              style={{
                fontFamily: "Pacifico",
                color: "black",
                fontSize: "70px",
                letterSpacing: "3px",
                margin: "50px",
              }}
            >
              {" happy earth"}
            </h1>

            <Form style={{ margin: "50px" }}>
              <Form.Row>
                <Form.Group as={Col} controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={this.state.user.email}
                    onChange={(e) => this.changeField(e, "email")}
                  />
                  {this.state.emptyField.email ? (
                    <p className="logininfontalert">
                      Please type in your email
                    </p>
                  ) : null}
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Please create a password"
                    value={this.state.user.password}
                    onChange={(e) => this.changeField(e, "password")}
                  />
                  {this.state.emptyField.password ? (
                    <p className="logininfontalert">
                      Please type in your password.
                    </p>
                  ) : null}
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter first name"
                    value={this.state.user.firstName}
                    onChange={(e) => this.changeField(e, "firstName")}
                  />
                  {this.state.emptyField.firstName ? (
                    <p className="logininfontalert">
                      Please type in your first name.
                    </p>
                  ) : null}
                </Form.Group>
                <Form.Group as={Col} controlId="formGridSurname">
                  <Form.Label>Surname</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter last name"
                    value={this.state.user.lastName}
                    onChange={(e) => this.changeField(e, "lastName")}
                  />
                  {this.state.emptyField.lastName ? (
                    <p className="logininfontalert">
                      Please type in your last name.
                    </p>
                  ) : null}{" "}
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Country of Residence</Form.Label>
                  <Form.Control
                    as="select"
                    value={this.state.user.residenceCountry}
                    onChange={(e) => this.changeField(e, "residenceCountry")}
                  >
                    <option value="Afghanistan">Afghanistan</option>
                    <option value="Albania">Albania</option>
                    <option value="Algeria">Algeria</option>
                    <option value="American Samoa">American Samoa</option>
                    <option value="Andorra">Andorra</option>
                    <option value="Angola">Angola</option>
                    <option value="Anguilla">Anguilla</option>
                    <option value="Antarctica">Antarctica</option>
                    <option value="Antigua and Barbuda">
                      Antigua and Barbuda
                    </option>
                    <option value="Argentina">Argentina</option>
                    <option value="Armenia">Armenia</option>
                    <option value="Aruba">Aruba</option>
                    <option value="Australia">Australia</option>
                    <option value="Austria">Austria</option>
                    <option value="Bahamas">Bahamas</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Barbados">Barbados</option>
                    <option value="Belarus">Belarus</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Belize">Belize</option>
                    <option value="Benin">Benin</option>
                    <option value="Bermuda">Bermuda</option>
                    <option value="Bhutan">Bhutan</option>
                    <option value="Bolivia">Bolivia</option>
                    <option value="Bosnia and Herzegovina">
                      Bosnia and Herzegovina
                    </option>
                    <option value="Botswana">Botswana</option>
                    <option value="Bouvet Island">Bouvet Island</option>
                    <option value="Brazil">Brazil</option>
                    <option value="British Indian Ocean Territory">
                      British Indian Ocean Territory
                    </option>
                    <option value="Brunei Darussalam">Brunei Darussalam</option>
                    <option value="Bulgaria">Bulgaria</option>
                    <option value="Burkina Faso">Burkina Faso</option>
                    <option value="Burundi">Burundi</option>
                    <option value="Cambodia">Cambodia</option>
                    <option value="Cameroon">Cameroon</option>
                    <option value="Canada">Canada</option>
                    <option value="Cape Verde">Cape Verde</option>
                    <option value="Cayman Islands">Cayman Islands</option>
                    <option value="Central African Republic">
                      Central African Republic
                    </option>
                    <option value="Chad">Chad</option>
                    <option value="Chile">Chile</option>
                    <option value="China">China</option>
                    <option value="Christmas Island">Christmas Island</option>
                    <option value="Cocos (Keeling) Islands">
                      Cocos (Keeling) Islands
                    </option>
                    <option value="Colombia">Colombia</option>
                    <option value="Comoros">Comoros</option>
                    <option value="Congo">Congo</option>
                    <option value="Congo, The Democratic Republic of The">
                      Congo, The Democratic Republic of The
                    </option>
                    <option value="Cook Islands">Cook Islands</option>
                    <option value="Costa Rica">Costa Rica</option>
                    <option value="Cote D'ivoire">Cote D'ivoire</option>
                    <option value="Croatia">Croatia</option>
                    <option value="Cuba">Cuba</option>
                    <option value="Cyprus">Cyprus</option>
                    <option value="Czech Republic">Czech Republic</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Djibouti">Djibouti</option>
                    <option value="Dominica">Dominica</option>
                    <option value="Dominican Republic">
                      Dominican Republic
                    </option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Egypt">Egypt</option>
                    <option value="El Salvador">El Salvador</option>
                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                    <option value="Eritrea">Eritrea</option>
                    <option value="Estonia">Estonia</option>
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Falkland Islands (Malvinas)">
                      Falkland Islands (Malvinas)
                    </option>
                    <option value="Faroe Islands">Faroe Islands</option>
                    <option value="Fiji">Fiji</option>
                    <option value="Finland">Finland</option>
                    <option value="France">France</option>
                    <option value="French Guiana">French Guiana</option>
                    <option value="French Polynesia">French Polynesia</option>
                    <option value="French Southern Territories">
                      French Southern Territories
                    </option>
                    <option value="Gabon">Gabon</option>
                    <option value="Gambia">Gambia</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Germany">Germany</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Gibraltar">Gibraltar</option>
                    <option value="Greece">Greece</option>
                    <option value="Greenland">Greenland</option>
                    <option value="Grenada">Grenada</option>
                    <option value="Guadeloupe">Guadeloupe</option>
                    <option value="Guam">Guam</option>
                    <option value="Guatemala">Guatemala</option>
                    <option value="Guernsey">Guernsey</option>
                    <option value="Guinea">Guinea</option>
                    <option value="Guinea-bissau">Guinea-bissau</option>
                    <option value="Guyana">Guyana</option>
                    <option value="Haiti">Haiti</option>
                    <option value="Heard Island and Mcdonald Islands">
                      Heard Island and Mcdonald Islands
                    </option>
                    <option value="Holy See (Vatican City State)">
                      Holy See (Vatican City State)
                    </option>
                    <option value="Honduras">Honduras</option>
                    <option value="Hong Kong">Hong Kong</option>
                    <option value="Hungary">Hungary</option>
                    <option value="Iceland">Iceland</option>
                    <option value="India">India</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Iran, Islamic Republic of">
                      Iran, Islamic Republic of
                    </option>
                    <option value="Iraq">Iraq</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Isle of Man">Isle of Man</option>
                    <option value="Israel">Israel</option>
                    <option value="Italy">Italy</option>
                    <option value="Jamaica">Jamaica</option>
                    <option value="Japan">Japan</option>
                    <option value="Jersey">Jersey</option>
                    <option value="Jordan">Jordan</option>
                    <option value="Kazakhstan">Kazakhstan</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Kiribati">Kiribati</option>
                    <option value="Korea, Democratic People's Republic of">
                      Korea, Democratic People's Republic of
                    </option>
                    <option value="Korea, Republic of">
                      Korea, Republic of
                    </option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Lao People's Democratic Republic">
                      Lao People's Democratic Republic
                    </option>
                    <option value="Latvia">Latvia</option>
                    <option value="Lebanon">Lebanon</option>
                    <option value="Lesotho">Lesotho</option>
                    <option value="Liberia">Liberia</option>
                    <option value="Libyan Arab Jamahiriya">
                      Libyan Arab Jamahiriya
                    </option>
                    <option value="Liechtenstein">Liechtenstein</option>
                    <option value="Lithuania">Lithuania</option>
                    <option value="Luxembourg">Luxembourg</option>
                    <option value="Macao">Macao</option>
                    <option value="Macedonia, The Former Yugoslav Republic of">
                      Macedonia, The Former Yugoslav Republic of
                    </option>
                    <option value="Madagascar">Madagascar</option>

                    <option value="Malaysia">Malaysia</option>
                    <option value="Maldives">Maldives</option>

                    <option value="Mexico">Mexico</option>

                    <option value="Mongolia">Mongolia</option>

                    <option value="Morocco">Morocco</option>
                    <option value="Mozambique">Mozambique</option>

                    <option value="Nepal">Nepal</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Netherlands Antilles">
                      Netherlands Antilles
                    </option>
                    <option value="New Caledonia">New Caledonia</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Nicaragua">Nicaragua</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Norway">Norway</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Palestinian Territory, Occupied">
                      Palestinian Territory, Occupied
                    </option>
                    <option value="Panama">Panama</option>
                    <option value="Papua New Guinea">Papua New Guinea</option>
                    <option value="Paraguay">Paraguay</option>
                    <option value="Peru">Peru</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Poland">Poland</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Puerto Rico">Puerto Rico</option>
                    <option value="Romania">Romania</option>
                    <option value="Russian Federation">
                      Russian Federation
                    </option>
                    <option value="Saint Helena">Saint Helena</option>
                    <option value="Saint Kitts and Nevis">
                      Saint Kitts and Nevis
                    </option>
                    <option value="Saint Lucia">Saint Lucia</option>
                    <option value="Saint Pierre and Miquelon">
                      Saint Pierre and Miquelon
                    </option>
                    <option value="Saint Vincent and The Grenadines">
                      Saint Vincent and The Grenadines
                    </option>
                    <option value="Samoa">Samoa</option>
                    <option value="San Marino">San Marino</option>
                    <option value="Sao Tome and Principe">
                      Sao Tome and Principe
                    </option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Senegal">Senegal</option>
                    <option value="Serbia">Serbia</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Slovakia">Slovakia</option>
                    <option value="Solomon Islands">Solomon Islands</option>
                    <option value="Somalia">Somalia</option>
                    <option value="South Africa">South Africa</option>
                    <option value="South Georgia and The South Sandwich Islands">
                      South Georgia and The South Sandwich Islands
                    </option>
                    <option value="Spain">Spain</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="Sudan">Sudan</option>
                    <option value="Suriname">Suriname</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Syrian Arab Republic">
                      Syrian Arab Republic
                    </option>
                    <option value="Taiwan, Province of China">
                      Taiwan, Province of China
                    </option>
                    <option value="Thailand">Thailand</option>
                    <option value="Trinidad and Tobago">
                      Trinidad and Tobago
                    </option>
                    <option value="Turkey">Turkey</option>
                    <option value="Turks and Caicos Islands">
                      Turks and Caicos Islands
                    </option>
                    <option value="Ukraine">Ukraine</option>
                    <option value="United Arab Emirates">
                      United Arab Emirates
                    </option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option selected>United States</option>
                    <option value="United States Minor Outlying Islands">
                      United States Minor Outlying Islands
                    </option>
                    <option value="Uruguay">Uruguay</option>
                    <option value="Uzbekistan">Uzbekistan</option>
                    <option value="Vanuatu">Vanuatu</option>
                    <option value="Venezuela">Venezuela</option>
                    <option value="Vietnam">Vietnam</option>
                    <option value="Virgin Islands, British">
                      Virgin Islands, British
                    </option>
                    <option value="Virgin Islands, U.S.">
                      Virgin Islands, U.S.
                    </option>
                    <option value="Yemen">Yemen</option>
                    <option value="Zambia">Zambia</option>
                    <option value="Zimbabwe">Zimbabwe</option>
                    <option value="Other">Other</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control type="date" value="1940-08-19" />
                </Form.Group>
              </Form.Row>
              {this.state.alert ? (
                <p className="logininfontalert">Email already exists!</p>
              ) : null}

              <Button
                style={{ margin: "2vh 0 2vh 0" }}
                variant="dark"
                type="submit"
                onClick={this.signup}
              >
                Signup
              </Button>
            </Form>
          </div>
        </div>
      </>
    );
  }
}

export default Signup;
