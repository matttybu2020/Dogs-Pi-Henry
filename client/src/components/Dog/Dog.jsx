import React from "react";
//import style from "../Card/Card.module.css";
import "./Dog.css"
import { Link } from "react-router-dom";


export default function Card({ image, name, temperaments,id }) {
  return (
    <div className="main_containers">
    <div className="main_container">
      <div className="image_container">
        <img className="img" src={`${image}`} alt={`imagen de: ${name}`}/>
      </div>
      <div>
      <h2>🐶🦴{name}</h2>
      </div>
    <div className="caja">

   
      <div className="temperaments_container">
       {
        temperaments.map((temps) => <h3 key={temps+Math.random}>{temps}</h3>)
        }
      </div>
      </div>
      <div className="div-button">
        {id && (
          <Link to={`"/dog-detail/"${id}`}>
            <button className="Link">Detalles</button>
          </Link>
        )}
      </div>
    </div>
    </div>
  
  );
}
