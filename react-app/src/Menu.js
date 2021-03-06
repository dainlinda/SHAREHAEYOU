import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component, useEffect } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
import Mine from './components/myportfolio/Mine';
import Logout from './components/user/Logout';
// import { Vip } from './components/Vip';
// import HistorySample from './components/HistorySample';
import { Home } from './App';
import Login from './components/user/Login';
import Signup from './components/user/Signup';

import Users from './components/users/Users';
import Userdetail from './components/users/Userdetail';

export function LoginMenu(){
    return(
        <BrowserRouter>
            <Navbar bg="dark" variant="dark">
                <NavLink to="/" className="navbar-brand">Racer Portfolio</NavLink>
                <Nav className="mr-auto">
                <NavLink to="/" className="nav-link">Home</NavLink>
                <NavLink to="/logout" className="nav-link">Logout</NavLink>
                <NavLink to="/mine" className="nav-link">My portfolio</NavLink>
                <NavLink to="/users" className="nav-link">Users</NavLink>
                    {/* <Link to="/vip">vip 접근가능구역</Link>
                    <Link to="/history">예제</Link> */}
                </Nav>
            </Navbar>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/logout" component={Logout}></Route>
                <Route exact path="/mine" component={Mine}></Route>
                <Route exact path="/users" component={Users}></Route>
                <Route path='/userdetail/:user_id' component={Userdetail}/>
                {/* <Route exact path="/vip" component={Vip}></Route>
                <Route path="/history" component={HistorySample} /> */}
            </Switch>
        </BrowserRouter>
    );
}
            
export function LogoutMenu(){
    return(
        <BrowserRouter>
            <Navbar bg="dark" variant="dark">
                <NavLink to="/" className="navbar-brand">Racer Portfolio</NavLink>
                <Nav className="mr-auto">
                <NavLink to="/" className="nav-link">Home</NavLink>
                <NavLink to="/signup" className="nav-link">Sign up</NavLink>
                <NavLink to="/login" className="nav-link">Log in</NavLink>
                </Nav>
            </Navbar>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/signup" component={Signup}></Route>
                <Route exact path="/login" component={Login}></Route>
            </Switch>
        </BrowserRouter>
    );
}

