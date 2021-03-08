//https://www.npmjs.com/package/react-datepicker
import "react-datepicker/dist/react-datepicker.css";
import Education from './Education';
import Awards from './Awards';
import Projects from './Projects';
import Certificates from './Certificates';
import Profile from './Profile';
import { ListGroup, Row, Col, Container } from 'react-bootstrap';


export default function Mine(){
    return (
        <Container>
        <Row>
            <Col>
                 <br />
                <Profile />
            </Col>
            <Col>
                <br />
                <ListGroup>
                    <Education />
                    <br />
                    <Awards />
                    <br />
                    <Projects />
                    <br />
                    <Certificates />
                </ListGroup>
            </Col>
        </Row>
        </Container>
    );
}