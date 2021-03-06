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

export default function Projects({ history }) {
  const [mode, setMode] = useState('READ');
  const token = localStorage.getItem('token');

  //전체 글 받아오는 용
  const [pro, setPro] = useState([]);

  //delete, update에서 어떤 article 클릭됐는지 파악
  const [selectedId, setSelectedId] = useState();

  //update에서 특정 article id 받아오는 용
  const [index, setIndex] = useState();

  //프로젝트 정보 받아오는 함수
  useEffect(() => {
    axios.get(config.API_HOST + `/projects`, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(response => {
        console.log('projects:', response);
        setPro(response.data.result);
      });
  }, []);

  //받아온 프로젝트 정보 html 형태로 바꿔줌
  //윗 부분 read 정보
  const projects = pro.map((item, index) => <li key={index}>
    <h5>{item.project}</h5>
    <h6>{item.detail}</h6>
    <h6>{formDate(item.start_date)} ~ {formDate(item.end_date)}</h6>
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
    form = <ProjectsForm onCreate={function (data) {
            axios.post(config.API_HOST + `/projects`, data, {
              headers: {
                Authorization: "Bearer " + token
              }
            })
              .then(response => {
                setPro(response.data.result); 
                setMode('READ');
              });
            
          }}
            data={{ project: "", detail: "",start_date:new Date(),end_date:new Date() }} 
            setMode={setMode} />

  } else if (mode === 'DELETE') {
    form = null;
    axios.delete(config.API_HOST + `/projects`, {
      data: { id: selectedId },
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then(response => {
      setPro(response.data.result); 
      setMode('READ');
    });

  } else if (mode === 'UPDATE') {
    form = <ProjectsForm onCreate={function (data) {
            
            data.id = selectedId;
            console.log('project data!!!!!!!!!!!!!!!!!!!!!!',data);
            axios.put(config.API_HOST + `/projects`, data, {
              headers: {
                Authorization: "Bearer " + token
              }
            })
              .then(response => {
                setPro(response.data.result); 
                setMode('READ');
              });
          }}
            data={pro[index]} 
            setMode={setMode} />

    
  }
  return (
    <ListGroup.Item>
      <h2>프로젝트</h2>
      <ul>
        {projects}
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

function ProjectsForm(props) {
  const [startDate, setStartDate] = useState(new Date(props.data.start_date));
  const [endDate, setEndDate] = useState(new Date(props.data.end_date));
  
  //update 글씨 받아오는 용
  const [project, setProject] = useState(props.data.project);
  const [detail, setDetail] = useState(props.data.detail);
  useEffect(()=>{
    console.log('startDate',startDate);
  },[startDate]);
  return (
    <Form
      action=""
      method="post"
      onSubmit={function (e) {
        e.preventDefault();
        props.onCreate({
          project: e.target.project.value,
          detail: e.target.projectDetail.value,
          startDate: formDate(startDate),
          endDate: formDate(endDate)
        });
        console.log('startDate222222222222222',startDate);
        e.target.reset();
      }}
    >

      <Form.Group as={Row} controlId="formHorizontalProject">
        <Form.Label column sm={2}>
        </Form.Label>
        <Col sm={10}>
          <Form.Control name="project" placeholder="프로젝트" value={project} onChange={(e) => {
            setProject(e.target.value);
          }} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formHorizontalProjectDetail">
        <Form.Label column sm={2}>
        </Form.Label>
        <Col sm={10}>
          <Form.Control name="projectDetail" placeholder="프로젝트상세" value={detail} onChange={(e) => {
            setDetail(e.target.value);
          }} />
        </Col>
      </Form.Group>

      <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
      <DatePicker
        selected={endDate}
        onChange={date => setEndDate(date)}
        minDate={startDate} />

      <Form.Group as={Row}>
        <Col sm={{ span: 10, offset: 2 }}>
          <Button variant="primary" type="submit">
            저장
          </Button>
          <Button variant="light" onClick={()=>{props.setMode('READ')}}>
          취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

