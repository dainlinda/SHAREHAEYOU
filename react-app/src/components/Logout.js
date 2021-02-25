import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function Logout() {
  // session 방식
  // useEffect(() => {
  //   axios.get(`http://127.0.0.1:5000/logout`)
  //   .then(response => {
  //   console.log(response);
  //   setTmp(response.data);
  // });
  // },[])
  localStorage.removeItem("token")
  return (
    <div>
      로그아웃 성공여부 띄워주기
    </div>
  );
}
