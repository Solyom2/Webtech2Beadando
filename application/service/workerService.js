const dao = require("../dao/workerDao");

function listOrders(callback) {
    dao.listOrders((orders) => {
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
    listOrders, listParts, assembleShutter
}