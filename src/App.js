import './App.css';
import Navbar from "./components/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
  return (
      <div>
      <BrowserRouter>
      <Navbar/>
          <Routes>

              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} exact/>
              <Route path="/register" element={<Register/>} exact/>
          </Routes>
      </BrowserRouter>
      </div>
  );
}

export default App;
