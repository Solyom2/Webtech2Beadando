const express = require("express");
var router = express.Router();

const service = require("../service/workerService");

router.get("/listUnassembledOrders", (req, res) => {
    service.listUnassembledOrders((response) => {
            res.status(200).send(response);
        },
        (cause) => {
            res.status(400).send(cause);
        })
});

router.get("/listParts", (req, res) => {
    if(req.query.id) {
        service.listParts(req.query.id,
            (response) => {
                res.status(200).send(response);
            },
            (cause) => {
                res.status(400).send(cause);
            });
    }
    else {
        res.status(400).send("Wrong ID");
    }
});

router.post("/assembleShutter", (req, res) => {
    if(req.body.id) {
        service.assembleShutter(req.body.id,
            () => {
                res.status(200).send("Shutter assembled")
            },
            (cause) => {
                res.status(400).send(cause)
            });
    }
    else {
        res.status(400).send("Wrong ID");
    }
});

module.exports = router;