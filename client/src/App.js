import './App.css';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import About from "../src/components/About/About.jsx";
import Landing from "../src/components/Landing/Landing.jsx";
import CrearDog from "../src/components/CrearDog/CrearDog.jsx";
import Dogs from "../src/components/Dogs/Dogs.jsx";
import DogDetails from "../src/components/DogDetails/DogDetails.jsx";
import Page404 from "../src/components/Page404/Page404.jsx";



function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/dogs" component={Dogs} />
      <Route exact path="/crearDog" component={CrearDog} />
      <Route exact path="/dogdetail/:id" component={DogDetails} />
      <Route exact path="/about" component={About} />
      <Route exact path="*" component={Page404} />
    </Switch>
  </BrowserRouter>
  );
}

export default App;
