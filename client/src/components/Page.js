import {useState} from 'react';
import {Routes, Route, Outlet} from 'react-router-dom';
import Logo from './Logo';

function Page(){
    const [logos, setLogos] = useState(Array(Math.floor(Math.random() * 20) + 10).fill().map(() => <Logo />));
    return(
        <div className="Page">
            <Outlet />
        </div>
    );
}

export default Page;