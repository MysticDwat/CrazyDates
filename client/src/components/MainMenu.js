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
                <p className="Button">Play</p>
                <p className="Button">Account</p>
                <p className="Button">Settings</p>
            </nav>
        </div>
      );
}

export default MainMenu;
