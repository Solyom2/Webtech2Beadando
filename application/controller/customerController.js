const express = require("express");
var router = express.Router();
const {check, validationResult} = require('express-validator/check');

const service = require("../service/customerService");

router.post("/createOrder", [
    check("id").not().isEmpty(),
    check("customername").not().isEmpty(),
    check("address").not().isEmpty(),
    check("windowlength").not().isEmpty(),
    check("windowwidth").not().isEmpty(),
    check("shuttertype").not().isEmpty(),
    check("shuttercolor").not().isEmpty(),
    check("quantity").not().isEmpty(),

    check("id").isInt(),
    check("customername").isString(),
    check("address").isString(),
    check("windowlength").isInt(),
    check("windowwidth").isInt(),
    check("shuttertype").isString(),
    check("shuttercolor").isString(),
    check("quantity").isInt()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
    }
    else {
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
    }

});

router.get("/listOwnOrders", [
    check("customername").not().isEmpty(),
    check("customername").not().isNumeric(),
    check("customername").isString()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
    }
    else {
        service.listOwnOrders(req.query.customername,
            (response) => {
                res.status(200).send(response);
            });
    }
});

module.exports = router;


