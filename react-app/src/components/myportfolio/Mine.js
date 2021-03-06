//https://www.npmjs.com/package/react-datepicker
import "react-datepicker/dist/react-datepicker.css";
import Education from './Education';
import Awards from './Awards';
import Projects from './Projects';
import Certificates from './Certificates';
import Profile from './Profile';
import { ListGroup} from 'react-bootstrap';


export default function Mine(){
    return (
        <>
        <Profile />
        <ListGroup>
            <Education />
            <Awards />
            <Projects />
            <Certificates />
        </ListGroup>
        </>
    );
}