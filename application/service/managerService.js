const pdfInvoice = require('pdf-invoice-hu');
const fs = require('fs');

function ManagerService(managerDao) {
    this.logger = require("../config/logger");

    if (managerDao !== undefined && managerDao !== null) {
        this.dao = managerDao;
    } else {
        this.dao = require("../dao/managerDao");
    }
}

ManagerService.prototype.listAllOrder = function(callback) {
    this.dao.listAllOrder((orders) => {
        this.logger.info(`${orders.length} orders were found`);
        callback(orders);
    });
};

ManagerService.prototype.listReadyOrders = function (callback) {
    this.dao.listReadyOrders((orders) => {
        this.logger.info(`${orders.length} orders were found`);
        callback(orders);
    });
};

ManagerService.prototype.checkPayments = function(callback) {
    this.dao.checkPayments((orders) => {
        callback(orders);
    });
};

ManagerService.prototype.arrangeInstallation = function (data, callback) {
    this.dao.arrangeInstallation(data, (response) => {
        this.logger.info(`Order: ${data} installation was arranged`);
        callback(response);
    });
};

ManagerService.prototype.createInvoice = function (id, callback) {
    this.logger.info(`Invoice for order ID: ${id} was generated`);
    this.dao.listReadyOrders((orders) => {
        filterOrdersById(id, orders, (result) => {
            createItemsForInvoice(result, (items) => {
                createDocument(items, result, (document) => {
                    createInvoiceFile(document, (success) => {
                        callback(success);
                    });
                });
            });
        });
    });
}

function filterOrdersById(id, orders, callback) {
    var result = orders.filter(function (order) {
        return order._id == id;
    });
    console.log(result);
    callback(result);
}

function createItemsForInvoice(orders, callback) {
    var items = [];
    orders.forEach(function (element) {

        var sumQuantity = 0;
        for(let i = 0; i < element.parts.length; i++) {
            sumQuantity += element.parts[i].quantity;
        }

        items.push({
            customername : element.customername,
            address: element.address,
            description: "Felszerelés időpontja: " + element.installation.appointment,
            quantity: sumQuantity,
            unit_price: element.price,
            net_price: element.price - (element.price * 0.20),
            vat_amount: element.price - (element.price * 0.80),
            amount: element.price
        });
    });
    callback(items);
}

function createDocument(items, orders, callback) {
    if (items.length === 0) {
        callback(false);
    } else {
        const document = pdfInvoice({
            seller: {
                phone: '1413',
                email: 'redony@shutters.hu',
                address: 'Ózd, Redőny utca 1',
                name: 'Redőny Zrt.',
                bank_acc: '00000000-00000000-00000000',
            },
            buyer: {
                phone: "+36 70 1234567",
                name: orders[0].customername,
                email: orders[0].customername.replace(/\s+/g,'').toLowerCase() + '@t-offline.hu',
                address: orders[0].address,
            },
            headline: {
                createdAt: new Date().toISOString(),
                completionDate: new Date().toISOString(),
                paymentDeadline: new Date().toISOString(),
                paymentMethod: 'Bankkártya',
                invoiceId: 'SI-O-12',
                commentText: 'Köszönjük vásárlását!',
            },
            items: items,
        });
        callback(document);
    }
}

function createInvoiceFile(document, callback) {
    if (document === false) {
        callback(false)
    } else {
        document.generate();
        let pdfName = `invoice${Math.round(Math.random() * 1000000)}.pdf`;
        document.pdfkitDoc.pipe(fs.createWriteStream(`./invoices/${pdfName}`));
        callback(true);
    }
}

ManagerService.prototype.checkStatistics = function (callback) {
   this.dao.listAllOrder( (orders) => {
       this.logger.info(`${orders.length} orders were processed for statistics`);
       callback(createStatistics(orders));
    });
};

function createStatistics(orders) {
    var stats = {
        submittedOrders: 0,
        totalPriceOfOrders: 0,
        requestedShutters : 0,
        assembledShutters: 0,
        averageQuantityPerOrder: 0,
        averagePricePerOrder: 0
    };

    orders.forEach(function (order) {
        stats.submittedOrders++;
        stats.totalPriceOfOrders += order.price;

        for(let i = 0; i < order.parts.length; i++) {
            stats.requestedShutters += order.parts[i].quantity;
            if(order.assembled === true) {
                stats.assembledShutters += order.parts[i].quantity;
            }
        }
    });
    stats.averageQuantityPerOrder = (stats.requestedShutters / stats.submittedOrders).toFixed(2);
    stats.averagePricePerOrder = (stats.totalPriceOfOrders / stats.submittedOrders).toFixed(2);
    return stats;
}

module.exports = ManagerService;