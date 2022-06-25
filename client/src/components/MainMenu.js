import {Link} from 'react-router-dom';
import useUserStatus from './useUserStatus';
import Logo from '../files/crazy-dates.png';

function MainMenu() {
    //get user status for account links
    const [status] = useUserStatus();

    //main menu links to other menus
    return (
        <div className="MainMenu Menu Center">
            <h1>Crazy Dates</h1>

            <img className="MenuLogo" src={Logo} alt="Crazy Dates Logo"/>

            <nav className="Center">
                <Link to="/date" className="Button">Play</Link>
                {status && status.logged ? <Link to="/account" className="Button">Account</Link> :
                    [
                        <Link key="login" to="/login" className="Button">Login</Link>,
                        <Link key="register" to="/register" className="Button">Register</Link>
                    ]}
                <Link to="/settings" className="Button">Settings</Link>
            </nav>
        </div>
      );
}

export default MainMenu;
