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
    it('createOrder is called once and verifies if the callbacks value is correct', function () {
        daoMock.expects('createOrder').once();
        service.createOrder({done: 'done'}, (result) => {
            assert.strictEqual(result, {done: 'done'});
        });
        assert(daoMock.verify());
    });

    it('list queued orders which are called once and correct', function () {
        daoMock.expects('listOwnOrders').once();
        service.listOwnOrders('name', (result) => {
            assert.strictEqual(result, 'name');
        });
        assert(daoMock.verify());
    });

});