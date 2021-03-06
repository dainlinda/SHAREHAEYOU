import * as config from '../../config';
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';

export default function Awards({ history }) {
  const [mode, setMode] = useState('READ');
  const token = localStorage.getItem('token');

  //전체 글 받아오는 용
  const [awar, setAwar] = useState([]);

  //delete, update에서 어떤 article 클릭됐는지 파악
  const [selectedId, setSelectedId] = useState();

  //update에서 특정 article id 받아오는 용
  const [index, setIndex] = useState();

  //수상 정보 받아오는 함수
  useEffect(() => {
    axios.get(config.API_HOST + `/awards`, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(response => {
        console.log('awards:', response);
        setAwar(response.data.result);
      });
  }, []);

  //받아온 수상정보 html 형태로 바꿔줌
  //윗 부분 read 정보
  const awards = awar.map((item, index) => <li key={index}>
    <h5>{item.award}</h5>
    <h6>{item.detail}</h6>
    <a
      href="/"
      onClick={function (e) {
        e.preventDefault();
        setMode('UPDATE');
        setSelectedId(Number(item.id));
        setIndex(Number(index));
      }}>Edit</a>/
    <a
      href="/"
      onClick={function (e) {
        e.preventDefault();
        setMode('DELETE');
        setSelectedId(Number(item.id));
      }}>Delete</a>
  </li>
  );

  //아랫 부분 form 파트
  let form = null;

  if (mode === 'READ') {
    form = null;
  } else if (mode === 'CREATE') {
    form = <AwardsForm onCreate={function (data) {
            axios.post(config.API_HOST + `/awards`, data, {
              headers: {
                Authorization: "Bearer " + token
              }
            })
              .then(response => {
                setAwar(response.data.result); 
                console.log()
                setMode('READ');
              });
            
          }}
            data={{ award: "", detail: "" }} 
            setMode={setMode} />

  } else if (mode === 'DELETE') {
    form = null;
    axios.delete(config.API_HOST + `/awards`, {
      data: { id: selectedId },
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then(response => {
      setAwar(response.data.result); 
      setMode('READ');
    });

  } else if (mode === 'UPDATE') {
    form = <AwardsForm onCreate={function (data) {
            data.id = selectedId;
            axios.put(config.API_HOST + `/awards`, data, {
              headers: {
                Authorization: "Bearer " + token
              }
            })
              .then(response => {
                setAwar(response.data.result); 
                setMode('READ');
              });
          }}
            data={awar[index]} 
            setMode={setMode} />

    
  }
  return (
    <ListGroup.Item>
      <h2>수상이력</h2>
      <ul>
        {awards}
      </ul>
        {form}
      <Button variant="primary"
        onClick={function (e) {
          e.preventDefault();
          setMode('CREATE');
        }}>
        +
    </Button>
  </ListGroup.Item>
  );
}

function AwardsForm(props) {
  //update 글씨 받아오는 용
  const [award, setAward] = useState(props.data.award);
  const [awardDetail, setAwardDetail] = useState(props.data.detail);

  return (
    <Form
      action=""
      method="post"
      onSubmit={function (e) {
        e.preventDefault();
        props.onCreate({
          award: e.target.award.value,
          detail: e.target.awardDetail.value
        });
        e.target.reset();
      }}
    >

      <Form.Group as={Row} controlId="formHorizontalAward">
        <Form.Label column sm={2}>
        </Form.Label>
        <Col sm={10}>
          <Form.Control name="award" placeholder="수상내역" value={award} onChange={(e) => {
            setAward(e.target.value);
          }} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formHorizontalAwardDetail">
        <Form.Label column sm={2}>
        </Form.Label>
        <Col sm={10}>
          <Form.Control name="awardDetail" placeholder="상세내역" value={awardDetail} onChange={(e) => {
            setAwardDetail(e.target.value);
          }} />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
          <Button variant="primary" type="submit">
            저장
          </Button>
          <Button variant="light" onClick={()=>{props.setMode('READ')}}>
          취소
          </Button>
      </Form.Group>
    </Form>
  );
}

