const assert = require('assert');
const sinon = require('sinon');
const mocha = require('mocha');

const ws = require("../service/workerService");
const dao = {
    listUnassembledOrders: function (orders, callback) {
        callback(orders)
    },
    listParts: function (id, callback) {
        callback(id)
    },
    assembleShutter: function (id, callback) {
        callback(id)
    },
};

const daoMock = sinon.mock(dao);
const service = new ws(dao);

mocha.describe("Worker Service Test", function () {
    it("List unassemled orders function is called once and result is correct", function () {
        daoMock.expects("listUnassembledOrders").once();
        service.listUnassembledOrders((order) => {
            assert.strictEqual(order, []);
        });
        assert(daoMock.verify());
    });

    it("List parts function is called once and result is correct", function () {
        daoMock.expects("listParts").once();
        service.listParts(1, (result) => {
            assert.strictEqual(result, 1);
        });
        assert(daoMock.verify());
    });

    it("Assemble shutter function is called once and result is correct", function () {
        daoMock.expects("assembleShutter").once();
        service.assembleShutter(1, (result) => {
            assert.strictEqual(result, 1);
        });
        assert(daoMock.verify());
    });
});