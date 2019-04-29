const dao = require("../dao/managerDao");
const pdfInvoice = require('pdf-invoice-hu');
const fs = require('fs');

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

function createInvoice(customername, callback) {
    dao.listReadyOrders((orders) => {
        filterOrdersByName(customername, orders, (result) => {
            createItemsForInvoice(result, (items) => {
                createDocument(customername, items, result, (document) => {
                    createInvoiceFile(document, (success) => {
                        callback(success);
                    });
                });
            });
        });
    });
}

function filterOrdersByName(customername, orders, callback) {
    var result = orders.filter(function (order) {
        return order.customername === customername;
    });
    callback(result);
}

function createItemsForInvoice(orders, callback) {
    var items = [];
    orders.forEach(function (element) {
        items.push({
            customername : element.customername,
            address: element.address,
            description: 'Anyag: ' + element.shuttertype + ' Szín: ' + element.shuttercolor,
            quantity: element.quantity,
            price: element.price
            /*quantity: element.quantity,
            name: 'Tutkó redőny',
            description: element.shutter_color + ' ' + element.shutter_material + ' redőny',
            unit_price: element.price,
            net_price: element.price - (element.price * 0.20),
            vat_amount: element.price - (element.price * 0.80),
            amount: element.price * element.quantity*/
        });
    });
    callback(items);
}

function createDocument(name, items, orders, callback) {
    if (items.length === 0) { //checks if there were items under a name, basically if there wasn't a name like so then wont create pdf
        callback(false);
    } else {
        const document = pdfInvoice({/*
            seller: {
                phone: '1414',
                email: 'redony@shutters.hu',
                address: 'Ózd, Redőny utca 1.',
                name: 'Redőny zrt.',
                bank_acc: '88888888-00000000-11111111',
                vat: 'ezmi',
            },
            buyer: {
                name: name,
                address: orders[Object.keys(orders)[0]].address,
                email: name + '@t-offline.hu',
                vat: 'ezmi',
                eu_vat: 'eu_ezmi',
            },
            headline: {
                createdAt: new Date().toISOString(),
                completionDate: new Date().toISOString(),
                paymentDeadline: new Date().toISOString(),
                paymentMethod: 'Bankkártya',
                invoiceId: orders[Object.keys(orders)[0]]._id,
                commentText: 'Köszönjük vásárlását!',
            },
            items: items,*/
            seller: {
                phone: '555-0123',
                email: 'info@uttershutters.hu',
                address: '1102 New London, Blemmigan Square 256.',
                name: 'Utter Shutters ZRT',
                bank_acc: '00000000-00000000-00000000',
                vat: 'ezmi',
            },
            buyer: {
                // phone: '+36 (66) 888-8888',
                name: name,
                email: name + '@freemail.hu',
                address: orders[Object.keys(orders)[0]].address,
                vat: 'ezmi',
                eu_vat: 'eu_ezmi',
            },
            headline: {
                createdAt: new Date().toISOString(),
                completionDate: new Date().toISOString(),
                paymentDeadline: new Date().toISOString(),
                paymentMethod: 'Bankkártya',
                invoiceId: 'BN-BM-69',
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
        document.pdfkitDoc.pipe(fs.createWriteStream(`./public/invoices/${pdfName}`));
        callback(true);
    }
}

module.exports = {
    listAllOrder,
    listReadyOrders,
    checkPayments,
    arrangeInstallation,
    createInvoice
}