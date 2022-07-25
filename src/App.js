// ? Libraries
import React, { useState } from "react";
// import axios from "axios";

// import Celsius from "./components/celsius.js";
import Location from "./components/location.js";

import "bulma";
import "./styles/style.scss";

const App = () => {
  return (
    <main>
      <h1>Is it BBQ weather?</h1>
      <Location />
    </main>
  );
};
export default App;
