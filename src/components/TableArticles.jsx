import React, { useEffect, useState } from "react";
import RowTableArticles from "./rowTableArticles";
import axios from "axios";

const TableArticles = () => {
//-----------------------------STYLES-------------------------------------------------
const containerTableStyle = {
    gridColumn : "4 / 8",
    gridRow : "4 / 8",
    background : "#fff",
    color : "#fff",
    border : "1px solid #000",
    borderRadius : "10px",
    display : "grid",
    gridTemplate : "repeat(10, 1fr) / repeat(10, 1fr)"
}

const tableStyle = {
    gridColumn : "2 / 10",
    gridRowStart : "2",
    borderCollapse : "collapse",
    background : "#000"
}

const tdThStyles = {
    border : "3px solid white",
    padding : "10px 10px"
}



//-----------------------------HOOKS--------------------------------------------------
    const [articles, useArticles] = useState([]);
  
    useEffect( async () => {
        const newArticles = await axios.get("http://localhost:8000/api/articles");
        useArticles(newArticles.data);
        
    }, []);

//---------------------------------RETURNS---------------------------------------------
    return(
        <div style = {containerTableStyle} >
            <table style = {tableStyle}>
                <thead>
                   <tr>
                        <th style = {tdThStyles} >ID</th>
                        <th style = {tdThStyles} >DESCRIPTION</th>
                        <th style = {tdThStyles}>PRICE</th>
                        <th style = {tdThStyles}>STOCK</th>
                        <th style = {tdThStyles}>ACTION</th>
                   </tr>
                </thead>
                <tbody>
                        { !articles ? "Loadding..." : articles.map( element => 
                        <RowTableArticles 
                        tdStyle = {tdThStyles} 
                        id = {element.id} 
                        description = {element.description}
                        price = {element.price}
                        stock = {element.stock}
                        key = {element.id}
                        /> )}
                </tbody>
            </table>
        </div>
    );
}

export default TableArticles; 