import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import * as config from '../../config';

export default function Login({ history }) {    
  return (
    <div>
      <h1>로그인</h1>
      <LoginForm onLogin={function (data) {
        axios.post(config.API_HOST +`/login`, data)
          .then(response => {
            console.log(response);
            localStorage.setItem("token", (response.data.access_token));
            history.push('/'); //홈으로
            window.location.reload();
          });
          
      }} />
    </div>
  );
}
function LoginForm(props) {
  return (
    <article>
      <form
        action=""
        method="post"
        onSubmit={function (e) {
          e.preventDefault();
          props.onLogin({
            email: e.target.formBasicEmail.value,
            password: e.target.formBasicPassword.value
          });
          e.target.reset();
        }}
      >
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="formBasicEmail" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="formBasicPassword" />
        </Form.Group>

        <Button variant="primary" type="submit">
          로그인
        </Button>
      </form>
    </article>
  );
}
