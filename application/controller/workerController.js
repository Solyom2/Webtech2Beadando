const express = require("express");
var router = express.Router();
const {check, validationResult} = require("express-validator/check");
const logger = require("../config/logger");

const ws = require("../service/workerService");
const service = new ws();

router.get("/listUnassembledOrders", (req, res) => {
    logger.info(`/ listUnassambledOrders Query: ${JSON.stringify(req.query)}`);
    service.listUnassembledOrders((response) => {
            logger.info(`/ listUnassambledOrders Response: ${JSON.stringify(response)}`);
            res.status(200).send(response);
        },
        (cause) => {
            res.status(400).send(cause);
        })
});

router.get("/listParts", [
    check("_id").not().isEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
    }
    else {
        logger.info(`/ listParts Query: ${JSON.stringify(req.query)}`);
        service.listParts(req.query._id,
            (response) => {
                logger.info(`/ listParts Response: ${JSON.stringify(response)}`);
                res.status(200).send(response);
            },
            (cause) => {
                res.status(400).send(cause);
        });
    }

});

router.post("/assembleShutter", [
    check("_id").not().isEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
    }
    else {
        logger.info(`/assembleShutter Query: ${JSON.stringify(req.body)}`);
        service.assembleShutter(req.body._id,
            () => {
                res.status(200).send("Shutter assembled")
            },
            (cause) => {
                res.status(400).send(cause)
            });
    }
});

module.exports = router;