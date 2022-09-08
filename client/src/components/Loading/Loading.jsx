import React from "react";
import "./Loading.css";
import loading  from "../../img/loading.gif"

export default function Loading() {
  return (
    <>
      <div className="spinner">
        <span>L</span>
        <span>O</span>
        <span>A</span>
        <span>D</span>
        <span>I</span>
        <span>N</span>
        <span>G</span>
      </div>
      <div className="Imagen">
      <img className="LaImagen" src={loading} alt="" />
      </div>
    </>
  );
}
