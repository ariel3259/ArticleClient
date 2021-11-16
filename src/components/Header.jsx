import React from "react";
import { useState } from "react";

const Header = props => {

    const logoutStyle = { 
            gridColumn : "3 / 4",
            gridRow : "1 / 2",
            margin : "25px 25px", 
            alignSelf : "center",
            justifySelf : "end", 
            color : "#000",
            background : "#fff",
            borderRadius: "10px",
            padding : "7.5px 7.5px" ,
            border : "2px solid #fff"
    }

    const logoutStyleHover = {
        gridColumn : "3 / 4",
        gridRow : "1 / 2",
        margin : "25px 25px", 
        alignSelf : "center",
        justifySelf : "end", 
        color : "#fff",
        background : "#000",
        borderRadius: "10px",
        padding : "7.5px 7.5px",
        border : "2px solid #fff"
    }

    const [btnStyle, useBtnStyle] = useState(logoutStyle);
    
    const hoverStyle = () => useBtnStyle(logoutStyleHover);
    const defaultStyle = () => {
        useBtnStyle(logoutStyle);
        window.location.href = "/";
    }
       
    return(
        <nav id = "header">
            <h2 className = "header-title">{ props.title }</h2>
            {props.loged ? <a className = "logout" style = {btnStyle}  onClick = {defaultStyle} onMouseDown = {hoverStyle}>Logout</a> : undefined}
        </nav>
    )
};

export default Header;