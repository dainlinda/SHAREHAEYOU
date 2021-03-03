import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { formDate } from './AwardsForm';

function CertificatesForm(props) {
  const [startDate, setStartDate] = useState(new Date());
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
      <h3>자격증</h3>
      <article>
        - 자격증: 자격증 이름, 공급기관을 text 형식으로 입력받습니다.
         취득일자는 datepicker를 활용해 날짜(년월일)를 입력받습니다.
      </article>
      <Form.Group as={Row} controlId="formHorizontalCertificate">
        <Form.Label column sm={2}>
        </Form.Label>
        <Col sm={10}>
          <Form.Control name="certificate" placeholder="자격증이름" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formHorizontalOrganization">
        <Form.Label column sm={2}>
        </Form.Label>
        <Col sm={10}>
          <Form.Control name="organization" placeholder="발급기관" />
        </Col>
      </Form.Group>

      <h6>취득일</h6>
      <DatePicker selected={startDate} onChange={date => setStartDate(date)} />

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
