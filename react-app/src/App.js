import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import { ButtonToolbar, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

//react-router
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signup">회원 가입</Link>
          </li>
          <li>
            <Link to="/login">로그인</Link>
          </li>
          <li>
            <Link to="/logout">로그아웃</Link>
          </li>
        </ul>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/signup" component={Signup}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/logout" component={Logout}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

function Home() {
  return <div>Home component</div>;
}

function Login() {
  return <div>Login component</div>;
}

function Logout() {
  return <div>Logout component</div>;
}

function Signup() {
  return (
  <div>
      <h1>회원가입</h1>
      <SignupForm onCreate={function(data) {axios.post(`http://127.0.0.1:5000/signup`,data)}}/>
  </div>
  );
}

function SignupForm(props){
  return(
    <article>
      <form
        action=""
        method="post"
        onSubmit={function(e) {
          e.preventDefault();
          props.onCreate({
            fullname: e.target.formBasicName.value,
            email: e.target.formBasicEmail.value,
            password: e.target.formBasicPassword.value
          });
          e.target.reset();
        }}
      >
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="formBasicEmail" />
          <Form.Text className="text-muted">
            Check your email.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="formBasicPassword" />
        </Form.Group>
        <Form.Group controlId="formBasicPasswordConfirm">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Text className="text-muted">
        Check your password.
        </Form.Text>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Name" name="formBasicName" />
        </Form.Group> 

        <Button variant="primary" type="submit">
          회원가입
        </Button>
      </form>
    </article>
  );
}

export default App;


