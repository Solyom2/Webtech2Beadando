const assert = require("assert");
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const MongoConfig = {
    database : {
        url : "mongodb://172.21.0.10:27017",
        //url : "mongodb://localhost:27017",
        databaseName : "shuttershop",
        orderCollection : "orders"
    },
    config : {
        useNewUrlParser : true
    }
};

function find(findParams, projection, callback) {
    var client = new MongoClient(MongoConfig.database.url, MongoConfig.config);
    client.connect((err) => {
        assert.strictEqual(null, err);

        var db = client.db(MongoConfig.database.databaseName);
        var collection = db.collection(MongoConfig.database.orderCollection);

        collection.find(findParams, projection).toArray(function (err, docs) {
            assert.strictEqual(err, null);
            callback(docs);
        });
        client.close();
    });
}

function listAllOrder(callback) {
    var projection = {projection: {}};
    find({}, projection, (result) => {
        callback(result);
    });
}

function listReadyOrders(callback) {
    var projection = {projection: {}};
    find({assembled: true}, projection, (result) => {
        callback(result)
    });
}

function checkPayments(callback) {
    var projection = {projection: {_id: 1, customername: 1, address: 1, price: 1}};
    find({}, projection, (result) => {
        callback(result)
    });
}

function arrangeInstallation(data, callback) {
    var client = new MongoClient(MongoConfig.database.url, MongoConfig.config);
    client.connect((err) => {
        assert.strictEqual(null, err);

        var db = client.db(MongoConfig.database.databaseName);
        var collection = db.collection(MongoConfig.database.orderCollection);

        collection.updateOne({_id: new ObjectID(data._id)}, {
            $set: {
                installation: {
                    worker: data.worker,
                    appointment: data.appointment
                }
            }
        }, function (err, docs) {
            assert.strictEqual(err, null);
            callback(docs);
        });
        client.close();
    });
}



module.exports = {
    listAllOrder, listReadyOrders, checkPayments, arrangeInstallation
};