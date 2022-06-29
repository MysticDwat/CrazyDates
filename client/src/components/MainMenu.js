import {Link} from 'react-router-dom';
import Logo from '../files/crazy-dates.png';

function MainMenu() {
    //main menu links to other menus
    return (
        <div className="MainMenu Menu Center">
            <h1>Crazy Dates</h1>

            <img className="MenuLogo" src={Logo} alt="Crazy Dates Logo"/>

            <nav className="Center">
                <Link to="/date" className="Button">Play</Link>
            </nav>
        </div>
      );
}

export default MainMenu;
