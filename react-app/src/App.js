import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component, useEffect } from 'react';


import {LoginMenu, LogoutMenu } from './Menu';

function App() {
  const token = localStorage.getItem("token");
  if(token){ //로그인 되어 있을 때 메뉴
    return (
      <LoginMenu />
    );
  } else { //로그인 안 되어 있을 때 메뉴
    return (
      <LogoutMenu />
    );
  }
}

export default App;
