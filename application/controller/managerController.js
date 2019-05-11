const express = require("express");
var router = express.Router();
const {check, validationResult} = require('express-validator/check');

const service = require("../service/managerService");

router.get("/listAllOrder", (req, res) => {
    service.listAllOrder((response) => {
            res.status(200).send(response);
        },
        (cause) => {
            res.status(400).send(cause);
        })
});

router.get("/listReadyOrders", (req, res) => {
    service.listReadyOrders((response) => {
            res.status(200).send(response);
        },
        (cause) => {
            res.status(400).send(cause);
        })
});

router.get("/checkPayments", (req, res) => {
    service.checkPayments((response) => {
            res.status(200).send(response);
        },
        (cause) => {
            res.status(400).send(cause);
        })
});

router.post('/arrangeInstallation', [
    check("_id").not().isEmpty(),
    check("worker").not().isEmpty(),
    check("appointment").not().isEmpty(),
    check("worker").isString(),
    check("appointment").isString()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
    }
    else {
        service.arrangeInstallation({
                _id: req.body._id,
                worker: req.body.worker,
                appointment: req.body.appointment
            },
            () => {
                res.status(200).send("Installation organized!")
            },
            (cause) => {
                res.status(400).send(cause)
            });
    }
});

router.get('/createInvoice', [
    check("_id").not().isEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
    }
    else {
        service.createInvoice(
            req.query._id,
            (success) => {
                if (success === true) {
                    res.status(200).send("Invoice Created")
                } else if (success === false) {
                    res.status(400).send("Error");
                }
            });
    }
});

module.exports = router;