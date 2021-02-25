import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component, useEffect } from 'react';
import { ButtonToolbar } from 'react-bootstrap';

//react-router
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { Mine } from './components/Mine';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Logout } from './components/Logout';

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
          <li>
            <Link to="/mine">내 포트폴리오 CRUD</Link>
          </li>
        </ul>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/signup" component={Signup}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/logout" component={Logout}></Route>
          <Route exact path="/mine" component={Mine}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

function Home() {
  return <div>Home component</div>;
}

export default App;


