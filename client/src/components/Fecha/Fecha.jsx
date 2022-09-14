import React, { useState, useEffect } from "react";

//import gengar from "../../assets/icon_dog.png";
//import { NavLink } from "react-router-dom";
import './Fecha.css'

export default function Fecha() {
  const [dia, setDia] = useState();
  const [mes, setMes] = useState();
  const [anio, setAnio] = useState();

  useEffect(() => {
    const meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    let fecha = new Date();
    let hoy = fecha.getDate();
    let mes = meses[fecha.getMonth()];
    let anio = fecha.getFullYear();

    setDia(hoy);
    setMes(mes);
    setAnio(anio);
  }, []);

  return (
    
      <div className="fecha">
        <p className="dia">
          {dia + "-"}
          {mes}
        </p>

        <p className="año">{anio}</p>
      </div>
    
  );
}