const dao = require("../dao/managerDao");

function listAllOrder(callback) {
    dao.listAllOrder((orders) => {
        callback(orders);
    });
}

function listReadyOrders(callback) {
    dao.listReadyOrders((orders) => {
        callback(orders);
    });
}

function checkPayments(callback) {
    dao.checkPayments((orders) => {
        callback(orders);
    });
}

function arrangeInstallation(data, callback) {
    dao.arrangeInstallation(data, (response) => {
        callback(response);
    });
}

module.exports = {
    listAllOrder,
    listReadyOrders,
    checkPayments,
    arrangeInstallation
}