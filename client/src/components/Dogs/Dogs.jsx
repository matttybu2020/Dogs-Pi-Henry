import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  AllDogs,
  getTemperaments,
  savePage,
  clearDetail,
} from "../../redux/Action/index";
import Dog from "../Dog/Dog.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import NavBar from "../NavBar/NavBar";
import Paginado from "../Paginado/Paginado.jsx";
import Loading from "../Loading/Loading";
import DogFail from "../DogFail/DogsFail.jsx";
import Filtrado from "../Filtrado/Filtrado.jsx";
//import { useLocalStorage } from "../useLocalStorage/useLocalStorage";
import "./Dogs.css";

export default function Dogs() {


  
  //** me traigo todos los perros y temperamentos */
  const dispatch = useDispatch();
  const allDog = useSelector((state) => state.dogs);
  const allTemperaments = useSelector((state) => state.temperaments);
  const todosDogs = useSelector((state) => state.allDogs);
  const page1 = useSelector((state) => state.page);

  const [currentPage, setCurrentPage] = useState(page1);

  //const [currentPage, setCurrentPage] = useState(page1)
  // const dogsPerPage = 8;
  //const lastIndex = currentPage * dogsPerPage;
  //const firstIndex = lastIndex - dogsPerPage;
  //const currentDogs = allDog.slice(indexFirstDogs, indexLastDogs);//elementos a renderizar en la pagina, segun el valor de paginado
  //const miStorage = window.localStorage ;
  // estado local con un array de dos posiciones una el estado y el otro el metodo
  //const [currentPage, setCurrentPage] = useLocalStorage("currentPage", " ");
  const [dogsPerPage] = useState(8);
  const indexLastDogs = currentPage === 1 ? 8 : currentPage * dogsPerPage - 1;
  const indexFirstDogs = currentPage === 1 ? 0 : indexLastDogs - dogsPerPage;

  var currentDogs;
  if (typeof allDog === []) {
    currentDogs = allDog;
  } else {
    currentDogs = allDog.slice(indexFirstDogs, indexLastDogs); //uso los indices para "fraccionar que juegos muestro"
  }
 

  const paginado = (numberOfPage) => {
    setCurrentPage(numberOfPage);
  };

 /* useEffect(() => {
    dispatch(AllDogs())
    dispatch(getTemperaments());
  }, [dispatch]);*/

  useEffect(() => {
    if (allDog.length === 0 || currentDogs.length === 0) {
      //AllDogs()
      dispatch(AllDogs());
    }

    let lastPage = 1 + Math.ceil(allDog.length / dogsPerPage);
    if (currentPage > lastPage) {
      setCurrentPage(1);
    }
    dispatch(getTemperaments());
    /*return () => {
      dispatch(clearDetail());
    };*/
  }, [
    allDog.length,
    todosDogs.length,
    currentDogs.length,
    allTemperaments.length,
    currentDogs,
    currentPage,
    dispatch,
  ]);

  // para next y siguiente
 const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const beforePage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  function handleNextpage() {
    dispatch(savePage(currentPage));
  }

  //console.log(allDog)
  return (
    <>
      <div className="background1">
        <NavBar />
        <SearchBar />
        <Filtrado />
        <Paginado
          dogsPerPage={dogsPerPage}
          allDog={allDog.length}
          paginado={paginado}
          currentPage={currentPage}
          beforePage={beforePage}
           nextPage={nextPage}
        />
        {typeof allDog === "string" ? (
          <div>
            <DogFail />
          </div>
        ) : (
          <div className="main_container1">
            <div className="container_cards">
              {currentDogs.length ? (
                currentDogs.map((el) => (
                  <div className="container_card" key={el.id}>
                    <div className="container_card_animado">
                      <Link
                        onClick={(e) => handleNextpage(e)}
                        to={"/dogdetail/" + el.id}
                      >
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
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  <Loading />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

















/*
/*
    //acciones a depachar luego de montar el componente
    
    useEffect(() => {
    dispatch(AllDogs())
    dispatch(getTemperaments());
  }, [dispatch]);*/

/*
  if(typeof allDog  === 'string'){
    currentDogs = allDog
}else{
   currentDogs = allDog.slice(indexFirstDogs, indexLastDogs); //elementos a renderizar en la pagina, segun el valor de paginado
}
 // console.log(currentDogs)
  
  
*/

//const [currentPage, setCurrentPage] = useState(page1)
// const dogsPerPage = 8;
//const lastIndex = currentPage * dogsPerPage;
//const firstIndex = lastIndex - dogsPerPage;
//const currentDogs = allDog.slice(firstIndex, lastIndex);//elementos a renderizar en la pagina, segun el valor de paginado
