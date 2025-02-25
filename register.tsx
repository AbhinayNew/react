import { Component } from "react";
import React from "react";
import { Form, Button } from 'react-bootstrap';
import './register.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { redirect, useNavigate } from "react-router-dom";
import MyComponent from "../Fetch/fetchData";

type Props = {};

type State = {
  username: string,
  email: string,
  password: string,
  phoneNumber: string,
  successful: boolean,
  message: string,
  errorMessage: string,
  redirect: string
}

export default class Register extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      phoneNumber: "",
      successful: false,
      message: "",
      errorMessage:"",
      redirect: "" 
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({ [name]: value } as unknown as Pick<State, keyof State>);
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { username, email, password, phoneNumber } = this.state;
    this.setState({ errorMessage: "" });
    // Here you would typically send a request to your server
    console.log("Form submitted:", { username, email, password, phoneNumber });

    if (!username || !email || !password || !phoneNumber) {
      this.setState({ errorMessage: "All fields are required." });
      return;
    }

    const userId = `1`;

    // Store user data in session storage based on user ID
    const userData = { username, email, password, phoneNumber };
    sessionStorage.setItem(userId, JSON.stringify(userData));

    // Example of setting a success message
    this.setState({ successful: true, message: "Registration successful!" });

  };

  render() {
    const { username, email, password, phoneNumber, successful, message,errorMessage } = this.state;

    return (
      <div className="container">
        <div className="image-section">
            {/* <img src="your-image.jpg" alt="Registration Image"> */}
        </div>
        <div className="form-section">
        <h2 className="login-title">Register</h2>
        <Form onSubmit={this.handleSubmit} className='login-form'>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>UserName</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter UserName"
              name="username"
              value={username}
            
              onChange={this.handleChange}
       
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Phone Number"
              name="phoneNumber"
              value={phoneNumber}
              onChange={this.handleChange}
            />
          </Form.Group>
      <div>
      <Button variant="primary" type="submit" className="login-button">Sign Up</Button>
      </div>

        </Form>
        {errorMessage && <div className="error-message text-danger">{errorMessage}</div>}
        {successful && <div className="success-message">{message}</div>}
        </div>
        
      </div>
    );
  }
}