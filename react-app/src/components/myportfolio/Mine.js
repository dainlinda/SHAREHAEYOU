//https://www.npmjs.com/package/react-datepicker
import "react-datepicker/dist/react-datepicker.css";
import Education from './Education';
import Awards from './Awards';
import { ListGroup } from 'react-bootstrap';


export default function Mine(){
    return (
        <ListGroup>
            <Education />
            <Awards />
            
        </ListGroup>
    );
}