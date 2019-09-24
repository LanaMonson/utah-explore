import React, { Component } from "react";
import "./App.css";
import Admin from "./Admin";
import Home from "./Home";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class App extends Component {
  state = {
    image: []
  };

  render() {
    console.log("data", this.state);
    return (
      <Router>
        <div>
          <nav className="navbar navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">
              EXPLORE Utah
            </Link>
            <Link className="navbar-brand" to="/admin/">
              Manage Images
            </Link>
          </nav>

          <Route path="/" exact component={Home} />
          <Route path="/admin/" component={Admin} />
        </div>
      </Router>
    );
  }
}
