const dao = require("../dao/customerDao");

function createOrder(order, callback) {
    //sends the order to the db, after a processing
    finishOrder(order, (finishedOrder) => {
        order = finishedOrder;
    });
    dao.createOrder(order, (response) => {
        callback(response);
    });
}

function finishOrder(order, callback) {
    processParts(order);
    calculatePrice(order);
    callback(order);
}

function processParts(order) {
    order.parts = {
        shutterlength : order.windowlength + 30,
        shutterwidth: order.windowwidth + 30,
        pulley: order.quantity * 2
    }
}

function calculatePrice(order) {
    const serviceCost = 10000;
    var materialCost = order.parts.shutterlength * order.parts.shutterwidth / 100 + order.parts.pulley * 500;
    order.price = serviceCost + materialCost;
}

module.exports = {
    createOrder
}