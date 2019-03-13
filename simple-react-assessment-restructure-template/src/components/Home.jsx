import React, { Component } from "react";
import FormContainer from "./FormContainer";
import Transactions from "./Transactions";
import EditTransaction from "./EditTransaction";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

class Home extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collpase nav-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">
                    Create Record
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/view" className="nav-link">
                    View Transactions
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <Route path="/" exact component={FormContainer} />
          <Route path="/view" exact component={Transactions} />
          <Route path="/edit/:id" component={EditTransaction} />
        </div>
      </Router>
    );
  }
}

export default Home;
