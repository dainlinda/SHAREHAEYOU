import { ListGroupItem, ListGroup, Card, CardColumns} from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as config from '../../config';
import axios from 'axios';

//학위 숫자->글자 변환해주는 함수
function degreeChange(degree) {
    if (Number(degree) === 1) {
        return "재학중";
    } else if (Number(degree) === 2) {
        return "학사졸업";
    } else if (Number(degree) === 3) {
        return "석사졸업";
    } else if (Number(degree) === 4) {
        return "박사졸업";
    }
}

function formDate(date) {
    var date = new Date(date);
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
  
    return year + "-" + month + "-" + day;
  }

export default function Userdetail(){
    // 파라미터 가져오기
    const { user_id } = useParams();
    const token = localStorage.getItem('token');
    //전체 글 받아오는 용
    const [profile, setProfile] = useState([]);
    const [edu, setEdu] = useState([]);
    const [award, setAward] = useState([]);
    const [project, setProject] = useState([]);
    const [cert, setCert] = useState([]);
    
    useEffect(() => {
        axios.get(config.API_HOST + `/usersdetail/` + user_id, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
          .then(response => {
            setProfile(response.data.result_profile[0]);
            setEdu(response.data.result_edu);
            setAward(response.data.result_award);
            setProject(response.data.result_project);
            setCert(response.data.result_cert);
            console.log('testssssssprofilesssss',profile);
            // console.log(edu);
            // console.log(award);
            // console.log(project);
            // console.log(cert);
          });
      }, []);
    
      //받아온 정보 html 형태로 바꿔줌
      //윗 부분 read 정보
      const education = edu.map((item, index) => <li key={index}>
      <h5>{item.college}</h5>
      <h6>{item.major}({degreeChange(item.degree)})</h6>
    </li>
    );
    const awards = award.map((item, index) => <li key={index}>
    <h5>{item.award}</h5>
    <h6>{item.detail}</h6>
  </li>
  );
  const projects = project.map((item, index) => <li key={index}>
    <h5>{item.project}</h5>
    <h6>{item.detail}</h6>
    <h6>{formDate(item.start_date)} ~ {formDate(item.end_date)}</h6>
  </li>
  );

  const certificates = cert.map((item, index) => <li key={index}>
    <h5>{item.certificate}</h5>
    <h6>{item.organization}</h6>
    <h6>취득일: {formDate(item.get_date)}</h6>
  </li>
  );

    return (
    <>
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={profile.image_path?profile.image_path:'http://asq.kr/Rl5W7DwTbCO5FV'} />
            <Card.Body>
                <Card.Title>{profile.fullname}</Card.Title>
                <Card.Text>
                {profile.email}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem>{profile.bio?profile.bio:'Hi! This is Racer!'}</ListGroupItem>
            </ListGroup>
        </Card>
        <ListGroup>
            <ListGroup.Item>
                <h2>학력</h2>
                <ul>
                {education}
                </ul>
            </ListGroup.Item>
            <ListGroup.Item>
                <h2>수상이력</h2>
                <ul>
                {awards}
                </ul>
            </ListGroup.Item>
            <ListGroup.Item>
                <h2>프로젝트</h2>
                <ul>
                {projects}
                </ul>
            </ListGroup.Item>
            <ListGroup.Item>
                <h2>자격증</h2>
                <ul>
                {certificates}
                </ul>
            </ListGroup.Item>
        </ListGroup>
    </>
    );

}




