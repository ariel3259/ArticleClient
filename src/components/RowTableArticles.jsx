import React from "react";
import ButtonCRD from "./ButtonCRD";

const RowTableArticles = props => {
//-----------------------------STYLES------------------------
  
    return (
        <tr>
            <td style = {props.tdStyle}> {props.id} </td>
            <td style = {props.tdStyle}> {props.description} </td>
            <td style = {props.tdStyle}> {props.price} </td>
            <td style = {props.tdStyle}> {props.stock} </td>
            <td style = {props.tdStyle}>
                <ButtonCRD type = "update" text = "Edit" id = {props.id}/>
                <ButtonCRD type = "delete" text = "Delete" id = {props.id} />    
            </td>
        </tr>
    )
}

export default RowTableArticles;
