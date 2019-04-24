const express = require("express");
var router = express.Router();

const service = require("../service/customerService");

router.get("/createOrder", (req, res) => {
    console.log(req.body);
    service.createOrder(
        {
            customername: req.body.customername,
            address: req.body.address,
            windowlength: req.body.windowlength,
            windowwidth: req.body.windowwidth,
            shuttertype: req.body.shuttertype,
            shuttercolor: req.body.shuttercolor,
            quantity: req.body.quantity
        },
        () => {
            res.status(200).send("Order processed!")
        })
})

module.exports = router;


