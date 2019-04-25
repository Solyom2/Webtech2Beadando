const express = require("express");
var router = express.Router();

const service = require("../service/customerService");

router.post("/createOrder", (req, res) => {
    console.log(req.body);
    service.createOrder(
        {
            id: req.body['id'],
            customername: req.body['customername'],
            address: req.body['address'],
            windowlength: req.body['windowlength'],
            windowwidth: req.body['windowwidth'],
            shuttertype: req.body['shuttertype'],
            shuttercolor: req.body['shuttercolor'],
            quantity: req.body['quantity'],
            paid: false
        },
    /*service.createOrder(
        {
            customername: req.query.customername,
            address: req.query.address,
            windowlength: req.query.windowlength,
            windowwidth: req.query.windowwidth,
            shuttertype: req.query.shuttertype,
            shuttercolor: req.query.shuttercolor,
            quantity: req.query.quantity
        },*/
        () => {
            res.status(200).send("Order processed!")
        })
})

module.exports = router;


