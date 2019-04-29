const express = require("express");
var router = express.Router();

const service = require("../service/customerService");

router.post("/createOrder", (req, res) => {
    console.log(req.body);
    service.createOrder(
        {
            id: req.body.id,
            customername: req.body.customername,
            address: req.body.address,
            windowlength: req.body.windowlength,
            windowwidth: req.body.windowwidth,
            shuttertype: req.body.shuttertype,
            shuttercolor: req.body.shuttercolor,
            quantity: req.body.quantity,
            assembled: false
        },
        () => {
            res.status(200).send("Order processed!")
        })
})

router.get("/listOwnOrders", (req, res) => {
    if(req.query.customername) {
        service.listOwnOrders(req.query.customername,
            (response) => {
                res.status(200).send(response);
            },
            (cause) => {
                res.status(400).send(cause);
            });
    }
    else {
        res.status(400).send("Wrong name");
    }
});

module.exports = router;


