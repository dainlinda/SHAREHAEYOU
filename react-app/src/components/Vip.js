import React, {useState,useEffect} from 'react';
import axios from 'axios';

export function Vip() {
    const [vip, setVip] = useState();
    useEffect(()=>{
        axios.get(`http://127.0.0.1:5000/protected`, {
        headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    })
        .then(response=>{
            setVip(response.data.logged_in_as);
            
            console.log(response);
        });
    },[]);

  return (
    <div>
      {vip}님의 접속을 환영합니다
    </div>
  );
}
