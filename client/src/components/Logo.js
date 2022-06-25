import {useEffect, useState} from 'react';
import LogoSrc from '../files/crazy-dates.png';

function Logo(){
    //logo options for animation
    const [left, setLeft] = useState(Math.floor(Math.random() * 100));
    const [top, setTop] = useState(-10);
    const [fallSpeed] = useState(Math.floor(Math.random() * 350) + 150);
    const [spinSpeed] = useState(Math.random() * 2 + 3);
    const [width] = useState(Math.floor(Math.random() * 100) + 50)

    //defines spin animation for logo
    let spin = {
        animation: `spin ${spinSpeed}s linear infinite`
    }

    //every time the fall animation ends, set new x coordinate
    useEffect(() => {
        const interval = setInterval(() => {
            setTop(top < 110 ? top + (fallSpeed / 1000) : -10);
            setLeft(top < 110 ? left : Math.floor(Math.random() * 100));
        }, 10);
        return () => clearInterval(interval);
    });

    //apply fall and left coordinate to parent div and spin and width to child div
    //if applied to same div, logo spins incorrectly
    return(
        <div className="Logo Fall" style={{top: `${top}vh`, left: `calc(${left}vw - ${width / 2}px)`}}>
            <img className="Spin" src={LogoSrc} alt="Crazy Dates Logo" style={{...spin, width: `${width}px`}}/>
        </div>
    );
}

export default Logo;