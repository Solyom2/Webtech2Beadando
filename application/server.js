const express = require("express");
const approot = require("app-root-path");

var app = express();
const port = 8080;

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

const customerController = require("./controller/customerController");
const workerController = require("./controller/workerController");
app.use("/", customerController);
//app.use("/", workerController);

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
