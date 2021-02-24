import React, { useState } from 'react';
import axios from 'axios';

export function Logout() {
  const [tmp, setTmp] = useState([]);
  axios.get(`http://127.0.0.1:5000/logout`)
    .then(response => {
      console.log(response);
      setTmp(response.data);
    });
  return (
    <div>
      로그아웃 성공여부 띄워주기
      {tmp.status}
    </div>
  );
}
