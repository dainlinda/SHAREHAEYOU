import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';

export default function Awards(){
  return (
    <div>
      test
    </div>
  );
}

function AwardsForm(props) {
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
      <h3>수상이력</h3>
      <article>
        - 수상 이력: 수상 내역과 상세내역을 text 형식으로 입력받습니다.
      </article>
      <Form.Group as={Row} controlId="formHorizontalAward">
        <Form.Label column sm={2}>
        </Form.Label>
        <Col sm={10}>
          <Form.Control name="award" placeholder="수상내역" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formHorizontalAwardDetail">
        <Form.Label column sm={2}>
        </Form.Label>
        <Col sm={10}>
          <Form.Control name="awardDetail" placeholder="상세내역" />
        </Col>
      </Form.Group>

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
export function formDate() {
  var date = new Date();
  var year = date.getFullYear();
  var month = ("0" + (1 + date.getMonth())).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);

  return year + "-" + month + "-" + day;
}
