const express = require("express");
const bodyParser = require('body-parser');

var app = express();
const port = 8080;

var dao = require("./dao/shutterDao");

app.use(bodyParser.json());


app.listen(port, () => {
    dao.list();
    console.log(`Server is listening on ${port}`);
});
