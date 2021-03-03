import * as config from '../../config';
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';

//-------------------------------------------------------------

export default function Education({ history }) {
  const [mode, setMode] = useState('READ');
  const token = localStorage.getItem("token");

  //전체 글 받아오는 용
  const [edu, setEdu] = useState([]);

  //delete, update에서 어떤 article 클릭됐는지 파악
  const [selectedId, setSelectedId] = useState();

  //update에서 특정 article id 받아오는 용
  const [index, setIndex] = useState();

  //학력 정보 받아오는 함수
  useEffect(() => {
    axios.get(config.API_HOST + `/education`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then(response => {
        console.log('education:', response);
        setEdu(response.data.result);
      });
  }, []);

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

  //받아온 학력정보 html 형태로 바꿔줌
  const education = edu.map((item, index) => <li key={index}>
    <h5>{item.college}</h5>
    <h6>{item.major}({degreeChange(item.degree)})</h6>
    <a
      href="/"
      onClick={function (e) {
        e.preventDefault();
        setMode('UPDATE'); //기능 유예
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

  //read, create, update 윗부분 컴포넌트화하기
  if (mode === 'READ') {
    return (
      <ListGroup>
        <ListGroup.Item>
          <h2>학력</h2>
          <ul>
            {education}
          </ul>
          <Button variant="primary"
            onClick={function (e) {
              e.preventDefault();
              setMode('CREATE');
            }}>
            +
            </Button>
        </ListGroup.Item>
      </ListGroup>
    );
  } else if (mode === 'CREATE') {
    return (
      <ListGroup>
        <ListGroup.Item>
          <h2>학력</h2>
          <ul>
            {education}
          </ul>
          <EducationForm onCreate={function (data) {
            axios.post(config.API_HOST + `/education`, data, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
              }
            })
              .then(response => {
                console.log(response);
                setEdu(response.data.result); //새로운 방법 적용중
              });
            // history.push('/mine'); 
          }}
            data={{ college: "", major: "" }} />
          <Button variant="primary"
            onClick={function (e) {
              e.preventDefault();
              setMode('CREATE');
            }}>
            +
        </Button>
        </ListGroup.Item>
      </ListGroup>
    );
  } else if (mode === 'DELETE') {
    console.log('delete:', selectedId);
    axios.delete(config.API_HOST + `/education`, {
      data: { id: selectedId },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    }).then(response => console.log(response));
    setMode('READ');
    window.location.reload();
  } else if (mode === 'UPDATE') {
    // console.log('update:', edu[index].college);
    return (

      <ListGroup>
        <ListGroup.Item>
          <h2>학력</h2>
          <ul>
            {education}
          </ul>
          <EducationForm onCreate={function (data) {
            data.id = selectedId;
            axios.put(config.API_HOST + `/education`, data, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
              }
            })
              .then(response => {
                console.log(response);
                setEdu(response.data.result); //새로운 방법 적용중
              });
            console.log(data);
            // history.push('/mine'); 
          }}
            data={edu[index]} />
          <Button variant="primary"
            onClick={function (e) {
              e.preventDefault();
              setMode('CREATE');
            }}>
            +
            </Button>
        </ListGroup.Item>
      </ListGroup>
    );
  }
}

//form 형식
function EducationForm(props) {
  //update 글씨 받아오는 용
  const [college, setCollege] = useState(props.data.college);
  const [major, setMajor] = useState(props.data.major);

  return (
    <Form
      action=""
      method="post"
      onSubmit={function (e) {
        e.preventDefault();
        props.onCreate({
          college: e.target.college.value,
          major: e.target.major.value,
          degree: e.target.formHorizontalRadios.value
        });
        e.target.reset();
      }}
    >
      <Form.Group as={Row} controlId="formHorizontalCollege">
        <Form.Label column sm={2}>
        </Form.Label>
        <Col sm={10}>
          <Form.Control name="college" placeholder="학교이름" value={college} onChange={(e) => {
            setCollege(e.target.value);
          }} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formHorizontalMajor">
        <Form.Label column sm={2}>
        </Form.Label>
        <Col sm={10}>
          <Form.Control name="major" placeholder="전공" value={major} onChange={(e) => {
            setMajor(e.target.value);
          }} />
        </Col>
      </Form.Group>
      <fieldset>
        <Form.Group as={Row}>
          <Form.Label as="legend" column sm={2}>
            학위
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="radio"
              label="재학중"
              name="formHorizontalRadios"
              id="formHorizontalRadios1"
              value="1" />
            <Form.Check
              type="radio"
              label="학사졸업"
              name="formHorizontalRadios"
              id="formHorizontalRadios2"
              value="2" />
            <Form.Check
              type="radio"
              label="석사졸업"
              name="formHorizontalRadios"
              id="formHorizontalRadios3"
              value="3" />
            <Form.Check
              type="radio"
              label="박사졸업"
              name="formHorizontalRadios"
              id="formHorizontalRadios4"
              value="4" />
          </Col>
        </Form.Group>
      </fieldset>

      <Form.Group as={Row}>
        <Button variant="primary" type="submit">
          저장
          </Button>
        <Button variant="light" onClick={() => window.location.reload()}>
          취소
          </Button>
      </Form.Group>
    </Form>
  );
}
