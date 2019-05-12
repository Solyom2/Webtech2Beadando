const express = require("express");
var router = express.Router();
const {check, validationResult} = require('express-validator/check');
const logger = require("../config/logger");

const cs = require("../service/customerService");
const service = new cs();

router.post("/createOrder", [
    check("order.customername").not().isEmpty(),
    check("order.address").not().isEmpty(),
    check("order.windowlength").not().isEmpty(),
    check("order.windowwidth").not().isEmpty(),
    check("order.shuttertype").not().isEmpty(),
    check("order.shuttercolor").not().isEmpty(),
    check("order.quantity").not().isEmpty(),

    check("order.customername").isString(),
    check("order.address").isString(),
    check("order.windowlength").isInt(),
    check("order.windowwidth").isInt(),
    check("order.shuttertype").isString(),
    check("order.shuttercolor").isString(),
    check("order.quantity").isInt()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("hiba");
        res.status(400).json({errors: errors.array()});
    }
    else {
        logger.info(`/createOrder Query: ${JSON.stringify(req.body)}`);
        service.createOrder(
            {
                customername: req.body.order.customername,
                address: req.body.order.address,
                windowlength: parseInt(req.body.order.windowlength),
                windowwidth: parseInt(req.body.order.windowwidth),
                shuttertype: req.body.order.shuttertype,
                shuttercolor: req.body.order.shuttercolor,
                quantity: parseInt(req.body.order.quantity),
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
        console.log("hiba");
        res.status(400).json({errors: errors.array()});
    }
    else {
        logger.info(`/listOwnOrders Query: ${JSON.stringify(req.body)}`);
        service.listOwnOrders(req.query.customername,
            (response) => {
                logger.info(`/listOwnOrders response: ${JSON.stringify(response)}`);
                res.status(200).send(response);
            });
    }
});

router.post("/payOrder", [
    check("_id").not().isEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
    }
    else {
        logger.info(`/payOrder Query: ${JSON.stringify(req.body)}`);
        service.payOrder(req.body._id,
            () => {
                res.status(200).send("Payment arrived")
            },
            (cause) => {
                res.status(400).send(cause)
            });
    }
});

module.exports = router;


