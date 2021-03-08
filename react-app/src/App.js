import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import * as config from './config';
import axios from 'axios';
import loginplz from './components/user/loginplz.gif';
import './App.css'
import { Media } from 'react-bootstrap';


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
  const token = localStorage.getItem("token");
    console.log(config.API_HOST);
    useEffect(()=>{
        axios.get(config.API_HOST + '/protected', {
        headers:{
            Authorization: "Bearer " + token
        }
    })
        .then(response=>{
            setUser(response.data.logged_in_as.name);
        });
    },[]);
  if(token){
    return (
      <div style={{textAlign: "center"}}>
        <br/>
        <h1>
          {user}님!!!!! 오늘도 방문해주셨군요!
        </h1>
        <img src= "https://pbs.twimg.com/media/EYEZb15UYAQfWj9.jpg" height={450} className="mr-3"/>    
      </div>
    );  
  } else {
    return (
      <div style={{textAlign: "center"}}>
        <br/>
        <h1>
          로그인하고 다시 돌아와라 애송이!!
        </h1>
        <img src={loginplz} />

        {/* <img src="https://upload3.inven.co.kr/upload/2020/12/31/bbs/i014750817864.gif" width='250'/>    */}
      </div>
    );  
  }
}