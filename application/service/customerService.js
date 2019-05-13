function CustomerService(customerDao) {
    this.logger = require("../config/logger");

    if (customerDao !== undefined && customerDao !== null) {
        this.dao = customerDao;
    } else {
        this.dao = require("../dao/customerDao");
    }
}

CustomerService.prototype.createOrder = function(order, callback) {
    finishOrder(order, (finishedOrder) => {
        order = finishedOrder;
    });
    this.dao.createOrder(order, (response) => {
        this.logger.info(`${order} order was created`);
        callback(response);
    });
}

function finishOrder(order, callback) {
    processParts(order);
    calculatePrice(order);
    callback(order);
}

function processParts(order) {
    order.parts = [];
    for(let i = 0; i < order.windows.length; i++) {
        order["parts"].push(
            {
                shutterlength : order.windows[i].windowlength + 30,
                shutterwidth: order.windows[i].windowwidth + 30,
                pulley: order.windows[i].quantity * 2,
                shuttertype: order.windows[i].shuttertype,
                shuttercolor: order.windows[i].shuttercolor,
                quantity: order.windows[i].quantity
            }
        );
    }
    order.assembled = false;
    delete order.windows;
}

function calculatePrice(order) {
    const serviceCost = 5000;
    var materialCost = 0;
    for(let i = 0; i < order.parts.length; i++) {
        materialCost += (order.parts[i].shutterlength * order.parts[i].shutterwidth / 100) * order.parts[i].quantity + order.parts[i].pulley * 400;
    }
    order.price = serviceCost + materialCost;
    order.paid = false;
}

CustomerService.prototype.listOwnOrders = function(customername, callback) {
    this.dao.listOwnOrders(customername, (orders) => {
        this.logger.info(`${orders.length} orders  were found`);
        callback(orders);
    });
}

CustomerService.prototype.payOrder = function (id, callback) {
    this.dao.payOrder(id, (response) => {
        this.logger.info(`Order ID: ${id} was paid`);
        callback(response);
    })
}

module.exports = CustomerService;
