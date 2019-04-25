const dao = require("../dao/workerDao");

function listOrders(callback) {
    dao.listOrders((orders) => {
        callback(orders);
    });
}

function listParts(id, callback) {
    dao.listParts(id, (result) => {
        callback(result)
    })
}

module.exports = {
    listOrders, listParts
}