import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
// import Nav from "../Nav/Nav";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
function  Detail(prop) {
  const dispatch = useDispatch();
  const params = useParams()
  const [selectP, setselectP] = useState({})
  useEffect(() => {  
    axios.get("http://localhost:3001/id/" + params.id)
    .then(response =>response.data)
    .then(data=> setselectP(data[0])) 
  }, [dispatch]);
  let types = [];
  if (selectP) {
    types = selectP?.types?.map((e) => (e.name ? e.name : e)).join(", ");
  }
  return (
    <div className="container">
      <Link to="/home">
        <div className="descriptionNav">{/* <Nav /> */}</div>
      </Link>
      <div className="generalContainer">
        <div className="containerDetailTitle">
          <h1 className="detailTitle">Pokemon</h1>
        </div>
        
          
          <div>
            <h1>{selectP?.name}</h1>
            <img src={selectP?.img? selectP?.img: selectP?.image}  />
            <h2>types: {!selectP?.createdInDb? selectP?.types + " " : selectP?.types?.map(el => el.name+ (" "))}</h2>
            <h2>{selectP.attack}</h2>
              
        
        <Link to="/home"> volver</Link>
      </div>
    </div>
    </div>
  );
  }
export default Detail;
