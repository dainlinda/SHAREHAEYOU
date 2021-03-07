import * as config from '../../config';
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import DatePicker from 'react-datepicker';

function formDate(date) {
  var date = new Date(date);
  var year = date.getFullYear();
  var month = ("0" + (1 + date.getMonth())).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);

  return year + "-" + month + "-" + day;
}

export default function Certificates({ history }) {
  const [mode, setMode] = useState('READ');
  const token = localStorage.getItem('token');

  //전체 글 받아오는 용
  const [cert, setCert] = useState([]);

  //delete, update에서 어떤 article 클릭됐는지 파악
  const [selectedId, setSelectedId] = useState();

  //update에서 특정 article id 받아오는 용
  const [index, setIndex] = useState();

  //프로젝트 정보 받아오는 함수
  useEffect(() => {
    axios.get(config.API_HOST + `/certificates`, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(response => {
        console.log('certificates:', response);
        setCert(response.data.result);
      });
  }, []);

  //받아온 프로젝트 정보 html 형태로 바꿔줌
  //윗 부분 read 정보
  const certificates = cert.map((item, index) => <li key={index}>
    <h5>{item.certificate}</h5>
    <h6>{item.organization}</h6>
    <h6>취득일: {formDate(item.get_date)}</h6>
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
    form = <CertificatesForm onCreate={function (data) {
            axios.post(config.API_HOST + `/certificates`, data, {
              headers: {
                Authorization: "Bearer " + token
              }
            })
              .then(response => {
                setCert(response.data.result); 
                setMode('READ');
              });
            
          }}
            data={{ certificate: "", organization: "",get_date:new Date() }} 
            setMode={setMode} />

  } else if (mode === 'DELETE') {
    form = null;
    axios.delete(config.API_HOST + `/certificates`, {
      data: { id: selectedId },
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then(response => {
      setCert(response.data.result); 
      setMode('READ');
    });

  } else if (mode === 'UPDATE') {
    form = <CertificatesForm onCreate={function (data) {
            
            data.id = selectedId;
            axios.put(config.API_HOST + `/certificates`, data, {
              headers: {
                Authorization: "Bearer " + token
              }
            })
              .then(response => {
                setCert(response.data.result); 
                setMode('READ');
              });
          }}
            data={cert[index]} 
            setMode={setMode} />

    
  }
  return (
    <ListGroup.Item>
      <h2>자격증</h2>
      <ul>
        {certificates}
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

function CertificatesForm(props) {
  const [startDate, setStartDate] = useState(new Date(props.data.get_date));

  //update 글씨 받아오는 용
  const [certificate, setCertificate] = useState(props.data.certificate);
  const [organization, setOrganization] = useState(props.data.organization);

  return (
    <Form
      action=""
      method="post"
      onSubmit={function (e) {
        e.preventDefault();
        props.onCreate({
          certificate: e.target.certificate.value,
          organization: e.target.organization.value,
          get_date: formDate(startDate)
        });
        e.target.reset();
      }}
    >
    
      <Form.Group as={Row} controlId="formHorizontalCertificate">
        <Form.Label column sm={2}>
        </Form.Label>
        <Col sm={10}>
          <Form.Control name="certificate" placeholder="자격증이름" value={certificate} onChange={(e) => {
            setCertificate(e.target.value);
          }} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formHorizontalOrganization">
        <Form.Label column sm={2}>
        </Form.Label>
        <Col sm={10}>
          <Form.Control name="organization" placeholder="발급기관" value={organization} onChange={(e) => {
            setOrganization(e.target.value);
          }} />
        </Col>
      </Form.Group>

      <h6>취득일</h6>
      <DatePicker selected={startDate} onChange={date => setStartDate(date)} />

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

