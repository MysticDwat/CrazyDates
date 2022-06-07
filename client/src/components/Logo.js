import {useRef, useEffect, useState} from 'react';
import LogoSrc from '../files/crazy-dates.png';

function Logo(){
    //logo options for animation
    const [left, setLeft] = useState(Math.floor(Math.random() * 1820));
    const [fallSpeed, setFallSpeed] = useState(Math.floor(Math.random() * 4500) + 1500);
    const [spinSpeed, setSpinSpeed] = useState(Math.random() * 2 + 3);
    const [width, setWidth] = useState(Math.floor(Math.random() * 100) + 50)

    //defines spin animation for logo
    let spin = {
        animation: `spin ${spinSpeed}s linear infinite`
    }

    //defines fall animation for logo
    let fall = {
        animation: `fall ${fallSpeed / 1000}s linear infinite`
    }

    //every time the fall animation ends, set new x coordinate
    useEffect(() => {
        const interval = setInterval(() => {
            setLeft(Math.floor(Math.random() * 10000) / 100);
        }, fallSpeed);
        return () => clearInterval(interval);
    });

    //apply fall and left coordinate to parent div and spin and width to child div
    //if applied to same div, logo spins incorrectly
    return(
        <div className="Logo Fall" style={{...fall, left: `calc(${left}vw - ${width / 2}px)`}}>
            <img className="Spin" src={LogoSrc} alt="Crazy Dates Logo" style={{...spin, width: `${width}px`}}/>
        </div>
    );
}

export default Logo;