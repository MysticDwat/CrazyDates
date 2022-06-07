import MenuTitle from "./MenuTitle";

function RegisterMenu() {
    return(
        <div className="RegisterMenu Menu Center">
            {/*Menu Title*/}
            <MenuTitle title="Register" />

            {/*Register Form*/}
            <form className="Center">
                <div className="Row Center">
                    <label htmlFor="user">User Name</label>
                    <input type="text" name="user" id="user" />
                </div>

                <div className="Row Center">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" />
                </div>

                <div className="Row Center">
                    <label htmlFor="pw">Password</label>
                    <input type="password" name="pw" id="pw" />
                </div>

                <div className="Row Center">
                    <label htmlFor="confirm_pw">Confirm Password</label>
                    <input type="password" name="confirm_pw" id="confirm_pw" />
                </div>

                <div className="Row Center">
                    <input type="submit" value="Register" />
                </div>
            </form>
        </div>
    );
}

export default RegisterMenu;