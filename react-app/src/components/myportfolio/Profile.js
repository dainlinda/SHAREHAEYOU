import * as config from '../../config';
import React, { useEffect, useState } from 'react';

import { ListGroupItem, ListGroup, Card } from 'react-bootstrap';
import axios from 'axios';

export default function Profile(){
    const token = localStorage.getItem('token');
    const [userEmail, setUserEmail] = useState();
    const [userName, setUserName] = useState();
    const [userImg, setUserImg] = useState();
    const [userBio, setUserBio] = useState();

    useEffect(()=>{
        axios.get(config.API_HOST + '/profile', {
        headers:{
            Authorization: "Bearer " + token
        }
    })
        .then(response=>{
            setUserName(response.data.crnt_user.name);
            setUserEmail(response.data.crnt_user.email);
            setUserImg(response.data.result[0].image_path);
            setUserBio(response.data.result[0].bio);   
            // console.log(response.data.result);         
        });
    },[]);
    if(!userImg){
        setUserImg('http://asq.kr/Rl5W7DwTbCO5FV');
    }
    if(!userBio){
        setUserBio('Hi! This is Racer!');
    }
    return(
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={userImg} />
            <Card.Body>
                <Card.Title>{userName}</Card.Title>
                <Card.Text>
                {userEmail}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem>{userBio}</ListGroupItem>
            </ListGroup>
        </Card>
    );
}
