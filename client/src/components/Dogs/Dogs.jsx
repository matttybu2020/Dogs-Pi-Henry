import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { AllDogs, getTemperaments } from "../../redux/Action/index";

import Dog from "../Dog/Dog.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import NavBar from "../NavBar/NavBar";
import Paginado from "../Paginado/Paginado.jsx";
import Loading from "../Loading/Loading";
import DogFail from "../DogFail/DogsFail.jsx"
import Filtrado from "../Filtrado/Filtrado.jsx"
import "./Dogs.css";

export default function Dogs() {
  //** me traigo todos los perros y temperamentos */

  const allDog = useSelector((state) => state.dogs);
  const allTemperaments = useSelector((state) => state.temperaments);
  const todosDogs = useSelector((state) => state.allDogs);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);

  const indexLastDogs = currentPage === 1 ? 8 : currentPage * dogsPerPage - 1;
  const indexFirstDogs = currentPage === 1 ? 0 : indexLastDogs - dogsPerPage;




  const currentDogs = allDog.slice(indexFirstDogs, indexLastDogs); //elementos a renderizar en la pagina, segun el valor de paginado

  
  /*
  if(typeof allDog  === 'string'){
    currentDogs = allDog
}else {
  currentDogs = allDog.slice(indexFirstDogs, indexLastDogs) //uso los indices para "fraccionar que juegos muestro"
}
*/

  //console.log(currentDogs);

  const paginado = (numberOfPage) => {
    setCurrentPage(numberOfPage);
  };

  useEffect(() => {
    if (allDog.length === 0 || currentDogs.length === 0 ) {
      dispatch(AllDogs());
    }
    let lastPage = 1 + Math.ceil(allDog.length / dogsPerPage);
    if (currentPage > lastPage) {
      setCurrentPage(1);
    }
    dispatch(getTemperaments());
  }, [
    allDog.length,
    todosDogs.length,
    currentDogs.length,
    allTemperaments.length,
    currentDogs,
    currentPage,
   
    dispatch
  ]);

  
   /* useEffect(() => {
        //acciones a depachar luego de montar el componente
       
        dispatch(getTemperaments());
      }, [dispatch]);*/
    

  return (
    <>
      <NavBar />
      <SearchBar />
      <Filtrado />
      <Paginado
        dogsPerPage={dogsPerPage}
        allDog={allDog.length}
        paginado={paginado}
        currentPage={currentPage}
       // beforePage={beforePage}
       // nextPage={nextPage}
      />
      <div className="main_container1">
        <div className="container_cards">
          {currentDogs && currentDogs.length > 0 ? (
            currentDogs?.map((el) => {
              return (
                <div className="container_card" key={el.id}>
                <Link to={"/dogdetail/" + el.id}>
                  {
                    <Dog
                      key={el.id}
                      image={el.image}
                      name={el.name}
                      temperaments={
                        el.temperaments[0].name
                          ? el.temperaments.map((el) => el.name)
                          : el.temperaments
                      }
                    />
                  }
                </Link>
                </div>
              );
            })
            ) : typeof currentDogs === "string" ? (
              <div>
                <DogFail/>
                
              </div>
          ) : (
            <div>
              <Loading />
            </div>
          )}{" "}
        </div>
      </div>
    </>
  );
}
