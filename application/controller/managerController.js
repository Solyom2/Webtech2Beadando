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

router.post('/arrangeInstallation', (req, res) => {
    if (req.body.id) {
        if (req.body.worker) {
            if (req.body.appointment) {
                        service.arrangeInstallation({
                                id: req.body.id,
                                worker: req.body.worker,
                                appointment: req.body.appointment
                            },
                            () => {
                                res.status(200).send("Installation organized!")
                            },
                            (cause) => {
                                res.status(400).send(cause)
                            });
                    } else
                        res.status(400).send('Wrong appointment');
        } else
            res.status(400).send('Wrong worker');
    } else
        res.status(400).send('Wrong ID');
});

router.get('/createInvoice', [
    check("customername").isString()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
    }
    else {
        service.createInvoice(
            req.query.customername,
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