import {useState} from 'react';
import DateMenu from './DateMenu';
import Logo from './Logo';
import '../css/DatePage.css';

function DatePage(){
    const [logos, setLogos] = useState(Array(Math.floor(Math.random() * 20) + 10).fill().map(() => <Logo />));
    return(
        <div className="DatePage">
            <DateMenu />
            {logos}
        </div>
    );
}

export default DatePage;