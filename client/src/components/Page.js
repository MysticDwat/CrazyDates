import {useState} from 'react';
import {Outlet} from 'react-router-dom';
import Logo from './Logo';

function Page(){
    //defines number of logos to populate the background with
    const [logos] = useState(Array(Math.floor(Math.random() * 30) + 20).fill().map((obj, key) => <Logo key={key}/>));

    //page is the background the menus are rendered on top of
    //outlet keeps page rendered between routing
    return(
        <div className="Page">
            <script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA-0ar_qDjV074wD7LAy1eB5p_aKrI-GOs&libraries=places&callback=initMap">
            </script>
            <Outlet />
            {logos}
        </div>
    );
}

export default Page;