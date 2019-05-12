const express = require("express");
var router = express.Router();
const {check, validationResult} = require('express-validator/check');
const logger = require("../config/logger");

const ms = require("../service/managerService");
const service = new ms();

router.get("/listAllOrder", (req, res) => {
    logger.info(`/ listAllOrder Query: ${JSON.stringify(req.query)}`);
    service.listAllOrder((response) => {
            logger.info(`/ listAllOrder Response: ${JSON.stringify(response)}`);
            res.status(200).send(response);
        },
        (cause) => {
            res.status(400).send(cause);
        })
});

router.get("/listReadyOrders", (req, res) => {
    logger.info(`/listReadyOrders Query: ${JSON.stringify(req.query)}`);
    service.listReadyOrders((response) => {
            logger.info(`/ listReadyORders Response: ${JSON.stringify(response)}`);
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
        logger.info(`/ArrangeInstallation request: ${JSON.stringify(req.body)}`);
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
        logger.info(`/createInvoice Query: ${JSON.stringify(req.query)}`);
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

router.get('/checkStatistics',(req, res) => {
        logger.info(`/checkStatistics Query: ${JSON.stringify(req.query)}`);
        service.checkStatistics((response) => {
                res.status(200).send(response);
            },
            (cause) => {
                res.status(400).send(cause);
            })
});

module.exports = router;