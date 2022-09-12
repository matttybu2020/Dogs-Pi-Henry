import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { detailsDogs,deleteDog,clearDetail } from "../../redux/Action/index";
import { Link } from "react-router-dom";
//import Loading from "../Loading/Loading.jsx"
import loading2 from "../../img/loading2.gif"
 import "./DogDetails.css";
 import { useHistory } from "react-router-dom";

export default function DogDetails() {
    const dispatch = useDispatch();
    const allDog = useSelector((state) => state.dogs);
    
    let { id } = useParams();
    const history = useHistory();
    const [loading, setLoading] = useState(true); //para poder crear el loading de carga
    const details = useSelector((state) => state.details)
    useEffect(() => {
        dispatch(detailsDogs(id));
        
       setTimeout(() => {
            setLoading(false);
          },1000);
         /* return (() => {
            dispatch(clearDetail());
          })*/
    }, [dispatch, id]);

  
    // console.log(details);

    let nameDog, imageDog, temperamentDog = [], heightDog, weightDog, lifeSpanDog;

    if (details[0]) { //una vez ya se hayan traido los datos renderizalos
        nameDog = details[0].name;
        imageDog = details[0].image;
        heightDog = details[0].height;
        weightDog = details[0].weight;
        lifeSpanDog = details[0].life_span;

        if (details[0].temperaments[0]) {
            temperamentDog = [...details[0].temperaments]
        }

        if (details[0].temperaments[0].name) {
            temperamentDog = details[0].temperaments.map(temp => temp.name)
        }
    };


//** eliminar por id */

function OnClickeDelete(e){
    e.preventDefault()
    dispatch(deleteDog(id))
    alert("Eliminado")
    history.push("/dogs")
    
}

    return(
        <>
        <div className="background3">
        <div className="main_container1">
        <span>  {allDog[0].createdInDb && 
        <button className="searchbar_button" onClick={OnClickeDelete}>Eliminar</button>} </span>
            {loading ? (
            <div>
               <img className="LaImagen" src={loading2} alt="" />

            </div>
            ):(
            <div className="sub_container">
                    <div className="container_elements">

                       <div className="image_container">
                            <img src={imageDog} alt={`imagen de ${nameDog}`}/>
                        </div>
                        
                        
                        <div className="right_container">
                            <h1>{nameDog}</h1>
                            <h3>{`Height: ${heightDog && heightDog[0]} - ${heightDog && heightDog[1]} CM`}</h3>
                            <h3>{`Weight: ${heightDog &&  weightDog[0]} - ${weightDog && weightDog[1]} KG`}</h3>
                            <h3>{`Lifespan: ${lifeSpanDog}`}</h3>
                            <div>
                                <h3>Temperaments</h3>
                                <ul className="list_container">
                                    {temperamentDog.map(t => <li key={t}>{t}</li>)}
                                </ul>
                            </div>
                        </div>   
                </div>
            </div> 
  )}

            <Link to="/dogs" >
                <button className="button_home">Volver</button>
            </Link> 
        </div> 

    
        </div>

        </>
    )  
   
}

