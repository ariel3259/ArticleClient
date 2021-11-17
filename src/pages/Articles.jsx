import React from "react";
import Header from "../components/Header";
import TableArticles from "../components/TableArticles";
import ButtonCRD from "../components/ButtonCRD";

import "../css/MainPage.css";

const Articles = () => {

    const articleText = {
        gridColumn : "4 / 5",
        gridRow : "3 / 4",
        textAlign : "start",
        alignSelf : "end",
        margin : "0 0"
    }
    //---------------------------------RETURNS---------------------------------------------
    return (
    <div className="body">
        <Header title = "Article" loged = {true} />
        <h2 style = {articleText}>Articles</h2>
        <ButtonCRD type = "create" text = "CREATE" />
        <TableArticles /> 
    </div>
    )
}

export default Articles;