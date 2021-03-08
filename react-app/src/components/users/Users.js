import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import * as config from '../../config';
import axios from 'axios';
import { Button, ListGroup, Card, CardColumns } from 'react-bootstrap';
export default function Users({history}){
    const token = localStorage.getItem('token');
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        axios.get(config.API_HOST + '/users', {
        headers:{
            Authorization: "Bearer " + token
        }
    })
        .then(response=>{
            setUsers(response.data.result);
        });
    },[]);

    //받아온 학력정보 html 형태로 바꿔줌
    //윗 부분 read 정보
    const user = users.map((item, index) => 
        <Card key={index} onClick={() => history.push(`/userdetail/${item.id}`)}>
            <Card.Img variant="top" 
            src={item.image_path? item.image_path : 'http://asq.kr/Rl5W7DwTbCO5FV'}/>
            <Card.Body>
            <Card.Title>{item.fullname}</Card.Title>
            <Card.Text>
                {item.bio? item.bio:'Hi! This is Racer!'}
            </Card.Text>
            </Card.Body>
        </Card>
    );

    return(
        <CardColumns>
            {user}
        </CardColumns>
    );
}