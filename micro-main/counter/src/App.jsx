import React from "react";
import ReactDOM from "react-dom";
import { CarList } from "./components/CarList";

import "./index.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";

const App = () => (
  <div className="container">
      <Routes>
          <Route exact path="/" element={<CarList/>}/>
      </Routes>
  </div>
);
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("app"));
