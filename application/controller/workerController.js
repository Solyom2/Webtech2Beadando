const express = require("express");
var router = express.Router();

const service = require("../service/workerService");

router.get("/listOrders", (req, res) => {
    service.listOrders((response) => {
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

module.exports = router;