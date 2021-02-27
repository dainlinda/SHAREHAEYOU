import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function Logout({ history }) {
  useEffect(()=>{
    localStorage.removeItem("token");
    alert('성공적으로 로그아웃 되었습니다.');
    history.push('/'); //홈으로  
  }, [])
  window.location.reload();
  return(
    <>
    </>
  );
}
