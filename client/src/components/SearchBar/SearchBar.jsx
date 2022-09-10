import React, { useState } from "react";
import { useDispatch  } from "react-redux";
//import { connect } from 'react-redux'
import {getBreed,AllDogs } from "../../redux/Action/index"
//import DogFail from "../DogFail/DogsFail";

import "./SearchBar.css"




function SearchBar() {
  // hooks
      const dispatch = useDispatch();
      const [name, setName] = useState("");  //estado local seteo en stren vacio
  
  
      //** funtion que va value del input por el value del state */
      function handleChange(e) {
        e.preventDefault()
        setName(e.target.value);
     
        console.log(name)
    }
    function handleSubmit(e) {
        e.preventDefault();

        if (name.length === 0) {
          return alert ("Vuelva a ingresar de nuevo");
        }else {

        } dispatch(getBreed(name));
        setName("")



       
        // despachamos la action con el name el cual es name va ser mi estado local que escribe el usuario
    };

   /* const OnClickAll = () => {
        AllDogs()
        setName({
            buscar: ''
        });
    }*/
    function OnClickAll(e){
        e.preventDefault()
        dispatch(AllDogs())
    }
  

    return(
        <div className="searchbar_container">
            <input
            className="searchbar"
             type='text' 
            placeholder='Buscar...'
            value={name}
            onChange={e => handleChange(e)}
             ></input>


            <button className="searchbar_button" type='submit' onClick={handleSubmit} >Buscar</button>
            <button className="searchbar_button" onClick={OnClickAll}>Recargar</button>
        </div>
    )
};

export default SearchBar;

















/*
function SearchBar({getBreed , AllDogs}){

    const [searchDog, setSearchDog] = useState({buscar:''})

    const InputChange = function(e) {
        searchDog({
        [e.target.name]: e.target.value
      });
  }

  const OnClick = () => {
    getBreed(searchDog.buscar)
    searchDog({
          buscar: ''
      });
  }

  const OnClickAll = () => {
    AllDogs()
    setSearchDog({
          buscar: ''
      });
  }


return (
    <div class="buscar">
        <input className="bar-btn"
          name="buscar"
          placeholder="Buscá tu Raza.."
          onChange={InputChange}
          type='text'
          autoComplete="off"></input>
        <button  className="btn" onClick={OnClick}>Buscar</button>
        <button className="btn" onClick={OnClickAll}>Recargar</button>

    </div>
    

)

}

export default connect(null, {getBreed ,AllDogs})(SearchBar)*/















/*
export default function SearchBar() {

    const dispatch = useDispatch();
    const [searchDog, setSearchDog] = useState("");

    const handleInput = (e) => {
        e.preventDefault()
        setSearchDog(e.target.value)
        console.log(searchDog)
    }
  
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getBreed(searchDog));
        
    }

    const OnClickAll = () => {
        AllDogs()
    
        setSearchDog({
            buscar: ''
        });
    }
  



    return(
        <div className="searchbar_container">
            <input className="searchbar" type="text" onChange={handleInput} placeholder="Busca tu Raza..."/>
            <button className="searchbar_button" type="submit" onClick={handleSubmit}>
  Buscar
            </button>
            <button className="btn" onClick={OnClickAll}>Recargar</button>
        </div>
    )
}

*/


/*

export default function SearchBar() {
    const [search, setSearch] = useState("");
  
    const dispatch = useDispatch();
  
    // async await me trae el estado actualizado, si no me trae "Houn" en vez de "Hound"
    const handleChange = async (e) => {
      await setSearch(e.target.value);
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(getBreed(search));
      setSearch("");
    };
    const dogers = useSelector((state) => state.allDogs);
  
    return (
      <div className="search">
        <form>
          <select
            className="input"
            type="text"
            value={search}
            onChange={(e) => handleChange(e)}
          >
            {dogers?.map((d) => {
              return <option value={d.name}>{d.name}</option>;
            })}
          </select>
          <button
            className="button"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Search
          </button>
        </form>
      </div>
    );
  }
  
  module.export = SearchBar;*/