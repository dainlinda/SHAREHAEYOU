import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component, useEffect, useState } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
import Mine from './components/myportfolio/Mine';
import Logout from './components/user/Logout';
import { Vip } from './components/Vip';
// import HistorySample from './components/HistorySample';
import { Home } from './App';
import Login from './components/user/Login';
import Signup from './components/user/Signup';

import Users from './components/users/Users';
import Userdetail from './components/users/Userdetail';

import * as config from './config';
import axios from 'axios';

export function LoginMenu(){
    const [visit, setVisit] = useState();
    const token = localStorage.getItem("token");
    useEffect(()=>{
        axios.get(config.API_HOST + '/protected', {
        headers:{
            Authorization: "Bearer " + token
        }
    })
        .then(response=>{
            setVisit(response.data.logged_in_as.visit);
        });
    },[]);
    console.log('visit',visit);
    let vipZone = '';
    if(visit > 1){
        vipZone = <NavLink to="/vip" className="nav-link">Vip zone</NavLink>;
    }
    return(
        <BrowserRouter>
            <Navbar bg="dark" variant="dark">
                <NavLink to="/" className="navbar-brand">Share해YOU!</NavLink>
                <Nav className="mr-auto">
                <NavLink to="/" className="nav-link">Home</NavLink>
                <NavLink to="/logout" className="nav-link">Logout</NavLink>
                <NavLink to="/mine" className="nav-link">My portfolio</NavLink>
                <NavLink to="/users" className="nav-link">Users</NavLink>
                {vipZone}
                </Nav>
            </Navbar>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/logout" component={Logout}></Route>
                <Route exact path="/mine" component={Mine}></Route>
                <Route exact path="/users" component={Users}></Route>
                <Route path='/userdetail/:user_id' component={Userdetail}/>
                <Route exact path="/vip" component={Vip}></Route>
            </Switch>
        </BrowserRouter>
    );
}
            
export function LogoutMenu(){
    return(
        <BrowserRouter>
            <Navbar bg="dark" variant="dark">
                <NavLink to="/" className="navbar-brand">Share해YOU!</NavLink>
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

