import {useEffect, useState} from 'react';
import LogoSrc from '../files/crazy-dates.png';

//vars to control width range
const maxWidth = 150;
const minWidth = 40;

function Logo(){
    //logo options for animation
    const [left, setLeft] = useState(Math.floor(Math.random() * 100));
    const [top, setTop] = useState(Math.floor(Math.random() * 120) - 10);
    const [rotation, setRotation] = useState(Math.floor(Math.random() * 359));
    const [fallSpeed] = useState(Math.floor(Math.random() * 350) + 350);
    const [spinSpeed] = useState(Math.random() * 2000 + 3000);
    const [width] = useState(Math.floor(Math.random() * (maxWidth - minWidth)) + minWidth)

    useEffect(() => {
        const interval = setInterval(() => {
            //moves logo down until it reaches 110vh, then reset back to -10
            setTop(top < 110 ? top + (fallSpeed / 1000 * ((.4 * (width / 100) - 1) + 1)) : -10);
            //every time the logo rests vertically, set new left coordinate
            setLeft(top < 110 ? left : Math.floor(Math.random() * 100));
            //spins logo
            setRotation((rotation + (3600 / spinSpeed)) % 360);
        }, 10);
        return () => clearInterval(interval);
    });

    //apply top, left, and z coordinates to parent div and width, rotation, and filter to child divy
    return(
        <div
            className="Logo Fall"
            style={{
                top: `${top}vh`,
                left: `calc(${left}vw - ${width / 2}px)`,
                zIndex: (width - maxWidth + 5)}}
        >
            <img
                className="Spin"
                src={LogoSrc}
                alt="Crazy Dates Logo"
                style={{
                    width: `${width}px`,
                    transform: `rotate(${rotation}deg)`,
                    filter: `saturate(${70 + (30 * (width / maxWidth))}%) brightness(${100 + (15 * minWidth / width)}%)`
            }}/>
        </div>
    );
}

export default Logo;
