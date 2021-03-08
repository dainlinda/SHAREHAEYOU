import React, {useState,useEffect} from 'react';
import axios from 'axios';
import * as config from '../config';
import Confetti from 'react-confetti'

export function Vip() {
    const [vip, setVip] = useState();
    const [visit, setVisit] = useState();

    const token = localStorage.getItem("token");

    useEffect(()=>{
        axios.get(config.API_HOST + '/protected', {
        headers:{
            Authorization: "Bearer " + token
        }
    })
        .then(response=>{
            setVip(response.data.logged_in_as.name);
            setVisit(response.data.logged_in_as.visit);
        });
    },[]);
    
    
    return (
        <div style={{textAlign: "center"}}>
          <Confetti />
          <br />
          <h1>우리 웹사이트에 {visit}번이나 방문하시다니....!</h1>
          <h3>당신은 진정한 vip이십니다.</h3>
          <h6>이곳은 진정한 vip {vip}님을 위한 공간입니다!</h6>
          <img src="https://i.imgur.com/ImYhLCl.gif"/>
        </div>
    );
}

