import {ALL_DOGS,BREED,DOG_DETAILS} from "../Action/constantes"



const intialState = {
  dogs: [],
  temperaments: [],
  allDogs: [],
  details: [],
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



    default:
      return state;
  }
};

export default rootReducer;
