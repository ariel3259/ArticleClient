import React from "react";
import Header from "../components/Header";
import RegisterForm from "../components/RegisterForm";
import "../css/MainPage.css";

const Register = () => {
    return  (
        <div className = "body">
            <Header title = "Register" />
            <RegisterForm />
        </div>
    );
}

export default Register;