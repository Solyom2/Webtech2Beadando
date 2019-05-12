function WorkerService(workerDao) {
    this.logger = require("../config/logger");

    if (workerDao !== undefined && workerDao !== null) {
        this.dao = workerDao;
    } else {
        this.dao = require("../dao/workerDao");
    }
}

WorkerService.prototype.listUnassembledOrders = function(callback) {
    this.dao.listUnassembledOrders((orders) => {
        this.logger.info(`${orders.length} orders  were found`);
        callback(orders);
    });
}

WorkerService.prototype.listParts = function (id, callback) {
    this.dao.listParts(id, (result) => {
        this.logger.info(`Order ID: ${id} parts were found`);
        callback(result);
    })
}

WorkerService.prototype.assembleShutter = function (id, callback) {
    this.dao.assembleShutter(id, (response) => {
        this.logger.info(`Order ID: ${id} shutter was assembled`);
        callback(response);
    })
}

module.exports = WorkerService;