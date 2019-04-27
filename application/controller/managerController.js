const express = require("express");
var router = express.Router();

const service = require("../service/managerService");

router.get("/listAllOrder", (req, res) => {
    service.listAllOrder((response) => {
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

module.exports = router;