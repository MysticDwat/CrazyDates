import {useNavigate} from "react-router-dom";

function LoginMenu() {
    const navigate = useNavigate();

    return(
        <div className="LoginMenu Menu Center">
            <h1>
                Login

                <div className="BackBtn" onClick={() => navigate(-1)}/>
            </h1>
            
            <form className="Center">
                <div className="Row Center">
                    <label htmlFor="user">User Name</label>
                    <input type="text" name="user" id="user" />
                </div>

                <div className="Row Center">
                    <label htmlFor="pw">Password</label>
                    <input type="password" name="pw" id="pw" />
                </div>

                <div className="Row Center">
                    <input type="submit" value="Log In" />
                </div>
            </form>
        </div>
    );
}

export default LoginMenu;