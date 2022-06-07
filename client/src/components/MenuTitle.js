import {useNavigate} from "react-router-dom";

function MenuTitle(props){
    const navigate = useNavigate();

    return(
        <h1>
            {props.title}
            <div className="BackBtn" onClick={() => navigate(-1)}/>
        </h1>
    );
}

export default MenuTitle;