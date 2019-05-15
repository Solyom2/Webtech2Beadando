const assert = require('assert');
const sinon = require('sinon');
const mocha = require('mocha');

const cs = require("../service/customerService");
const dao = {
    createOrder: function (order, callback) {
        callback(order)
    },
    listOwnOrders: function (name, callback) {
        callback(name)
    }
};

const daoMock = sinon.mock(dao);
const service = new cs(dao);

mocha.describe('Customer Service Test', function () {
    it('CreateOrder is called once and verifies if the callbacks value is correct', function () {
        daoMock.expects('createOrder').once();
        service.createOrder({windows : []}, (result) => {
            assert.strictEqual(result, {windows : []});
        });
        assert(daoMock.verify());
    });

    it('List owned orders function is called once and verify if the callback values are correct', function () {
        daoMock.expects('listOwnOrders').once();
        service.listOwnOrders('name', (result) => {
            assert.strictEqual(result, 'name');
        });
        assert(daoMock.verify());
    });

});