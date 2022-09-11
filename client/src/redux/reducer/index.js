import {ALL_DOGS,GET_TEMPERAMENTS,BREED,DOG_DETAILS,FILTER_TEMPERAMENTS,ORDER_NAME,ORDER_WEIGHT,FILTRADO_API_DB,SAVE_PAGE} from "../Action/constantes"



const intialState = {
  dogs: [],
  temperaments: [],
  allDogs: [],
  details: [],
  filteredDogs:[],
  page:1,
 

};

const rootReducer = (state = intialState, action) => {
  switch (action.type) {
    case ALL_DOGS:
      action.payload.forEach((element) => {
        if (!element.temperaments[0]) {
          element.temperaments[0] = "no-temperaments"; //eliminamos arreglos vacios de temperamentos
        }
      });
      
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };
      case BREED:
        return {
          ...state,
          dogs: action.payload,
        };
        case DOG_DETAILS:
      let myDetails = action.payload
      if (!myDetails[0].temperaments[0]) { //agregamos "no-temperaments" a arreglos sin elementos dentro
        myDetails[0].temperaments[0] = "no-temperaments"
      }
      return {
        ...state,
        details: myDetails
      };

      case GET_TEMPERAMENTS:
        const filteresTemp = action.payload.filter((temp) => temp.name !== ""); //eliminar razas con strings vacios
        return {
          ...state,
          temperaments: filteresTemp,
        };
  
      case FILTER_TEMPERAMENTS:
        const allDogs = state.allDogs;
        let filteredDogs = [];
        if (action.payload === "Todos") {
          filteredDogs = allDogs;
        } else {
          for (let i = 0; i < allDogs.length; i++) {
            let found = allDogs[i].temperaments.find((t) => t === action.payload);
            if (found) {
              filteredDogs.push(allDogs[i]);
            } //todos los perros en la posicion de ese momento
          }
        }
        return {
          //return funciona correcto
          ...state,
          dogs: filteredDogs,
        };
        case ORDER_NAME:
          const orderName = action.payload === 'Asc' ? //compara y ordena izq y derecha
          state.dogs.sort(function(a, b) { // sort metodo de ordenamiento 
              if(a.name > b.name) {  // compara el valor y retorna esa posicion
                  return 1;
              }
              if(b.name > a.name) {
                  return -1;
              }
              return 0;       // si son iguales los deja como esta
          }) :

          //Descendente
          state.dogs.sort(function(a, b) {
              if(a.name > b.name) {
                  return -1;
              }
              if(b.name > a.name) {
                  return 1;
              }
              return 0;
          });
          return {
              ...state,
              dogs: orderName
          }

        case ORDER_WEIGHT:
          const sortedWeight =
            action.payload === "min_weight"
              ? state.dogs.sort((a, b) => {
                  if (parseInt(a.weight[1]) > parseInt(b.weight[1])) {
                    return 1;
                  }
                  if (parseInt(b.weight[1]) > parseInt(a.weight[1])) {
                    return -1;
                  }
                  return 0;
                })
              : state.dogs.sort((a, b) => {
                  if (parseInt(a.weight[1]) > parseInt(b.weight[1])) {
                    return -1;
                  }
                  if (parseInt(b.weight[1]) > parseInt(a.weight[1])) {
                    return 1;
                  }
                  return 0;
                });
          return {
            ...state,
            dogs: sortedWeight,
          };

          case FILTRADO_API_DB:
            //const allCharacters2 = state.allCharacters
            const createdFilter = action.payload === 'Created' ? state.allDogs.filter(i => i.createdInDb) : state.allDogs.filter(i => !i.createdInDb)
            return {
                ...state,
                dogs: action.payload === 'All' ? state.allDogs : createdFilter
            }
            case SAVE_PAGE:
              return{
                ...state,
                page:action.payload
              }
            
                 
                      

    default:
      return state;
  }
};

export default rootReducer;
