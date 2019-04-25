const express = require("express");

var app = express();
const port = 8080;

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

const customerController = require("./controller/customerController");
app.use("/", customerController);


app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
