import {Link} from 'react-router-dom';
import '../css/Menu.css';
import Logo from '../files/crazy-dates.png';

function MainMenu() {
    function render (status) {
        return <h1>{status}</h1>;
    }

    return (
        <div className="MainMenu Menu Center">
            <h1>Crazy Dates</h1>

            <img className="MenuLogo" src={Logo} alt="Crazy Dates Logo"/>

            <nav className="Center">
                <Link to="/date" className="Button">Play</Link>
                <Link to="/login" className="Button">Account</Link>
                <Link to="/settings" className="Button">Settings</Link>
            </nav>
        </div>
      );
}

export default MainMenu;
