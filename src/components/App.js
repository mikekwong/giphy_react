import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ResultDetail from "./Results/ResultDetail";
import Main from "./Main/Main";

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={Main} />
      <Route exact path="/gifs/:id" component={ResultDetail} />
    </Router>
  );
};

export default App;
