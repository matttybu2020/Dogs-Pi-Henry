import React, { useState, useEffect } from "react";
import styles from "./Fecha.css";
//import gengar from "../../assets/icon_dog.png";
//import { NavLink } from "react-router-dom";
// import '../fecha.js'

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
    
      <div className={styles.contFecha}>
        <p className="dia">
          {dia + "-"}
          {mes}
        </p>

        <p className="año">{anio}</p>
      </div>
    
  );
}