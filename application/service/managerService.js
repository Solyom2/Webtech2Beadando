const dao = require("../dao/managerDao");

function listAllOrder(callback) {
    dao.listAllOrder((orders) => {
        callback(orders);
    });
}

function arrangeInstallation(data, callback) {
    dao.arrangeInstallation(data, (response) => {
        callback(response);
    });
}

module.exports = {
    listAllOrder, arrangeInstallation
}