import React from "react";
import { Route, Link } from "react-router-dom";
import Home from "../home";
import Project from "../project";
// import RcTabs from '../home/RcTabs'
const App = () => (
  <div>
    <header>
      <Link to="/">Home</Link>
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/:id" component={Project} />
    </main>
  </div>
);

export default App;
