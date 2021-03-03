import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { formDate } from './Awards';

function ProjectsForm(props) {
  const [startDate, setStartDate] = useState(new Date("2021/02/24"));
  const [endDate, setEndDate] = useState(new Date("2021/02/24"));
  console.log(formDate(startDate));
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
        e.target.reset();
      }}
    >
      <h3>프로젝트</h3>
      <article>
        - 프로젝트: 프로젝트 이름과 상세내역을 txt 형식으로 입력받습니다.
         프로젝트 수행기간은 datepicker를 활용해 날짜(년월일)를 입력받습니다.
      </article>
      <Form.Group as={Row} controlId="formHorizontalProject">
        <Form.Label column sm={2}>
        </Form.Label>
        <Col sm={10}>
          <Form.Control name="project" placeholder="프로젝트" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formHorizontalProjectDetail">
        <Form.Label column sm={2}>
        </Form.Label>
        <Col sm={10}>
          <Form.Control name="projectDetail" placeholder="프로젝트상세" />
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
        </Col>
      </Form.Group>
    </Form>
  );
}
