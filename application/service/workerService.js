function WorkerService(workerDao) {
    if (workerDao !== undefined && workerDao !== null) {
        this.dao = workerDao;
    } else {
        this.dao = require("../dao/workerDao");
    }
}

WorkerService.prototype.listUnassembledOrders = function(callback) {
    this.dao.listUnassembledOrders((orders) => {
        callback(orders);
    });
}

WorkerService.prototype.listParts = function (id, callback) {
    this.dao.listParts(id, (result) => {
        callback(result);
    })
}

WorkerService.prototype.assembleShutter = function (id, callback) {
    this.dao.assembleShutter(id, (response) => {
        callback(response);
    })
}

module.exports = WorkerService;