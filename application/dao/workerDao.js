const assert = require("assert");
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const MongoConfig = {
    database : {
        url : "mongodb://localhost:27017",
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
            console.log(docs);
            callback(docs);
        });
        client.close();
    });
}

function listUnassembledOrders(callback) {
    var projection = {projection: {price: 0, windowlength: 0, windowwidth: 0}};
    find({assembled: false}, projection, (result) => {
        callback(result)
    });
}

function listParts(id, callback) {
    var projection = {projection: {_id: 1, shuttertype: 1, shuttercolor: 1, quantity: 1,  parts: 1}};
    find({_id: new ObjectID(id)}, projection, (result) => {
        callback(result);
    });
}

function assembleShutter(id, callback) {
    var client = new MongoClient(MongoConfig.database.url, MongoConfig.config);
    client.connect((err) => {
        assert.strictEqual(null, err);

        var db = client.db(MongoConfig.database.databaseName);
        var collection = db.collection(MongoConfig.database.orderCollection);

        collection.updateOne({_id: new ObjectID(id)}, {
            $set: {
                assembled: true
            }
        }, function (err, docs) {
            assert.strictEqual(err, null);
            callback(docs);
        });
        client.close();
    });
}

module.exports = {
    listUnassembledOrders, listParts, assembleShutter
}