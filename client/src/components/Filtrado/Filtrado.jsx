import React from "react";
import { useState} from "react";
import { useDispatch ,useSelector} from "react-redux";
import { FilterTemperament,OrderName,OrderWeight,FiltradoApiDb } from "../../redux/Action/index";
import "./Filtrado.css"





export default function Filtrado(){

    const dispatch = useDispatch();
    const allTemperaments = useSelector(state => state.temperaments);
    const [orden, setOrden] = useState("");
    //const page1 = useSelector((state) => state.page);




    const FilterTemperaments = (e) => {
        e.preventDefault();    
        dispatch(FilterTemperament(e.target.value));
      };
    
      const OrderByNames = (e) => {
        e.preventDefault();
        dispatch(OrderName(e.target.value));
        setOrden(`Ordenado ${e.target.value}`);
      };
    
      const OrderByWeights = (e) => {
        e.preventDefault();
        dispatch(OrderWeight(e.target.value));
        setOrden(`Ordenado ${e.target.value}`);
      };

     

function handleCreated(e) {
  dispatch(FiltradoApiDb(e.target.value));

};




    return(
        <div className="container_filters">
        <select onChange={OrderByNames}>
          <option disabled selected defaultValue>
           Orden Alfabetico
          </option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>

        <select onChange={OrderByWeights}>
          <option disabled selected defaultValue>
            Filtrar por peso
          </option>
          <option value="max_weight">Max</option>
          <option value="min_weight">Min</option>
        </select>

        <select onChange={FilterTemperaments}>
            <option disabled selected defaultValue>Temperamentos</option>
            <option value="Todos">All</option>
            {
              allTemperaments?.map(temp => (
                  <option value={temp.name}  key={temp.id}>{temp.name}</option>
              ))
            }
        </select>
        <select onChange={e => handleCreated(e)}>
          <option value="All">Todos</option>
          <option value="Created">Db</option>
          <option value="Api">Api</option>
        </select>

      </div>
    )
}

