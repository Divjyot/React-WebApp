const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 4000;

const crypRoutes = express.Router();
let Cryp = require("./simplereact.model");

app.use(cors());
app.use(bodyParser.json());

// uri of mongodb
mongoose.connect("mongodb://127.0.0.1:27017/simplereact", {
  useNewUrlParser: true
});

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB  database connection established successfully!");
});

crypRoutes.route("/").get(function(req, res) {
  Cryp.find(function(err, transac) {
    if (err) {
      console.log(err);
    } else {
      console.log("JSON" + transac);
      res.json(transac);
    }
  });
});

crypRoutes.route("/:id").get(function(req, res) {
  let id = req.params.id;
  Cryp.findById(id, function(err, transac) {
    res.json(transac);
  });
});

crypRoutes.route("/add").post(function(req, res) {
  let crypTransaction = new Cryp(req.body);
  crypTransaction
    .save()
    .then(crypTransaction => {
      res.status(200).json({ transac: "transaction added successfully" });
    })
    .catch(err => {
      res.status(400).send(" adding new transaction failed");
    });
});

// todo :
crypRoutes.route("/addupdate").post(function(req, res) {
  Cryp.find({ cryptocurrency_name: req.body.cryptocurrency_name }, function(
    err,
    cryp
  ) {
    if (!cryp) {
      // Add new record
      res.status(404).send("data is not found");
    } else {
      // update exisitng
      console.log("CRYPP :" + cryp);

      cryp.cryptocurrency_units = req.body.cryptocurrency_units;
      cryp.cryptocurrency_price.push(req.body.cryptocurrency_price);

      cryp
        .save()
        .then(cryp => {
          res.json("Crypto Transaction updated!");
        })
        .catch(err => {
          res.status(400).send("Update not possible");
        });
    }
  });
});

crypRoutes.route("/update/:id").post(function(req, res) {
  Cryp.findById(req.params.id, function(err, cryp) {
    if (!cryp) res.status(404).send("data is not found");
    else cryp.cryptocurrency_name = req.body.cryptocurrency_name;
    cryp.cryptocurrency_units = req.body.cryptocurrency_units;
    cryp.cryptocurrency_price = req.body.cryptocurrency_price;
    cryp
      .save()
      .then(cryp => {
        res.json("Crypto Transaction updated!");
      })
      .catch(err => {
        res.status(400).send("Update not possible");
      });
  });
});

crypRoutes.route("/delete/:id").post(function(req, res, next) {
  Cryp.deleteOne({ _id: req.params.id }, (error, cryp) => {
    if (!cryp) res.status(404).send("Error: Transaction data not found");
    else {
      res.send(cryp);
    }
  });
});

// Base route : '/cryp'
app.use("/cryp", crypRoutes);

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});

//Aggregation function
var getSumTotalPaid = function(name) {
  Cryp.aggregate(
    aggregate([
      { $group: { _cryptocurrency_name: "$name", same_qty: { $sum: 1 } } }
    ]),
    function(err, result) {
      if (err) {
        console.log(err);
        return;
      }
      console.log(result);
    }
  );
};
