import React from "react";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

const RegisterForm =  () => {
//------------------------STYLES-----------------------------------------------------
    const formStyle = {
        gridColumn : "4 / 8", 
        gridRow : "4 / 8",
        background : "#000",
        color : "#fff",
        borderRadius : "10px",
        display : "grid",
        gridTemplate : "repeat(14, 1fr) / repeat(10, 1fr)"
    }

    const paragraphStyle = {
        gridColumn : "4 / 8",
        gridRow : " 1 / 2 ",
        textAlign : "center",
        color : "#fff",
        fontSize : "1.5em"
    }

    const nameStyle = {
        gridColumn : "4 / 8",
        gridRow : "3 / 4",
        fontSize : "1em"
    }

    const lastNameStyle = {
        gridColumn : "4 / 8",
        gridRow : "5 / 6",
        fontSize : "1em"
    }

    const emailStyle = {
        gridColumn : "4 / 8",
        gridRow : "7 / 8",
        fontSize : "1em"
    };

    const passwordStyle = {
        gridColumn : "4 / 8",
        gridRow : "9 / 10",
        fontSize : "1em"
    }
    const registerStyle = {
        gridColumn : "4 / 8",
        gridRow : "11 / 12",
        fontSize : "1.5em",
        background : "#fff",
        color : "#000",
        border : "2px solid #fff",
        borderRadius : "75px"
    }

    const registerStyleHover = {
        gridColumn : "4 / 8",
        gridRow : "11 / 12",
        fontSize : "1.5em",
        background : "#000",
        color : "#fff",
        border : "2px solid #fff",
        borderRadius : "75px"
    }

    const logedStyle = {
        gridColumn : "4 / 8",
        gridRow : "13 / 14", 
        textDecoration : "none",
        fontSize : "1.5em",
        color : "#fff"
        
    }


//------------------------HOKS FUNCTIONS---------------------------------------------
    const [name, useName] = useState("");
    const [lastName, useLastName] = useState("");
    const [email, useEmail] = useState("");
    const [password, usePassword] = useState(""); 
    const [btnRegisterStyle, useRegisterStyle] = useState(registerStyle);

    const OnChangeName = e => useName(e.target.value);
    const OnChangeLastName = e => useLastName(e.target.value);
    const OnChangeEmail = e => useEmail(e.target.value);
    const OnChangePassword = e => usePassword(e.target.value);
    const SetDefaultStyleButton = () => useRegisterStyle(registerStyle);
    const ModifyStyleButton = () => useRegisterStyle(registerStyleHover);
   
    const OnClickRegister = async () => {
        SetDefaultStyleButton();
        const data = {
            name : name,
            lastName : lastName,
            email : email ,
            password : password
        };

        try{
            const response = await axios.post("http://localhost:8000/api/users/register", data)
            const text = response.data;
            Swal.fire(text, "", "success");
        }catch(err){
            console.log(err)
        }
    }

    return( 
        <div style = {formStyle}>
            <p style = {paragraphStyle}>Register</p>
            <input type="text" style = {nameStyle} onChange = {OnChangeName}  placeholder = "Name"/>
            <input type="text" style = {lastNameStyle} onChange = {OnChangeLastName} placeholder = "Last Name"/>
            <input type="email" style = {emailStyle} onChange = {OnChangeEmail} placeholder = "Email"/>
            <input type="password" style = {passwordStyle} onChange = {OnChangePassword} placeholder = "Password"/>
            <button onClick = {OnClickRegister} onMouseDown = {ModifyStyleButton} style = {btnRegisterStyle}>Register</button>
            <a href="/" style = {logedStyle}>Click here if you have an account</a>
        </div>
    )
}

export default RegisterForm;