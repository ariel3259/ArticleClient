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
const actionStyles = {
    border : "3px solid white",
    padding : "10px 10px",
    textAlign : "center"
}



//-----------------------------HOOKS--------------------------------------------------
    const [articles, useArticles] = useState([]);
    const [sortId, useSortId] = useState(false);
    const [sortDescription, useSortDescription] = useState(false);
    const [sortPrice, useSortPrice] = useState(false);
    const [sortStock, useSortStock] = useState(false)
    const [idText, useIdText] = useState("ID ↑");
    const [descriptionText, useDescriptionText] = useState("DESCRIPTION ↓");
    const [priceText, usePriceText] = useState("PRICE ↓");
    const [stockText, useStockText] = useState("STOCK ↓");

    const OnClickSortId = () => {
        useSortId(!sortId);
        if(sortId){
            const articlesSortedByDefault = articles.sort((a, b) => a.id - b.id)
            useIdText("ID ↑");
            useArticles(articlesSortedByDefault);
            return;
        }
        const articlesSortedByDefault = articles.sort((a, b) => b.id - a.id)
        useIdText("ID ↓");
        useArticles(articlesSortedByDefault);
    }

    const OnClickSortDescription = () => {
        useSortDescription(!sortDescription);
        if(sortDescription){
        
            const articlesSortedByDescription = articles.sort((a, b) =>{
                const descriptionA = a.description.toLowerCase();
                const descriptionB = b.description.toLowerCase();
                if(descriptionA < descriptionB){
                    return -1;
                }
                else if(descriptionA > descriptionB){
                    return 1;
                }
                return 0;
            });
            useDescriptionText("DESCRIPTION ↑");
            useArticles(articlesSortedByDescription);
            return;
        }
        
        const articlesSortedByDescription = articles.sort((a, b) =>{
            
            const descriptionA = a.description.toLowerCase();
            const descriptionB = b.description.toLowerCase();
            
            if(descriptionB < descriptionA){
                return -1;
            }
            else if(descriptionB > descriptionA){
                return 1;
            }
            return 0;
        });
        
        useDescriptionText("DESCRIPTION ↓");
        useArticles(articlesSortedByDescription);
        
    }

    const OnClickSortPrice = () => {
        useSortPrice(!sortPrice);
        if(sortPrice){
            const articlesSortedByPrice = articles.sort((a, b) => a.price - b.price);
            usePriceText("PRICE ↑");
            useArticles(articlesSortedByPrice);
            return;
        }
        const articlesSortedByPrice = articles.sort((a, b) => b.price - a.price);
        usePriceText("PRICE ↓");
        useArticles(articlesSortedByPrice);
    }

    const OnClickSortStock = () => {
        useSortStock(!sortStock);
        if(sortStock){
            const articlesSortedByStock = articles.sort((a, b) => a.stock - b.stock);
            useStockText("STOCK ↑");
            useArticles(articlesSortedByStock);
            return;
        }
        const articlesSortedByStock = articles.sort((a, b) => b.stock - a.stock);
        useStockText("STOCK ↓");
        useArticles(articlesSortedByStock);
    }


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
                        <th style = {tdThStyles} onClick = {OnClickSortId}> {idText}</th>
                        <th style = {tdThStyles} onClick = {OnClickSortDescription}> {descriptionText}</th>
                        <th style = {tdThStyles} onClick = {OnClickSortPrice}> {priceText}</th>
                        <th style = {tdThStyles} onClick = {OnClickSortStock}> {stockText}</th>
                        <th style = {tdThStyles}> ACTION</th>
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