import './App.css';
import Navbar from "./components/Navbar";
import {BrowserRouter} from "react-router-dom";
import SearchComponent from "./components/Search/Search";
import Home from "./pages/Home/Home";

function App() {
  return (
      <BrowserRouter>
      <Navbar/>
          <Home/>
      </BrowserRouter>
  );
}

export default App;
