import {useState} from 'react';
import {Outlet} from 'react-router-dom';
import Logo from './Logo';

function Page(){
    //defines number of logos to populate the background with
    const [logos] = useState(Array(Math.floor(Math.random() * 20) + 10).fill().map(() => <Logo />));

    //page is the background the menus are rendered on top of
    //outlet keeps page rendered between routing
    return(
        <div className="Page">
            <Outlet />
            {logos}
        </div>
    );
}

export default Page;