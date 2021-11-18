import React, { useState,useEffect } from "react";
import axios from "axios";
import { Modal,Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from "sweetalert2";

const url = "http://localhost:8000/api/articles";

const ButtonCRD =  props =>{
//-----------------------------STYLES-------------------------------------------
    const btnCreateStyle = {
        fontSize : "1.5em",
        gridColumn : "7 / 8",
        gridRow : "3 / 4",
        borderRadius : "10px",
        border: "1px solid #7cfc00",
        background :"#000",
        color : "#7cfc00",
        alignSelf : "end",
        justifySelf : "end",
        marginBottom: "2px"
    };

    const btnUpdateStyle = {
        margin : "0 15px",
        color : "#1e90ff",
        borderRadius : "25px",
        background : "#000",
        border : "1px solid #1e90ff"
    }

    const btnDeleteStyle = {
        margin : "0 15px",
        gridColumn : "2 / 3",
        color : "#ff1a1a",
        background : "#000",
        borderRadius : "25px",
        border : "1px solid #ff1a1a"
    }

    const hoverBtnCreateStyle = {
        fontSize : "1.5em",
        gridColumn : "7 / 8",
        gridRow : "3 / 4",
        borderRadius : "10px",
        border: "1px solid #000",
        background :"#7cfc00",
        color : "#000",
        alignSelf : "end",
        justifySelf : "end",
        marginBottom: "2px"
    }

    const hoverBtnUpdateStyle = {
        margin : "0 15px",
        color : "#000",
        borderRadius : "25px",
        background : "#1e90ff",
        border : "1px solid #000"
    }

    const hoverBtnDeleteStyle = {
        margin : "0 15px",
        gridColumn : "2 / 3",
        color : "#000",
        background : "#ff1a1a",
        borderRadius : "25px",
        border : "1px solid #000"
    }


    const typeOfStyleButton = type => {
        switch(type) {
           case "create" : 
               DefaultBtnCreateStyle()
               break;
           case "update" :
               DefaultBtnUpdateStyle();
               break;
           case "delete" : 
               DefaultBtnDeleteStyle();
               break;
           }
    }
    const OnMouseDownHover = type => {
       switch(type){
           case "create" : 
               HoverBtnCreateStyle();
               break;
           case "update" : 
               HoverBtnUpdateStyle();
               break;
           case "delete" : 
               HoverBtnDeleteStyle();
               break;
       }
   }

    useEffect( () => {
       typeOfStyleButton(props.type);
    }, [])

//---------------------------------------Events and Hoks--------------------------------
    const [showModal, useShowModal] = useState(false);
    const [modalTitle, useModalTitle] = useState("");
    const [description, useDescription] = useState("");
    const [price, usePrice] = useState(0);
    const [stock, useStock] = useState(0);
    const [defaultBtnStyle, useDefaultBtnStyle] = useState();

    const DefaultBtnCreateStyle = () => useDefaultBtnStyle(btnCreateStyle);
    const DefaultBtnUpdateStyle = () => useDefaultBtnStyle(btnUpdateStyle);
    const DefaultBtnDeleteStyle = () => useDefaultBtnStyle(btnDeleteStyle);
    const HoverBtnCreateStyle = () => useDefaultBtnStyle(hoverBtnCreateStyle);
    const HoverBtnUpdateStyle = () => useDefaultBtnStyle(hoverBtnUpdateStyle);
    const HoverBtnDeleteStyle = () => useDefaultBtnStyle(hoverBtnDeleteStyle);

    const OnChangeDescription = e => useDescription(e.target.value);
    const OnChangePrice = e => usePrice(e.target.value);
    const OnChangeStock = e => useStock(e.target.value)


    const closeModal = () => useShowModal(!showModal);

    const OnClickCreate = () => {
        useShowModal(!showModal);
        DefaultBtnCreateStyle();
        useModalTitle("Add a new article");

    }

    const OnClickUpdate = () => {
        useShowModal(!showModal);
        DefaultBtnUpdateStyle();
        useModalTitle("Update an article");
    }

    const OnClickDelete = async () =>{
        DefaultBtnDeleteStyle();
        console.log(props.id)
        try {
            const response = await axios.delete(url,{
                headers : {
                    "id" : props.id
                }
            });
            Swal.fire(response.data,"","success").then(() => window.location.reload());
            
           
        }catch(err){
            console.log(err)
        }
    }

    const OnClickSubmit = async type => {
        if( description === "" || price === 0 || stock === 0 ){
            Swal.fire("Fail to save","insert data", "error")
            useShowModal(!showModal);
            return;
        }
        const data = {
            description : description ,
            price : price, 
            stock : stock  
        };
       
       switch(type){
            case "create" :
                try{
                    const responseOfCreate = await axios.post(url,data);
                    Swal.fire(responseOfCreate.data,"","success").then(() => window.location.reload());
                }catch(err) {
                    console.log(err)
                }
                break;
            case "update" :
                data.id = props.id;
                console.log(data)
                try{
                    const responseOfUpdate = await axios.put(url,data);
                    Swal.fire(responseOfUpdate.data,"","success").then(() => window.location.reload());
                }catch(err){
                    console.log(err);
                } 
                
                break;
       }
     }


     //--------------------------------Verify type of Button
    const typeOfButton = type => {
        switch(type) {
            case "create" : 
                OnClickCreate();
                break;
            case "update" : 
                OnClickUpdate();
                break;
            case "delete":
                OnClickDelete();
        }
     }


     return(
       <>
            <button style = {defaultBtnStyle} onClick = {() => typeOfButton(props.type)} onMouseDown = {() => OnMouseDownHover(props.type)}>{props.text}</button>
            <Modal show = {showModal}>
                <Modal.Header>
                  <h2>{modalTitle}</h2>
                </Modal.Header>
                <Modal.Body>
                   <div className="mb-3">
                        <label className="form-label">Description:</label>
                        <input type="text" className = "form-control" onChange = {OnChangeDescription}  placeholder = "write product's description"/>
                   </div>
                    <div className="mb-3">
                        <label className="form-label">Price:</label>
                        <input type="number" className = "form-control" onChange = {OnChangePrice} placeholder = "write product's price"/>
                    </div>  
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Stock:</label>
                        <input type="number" className = "form-control" onChange = {OnChangeStock} placeholder = "write product's stock"/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick = {() => OnClickSubmit(props.type)}>
                        Save
                    </Button>
                    <Button onClick = {() => closeModal()}>
                        Cerrar
                    </Button>
                </Modal.Footer>
                </Modal>
       </>
     )

}

export default ButtonCRD;