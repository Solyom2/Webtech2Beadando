const dao = require("../dao/workerDao");

function listUnassembledOrders(callback) {
    dao.listUnassembledOrders((orders) => {
        callback(orders);
    });
}

function listParts(id, callback) {
    dao.listParts(id, (result) => {
        callback(result);
    })
}

function assembleShutter(id, callback) {
    dao.assembleShutter(id, (response) => {
        callback(response);
    })
}

module.exports = {
    listUnassembledOrders,
    listParts,
    assembleShutter
}