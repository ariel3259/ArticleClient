import React from "react";
import Header from "../components/Header";
import TableArticles from "../components/TableArticles";
import "../css/MainPage.css";

const Articles = () => {
    return (
    <div className="body">
        <Header title = "Article" loged = {true} />
        <TableArticles /> 
    </div>
    )
}

export default Articles;