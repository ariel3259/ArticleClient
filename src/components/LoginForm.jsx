import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import axios from "axios";

const LoginForm = () => {
//--------------------------STYLES--------------------------------------------    
    const formStyle = {
        gridColumn : "4 / 8",
        gridRow: "4 / 8",
        background : "#000",
        color : "#fff",
        borderRadius  : "10px",
        display : "grid" ,
        gridTemplate : "repeat(10,1fr) / repeat(10,1fr)"
    }
    
    const textStyle = {
        fontSize : "1.5em",
        textAlign : "center",
        gridColumn : "4 / 8",
        gridRow :  "1 / 2"
    }

    const emailStyle = {
        fontSize : "1em",
        gridColumn : "4 / 8", 
        gridRow : "3/4",
    }

    const passwordStyle = {
        fontSize : "1em",
        gridColumn : "4 / 8",
        gridRow : "5 / 6"
    }

    const submitStyle = {
        fontSize : "1.5em",
        gridColumn : "4 / 8",
        gridRow : "7 / 8",
        borderRadius : "75px",
        border : "4px solid #fff"
    }

    const hoverSubmitStyle = {
        fontSize : "1.5em",
        gridColumn:  "4 / 8",
        gridRow : "7 / 8",
        borderRadius : "75px",
        border : "4px solid #fff",
        background : "#000",
        color : "#fff"
    }

    const registerLink = {
        textDecoration : "none",
        fontSize : "1.5em",
        textAlign : "center",
        color : "#fff",
        gridColumn : "4 / 8", 
        gridRow : " 9 / 10"
    }

//-----------------------------HOKS FUNCTIONS------------------------------------------------------ 
    const [email, useEmail] = useState("");
    const [password, usePassword] = useState("");
    const [btnSubmit, useBtnSubmit] = useState(submitStyle);

    const OnChangeEmail = e => useEmail(e.target.value); 
    const OnChangePassword = e => usePassword(e.target.value);
    const defaultSubmitStyle = e => useBtnSubmit(submitStyle);
    const changeSubmitStyle = e => useBtnSubmit(hoverSubmitStyle);    
    
    const OnClickLogin = async () => {
        defaultSubmitStyle();
        const data = {
            email : email,
            password : password
        };
    
        try {
            const response = await axios.post("http://localhost:8000/api/users/auth", data);
            const text = response.data; 
            text === "Wrong email or password" || text === "The account doesn't exist" ? Swal.fire(text, "try again" ,"error") : Swal.fire(text, "","success").then(() => window.location.href = "/articles"); 

        }catch(err){
            console.log(err)
        }
    }
//---------------------------------RETURNS---------------------------------------------
    return(
        <div style = {formStyle}>
            <h2 style= {textStyle}>Login</h2>
            <input type = "email" style = {emailStyle} onChange = {OnChangeEmail} placeholder = "Email"/>
            <input type = "password" style = {passwordStyle} onChange = {OnChangePassword} placeholder = "Password"/>
            <button className="btn-submit" style = {btnSubmit}  onClick = { OnClickLogin } onMouseDown = {changeSubmitStyle} >Login</button>
            <a href="/register" style = {registerLink}>are you not register yet?</a>
        </div>
    )
}

export default LoginForm;