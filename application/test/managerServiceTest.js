const assert = require('assert');
const sinon = require('sinon');
const mocha = require('mocha');

const ms = require("../service/managerService");
const dao = {
    listAllOrder: function (orders, callback) {
        callback(orders)
    },
    arrangeInstallation: function (data, callback) {
        callback(data)
    }
};

const daoMock = sinon.mock(dao);
const service = new ms(dao);

mocha.describe("Manager Service Test", function () {
    it("List all order function is called once and result is correct", function () {
        daoMock.expects("listAllOrder").once();
        service.listAllOrder((order) => {
            assert.strictEqual(order, []);
        });
        assert(daoMock.verify());
    });

    it("Arrange installation function is called once and result is correct", function () {
        daoMock.expects("arrangeInstallation").once();
        service.arrangeInstallation({}, (details) => {
            assert.strictEqual(details, {});
        });
        assert(daoMock.verify());
    });

});