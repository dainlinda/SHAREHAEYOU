import React, {useState,useEffect} from 'react';
import axios from 'axios';

export function Vip() {
    const [vip, setVip] = useState();
    useEffect(()=>{
        axios.get(`http://elice-kdt-ai-track-vm-racer-08.koreacentral.cloudapp.azure.com:5000/protected`, {
        headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    })
        .then(response=>{
            setVip(response.data.logged_in_as.name);
            
            console.log(response);
        });
    },[]);
  if(vip){
    return (
      <div>
        {vip}님의 접속을 환영합니다
      </div>
    );
  } else {
      return (
        <div>
          당신은 환영 받지 못했습니다....로그인 후 다시 오시길...
        </div>
      );
    }
}
