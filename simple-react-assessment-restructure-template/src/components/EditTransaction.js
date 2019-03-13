import React, { Component } from "react";
import axios from "axios";
import Button from "./Button";
import Input from "./Input";
export default class EditTransaction extends Component {
  constructor(props) {
    super(props);

    this.onChangeCrypName = this.onChangeCrypName.bind(this);
    this.onChangeCrypUnits = this.onChangeCrypUnits.bind(this);
    this.onChangeCrypPrice = this.onChangeCrypPrice.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      cryptocurrency_name: "",
      cryptocurrency_units: "",
      cryptocurrency_price: ""
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/cryp/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          cryptocurrency_name: response.data.cryptocurrency_name,
          cryptocurrency_units: response.data.cryptocurrency_units,
          cryptocurrency_price: response.data.cryptocurrency_price
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    return (
      <React.Fragment>
        <form className="container" onSubmit={this.onSubmit}>
          {/* Name of the cryptocurrency purchased. */}
          <Input
            title="Name"
            name="CryptocurrencyName"
            type="text"
            placeholder="Enter cryptocurrency name"
            handleChange={this.onChangeCrypName}
            value={this.state.cryptocurrency_name}
          />
          <Input
            title="Units"
            name="CryptocurrencyUnits"
            type="number"
            placeholder="Enter how many units purchased"
            handleChange={this.onChangeCrypUnits}
            value={this.state.cryptocurrency_units}
          />
          <Input
            title="Price"
            name="CryptocurrencyPrice"
            type="number"
            placeholder="Enter the total price paid"
            handleChange={this.onChangeCrypPrice}
            value={this.state.cryptocurrency_price}
          />

          <Button title="Update" type="primary" />
        </form>
      </React.Fragment>
    );
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      cryptocurrency_name: this.state.cryptocurrency_name,
      cryptocurrency_units: this.state.cryptocurrency_units,
      cryptocurrency_price: this.state.cryptocurrency_price
    };
    console.log(this.state.cryptocurrency_price);
    axios
      .post(
        "http://localhost:4000/cryp/update/" + this.props.match.params.id,
        obj
      )
      .then(res => console.log(res.data));
    alert("Record updated");
    this.props.history.push("/");
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
}
