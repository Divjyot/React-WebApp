import React, { Component } from "react";

/* Import Components */
import Input from "./Input";
import Button from "./Button";
import axios from "axios";
class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.onChangeCrypName = this.onChangeCrypName.bind(this);
    this.onChangeCrypUnits = this.onChangeCrypUnits.bind(this);
    this.onChangeCrypPrice = this.onChangeCrypPrice.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.state = {
      cryptocurrency_name: "",
      cryptocurrency_units: "",
      cryptocurrency_price: ""
    };
  }
  onChangeCrypName(e) {
    this.setState({
      cryptocurrency_name: e.target.value
    });
  }

  onChangeCrypUnits(e) {
    this.setState({
      cryptocurrency_units: e.target.value
    });
  }

  onChangeCrypPrice(e) {
    this.setState({
      cryptocurrency_price: e.target.value
    });
  }
  render() {
    return (
      <React.Fragment>
        <ColoredLine color="blue" />
        <div>
          <h3>Create a Record</h3>
        </div>
        <ColoredLine color="blue" />
        <form className="container" onSubmit={this.handleFormSubmit}>
          {/* Name of the cryptocurrency purchased. */}
          <Input
            title="Cryptocurrency Name"
            name="CryptocurrencyName"
            type="text"
            placeholder="Enter cryptocurrency name"
            handleChange={this.onChangeCrypName}
            value={this.state.cryptocurrency_name}
          />
          {/* Input units purchased. */}
          <Input
            title="Units Purchased"
            name="CryptocurrencyUnits"
            type="number"
            placeholder="Enter how many units purchased"
            handleChange={this.onChangeCrypUnits}
            value={this.state.cryptocurrency_units}
          />
          {/* Input Total Price of purchased cryptocurrency */}
          <Input
            title="Price (AUD)"
            name="CryptocurrencyPrice"
            type="number"
            placeholder="Enter the total price paid"
            handleChange={this.onChangeCrypPrice}
            value={this.state.cryptocurrency_price}
          />
          {/*Submit */}
          <Button title="Save Record" type="primary" /> {/*Submit */}
          {/*View transaction details */}
        </form>
      </React.Fragment>
    );
  }

  handleFormSubmit(e) {
    // Form submission logic to save the transaction to db
    e.preventDefault();
    if (this.isAnyFieldEmpty()) {
      alert("Please fill all fields");
      return;
    }

    const data = new FormData(e.target);
    const CrypName = data.get("CryptocurrencyName");
    const CrypUnits = data.get("CryptocurrencyUnits");
    const CrypPrice = data.get("CryptocurrencyPrice");

    const newTransaction = {
      cryptocurrency_name: this.state.cryptocurrency_name,
      cryptocurrency_units: this.state.cryptocurrency_units,
      cryptocurrency_price: this.state.cryptocurrency_price
    };

    axios
      .post("http://localhost:4000/cryp/add", newTransaction)
      .then(res => console.log("Transaction addition response: " + res.data));

    this.setState({
      cryptocurrency_name: "",
      cryptocurrency_units: "",
      cryptocurrency_price: ""
    });

    // A check to see if the was error in saving the record or not.
    // If successfull, than show alert "Record Saved" else alert "Error while saving"
    alert("Record saved!");
  }
  isAnyFieldEmpty() {
    return (
      this.state.cryptocurrency_name === "" ||
      this.state.cryptocurrency_name === null ||
      this.state.cryptocurrency_price === "" ||
      this.state.cryptocurrency_price === null ||
      this.state.cryptocurrency_units === "" ||
      this.state.cryptocurrency_units === null
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
export default FormContainer;
