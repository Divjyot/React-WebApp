import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "./Button";

const Transaction = props => (
  <tr>
    <td>{props.transaction.cryptocurrency_name}</td>
    <td>{props.transaction.cryptocurrency_units}</td>
    <td>{props.transaction.cryptocurrency_price}</td>
    <td>
      <Link
        className="btn btn-outline-primary btn-sm"
        to={"/edit/" + props.transaction._id}
      >
        Edit
      </Link>
    </td>
    <td>
      <button
        className="btn btn-outline-danger btn-sm"
        onClick={i => this.handleDeleteRow(i)}
      >
        Delete
      </button>
    </td>
  </tr>
);

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = { crypTransactions: [], totalpaid: 0 };
  }

  componentDidMount() {
    console.log("component did mount called");
    axios
      .get("http://localhost:4000/cryp/")
      .then(response => {
        this.setState({ crypTransactions: response.data });
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  getTotalSumPaid() {
    var SumValue = 0;
    this.state.crypTransactions.forEach(element => {
      SumValue = SumValue + element.cryptocurrency_price;
    });
    this.totalpaid = SumValue;
    console.log("Sume  : " + SumValue);
    return SumValue;
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(" component did update called");
    // Warning: below is called infinitely
    // if (prevState.crypTransactions != this.crypTransactions) {
    //   console.log("Different");
    //   axios
    //     .get("http://localhost:4000/cryp/")
    //     .then(response => {
    //       this.setState({ crypTransactions: response.data });
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    // }
  }

  crypTransactionList() {
    return this.state.crypTransactions.map(function(currentTransac, i) {
      return <Transaction transaction={currentTransac} key={i} />;
    });
  }

  handleRemoveSpecificRow = idx => () => {
    const rows = [...this.state.crypTransactions];
    rows.splice(idx, 1);
    this.setState({ rows });

    axios
      .post(
        "http://localhost:4000/cryp/delete/" +
          this.state.crypTransactions[idx]._id
      )
      .then(res => console.log(res.data), this.updateView());
  };

  updateView() {
    axios
      .get("http://localhost:4000/cryp/")
      .then(response => {
        this.setState({ crypTransactions: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <React.Fragment>
        <ColoredLine color="blue" />
        <div>
          <h3>Cryptocurrency Records</h3>
          <ColoredLine color="blue" />
          {this.state.crypTransactions.forEach(element => {})}
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Units</th>
                <th>Price (AUD)</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {this.state.crypTransactions.map((item, idx) => (
                <tr>
                  <td>
                    {this.state.crypTransactions[idx].cryptocurrency_name}
                  </td>
                  <td align="left">
                    {this.state.crypTransactions[idx].cryptocurrency_units}
                  </td>
                  <td align="left">
                    {this.state.crypTransactions[idx].cryptocurrency_price}
                  </td>

                  <td>
                    <Link
                      className="btn btn-primary btn-sm"
                      to={"/edit/" + this.state.crypTransactions[idx]._id}
                    >
                      Edit
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={this.handleRemoveSpecificRow(idx)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ColoredLine color="black" />
          <label style={{ fontSize: 25, fontWeight: "bold" }} marginTop="10px">
            Total price paid for all cryptocurrencies is{" "}
            {this.getTotalSumPaid()} AUD.
          </label>
        </div>
      </React.Fragment>
    );
  }
}
const ColoredLine = ({ color, height }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: height
    }}
  />
);
export default Transactions;
