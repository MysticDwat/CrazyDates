import {useState} from 'react';
import MainMenu from './MainMenu';
import Logo from './Logo';
import '../css/HomePage.css';

function HomePage(){
    const [logos, setLogos] = useState(Array(Math.floor(Math.random() * 20) + 10).fill().map(() => <Logo />));
    return(
        <div className="HomePage">
            <MainMenu />
            {logos}
        </div>
    );
}

export default HomePage;