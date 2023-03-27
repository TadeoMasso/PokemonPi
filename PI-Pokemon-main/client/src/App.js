import './App.css';
import LandinPage from "./Components/Landing-page/landing-page.jsx"
import Home from "./Components/Home-page/home-page.jsx"
import Detail from "./Components/Detail-page/detail-page.jsx"
import PokeForm from "./Components/Form-page/form-page.jsx"
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  

  return (
    <BrowserRouter>
    <div className="App">
      
      <Switch>
        <Route exact path ="/" component={LandinPage}/>
        <Route path = "/home" component={Home}/>
        <Route path ="/pokecreator" component={PokeForm}/>
        <Route path="/id/:id"  component={Detail}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
