import {useRef, useEffect, useState} from 'react';
import LogoSrc from '../files/crazy-dates.png';

function Logo(){
    const [left, setLeft] = useState(Math.floor(Math.random() * 1820));
    const [fallSpeed, setFallSpeed] = useState(Math.random() * 4.5 + 1.5);
    const [spinSpeed, setSpinSpeed] = useState(Math.random() * 2 + 3);
    const [width, setWidth] = useState(Math.floor(Math.random() * 100) + 50)

    let spin = {
        animation: `spin ${spinSpeed}s linear infinite`
    }

    let fall = {
        animation: `fall ${fallSpeed}s linear infinite`
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setLeft(Math.floor(Math.random() * 10000) / 100);
        }, fallSpeed * 1000);
        return () => clearInterval(interval);
    });

    return(
        <div className="Logo Fall" style={{...fall, left: `calc(${left}vw - ${width / 2}px)`}}>
            <img className="Spin" src={LogoSrc} alt="Crazy Dates Logo" style={{...spin, width: `${width}px`}}/>
        </div>
    );
}

export default Logo;