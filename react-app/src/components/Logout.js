import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function Logout({ history }) {
  // session 방식
  // useEffect(() => {
  //   axios.get(`http://127.0.0.1:5000/logout`)
  //   .then(response => {
  //   console.log(response);
  //   setTmp(response.data);
  // });
  // },[])
  useEffect(()=>{
    localStorage.removeItem("token");
    alert('성공적으로 로그아웃 되었습니다.');
    history.push('/'); //홈으로  
  }, [])
  return(
    <>
    </>
  );
}
