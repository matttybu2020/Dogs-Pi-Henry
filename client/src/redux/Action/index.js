import axios from "axios";

import {ALL_DOGS,GET_TEMPERAMENTS,BREED,DOG_DETAILS } from "../Action/constantes"

//** Me traigo todos los perros */
export function AllDogs() {
    return async function (dispatch) {
        const res = await axios.get("http://localhost:3001/dogs");
        console.log(res)
        return dispatch({
            type: ALL_DOGS,
            payload: res.data
        });
    }
};


//** me traigo los temperamentos */
export function getTemperaments() {
    return async function (dispatch) {
        const res = await axios.get("http://localhost:3001/temperament"); 
        
        return dispatch({
            type: GET_TEMPERAMENTS,
            payload: res.data,
        });
      }  
  };
  

  export function getBreed(name) {//dogs by name
    return async function (dispatch) {//Dispatch que podemos usar gracias a la asincronia provista por el middleware thunk
        try {
            var res = await axios.get(`http://localhost:3001/dogs?name=${name}`) 
           console.log(res)
            return dispatch ({
                type: BREED ,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
};


//** Detalles de Dogs */


export function detailsDogs(id) {
    return async function (dispatch) {
        try {
            var res= await axios.get("http://localhost:3001/dogs/"+id, { //axios.get("http://localhost:3001/dogs/"+id
        });
        return dispatch({
            type: DOG_DETAILS,
            payload: res.data
        });
        } catch (error) {
            console.log(error);
        }
    }
};