const express = require("express");
var router = express.Router();
const {check, validationResult} = require('express-validator/check');

const ws = require("../service/workerService");
const service = new ws();

router.get("/listUnassembledOrders", (req, res) => {
    service.listUnassembledOrders((response) => {
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
        service.listParts(req.query._id,
            (response) => {
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