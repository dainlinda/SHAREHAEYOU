import React, {useState,useEffect} from 'react';
import axios from 'axios';

export function Vip() {
    const [vip, setVip] = useState();
    const [msg, setMsg] = useState('');
    useEffect(()=>{
        axios.post(`http://127.0.0.1:5000/protected`, {
        headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    })
        .then(response=>{
            setVip(response.logged_in_as);
            console.log(response);
        });
    },[]);

    if(vip){
        setMsg(vip+'님의 접속을 환영합니다!');
    } else{
        setMsg('당신은 환영받지 못하셨습니다');
    }
  return (
    <div>
      <h1>{msg}</h1>
    </div>
  );
}
