const assert = require("assert");
const MongoClient = require("mongodb").MongoClient;
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

function listOrders(callback) {
    var projection = {projection: {_id: 0}};
    find({}, projection, (result) => {
        callback(result)
    });
}

function listParts(id, callback) {
    //TODO szám alapján nem lehet keresni, stringgel igen id='1' customername='Nagy Béla'
    var projection = {projection: {_id: 0, parts: 1}};
    find({id: parseInt(id)}, projection, (result) => {
        callback(result);
    });
}

function assembleShutter(id, callback) {
    var client = new MongoClient(MongoConfig.database.url, MongoConfig.config);
    client.connect((err) => {
        assert.strictEqual(null, err);

        var db = client.db(MongoConfig.database.databaseName);
        var collection = db.collection(MongoConfig.database.orderCollection);

        collection.updateOne({id: id}, {
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
    listOrders, listParts, assembleShutter
}