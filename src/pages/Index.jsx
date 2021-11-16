import React from "react";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
import "../css/MainPage.css";

const Index = () => {
    return(
    <div className = "body">
        <Header title = "Login" />
        <LoginForm />
    </div>
)
}

export default Index;