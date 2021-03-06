import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import * as config from './config';
import axios from 'axios';

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
export function Home() {
  const [user, setUser] = useState();
    console.log(config.API_HOST);
    useEffect(()=>{
        axios.get(config.API_HOST + '/protected', {
        headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    })
        .then(response=>{
            setUser(response.data.logged_in_as.name);
        });
    },[]);

  return (
    <div>
      <h1>
        {user}님!!!!! 오늘도 방문해주셨군요!
      </h1>
      <img src= "https://pbs.twimg.com/media/EYEZb15UYAQfWj9.jpg"/>    
    </div>
  );
}