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

function listOwnOrders(customername, callback) {
    var projection = {projection: {assembled: 0, parts: 0, "installation.worker": 0}};
    find({customername: customername}, projection, (result) => {
        callback(result)
    });
}

function createOrder(order, callback) {
    var client = new MongoClient(MongoConfig.database.url, MongoConfig.config);
    client.connect((err) => {
        if (err) throw err;
        var db = client.db(MongoConfig.database.databaseName);
        
        db.collection(MongoConfig.database.orderCollection).insertOne(order, function(err, res) {
            if (err) throw err;
            console.log("Order inserted to database");
            callback(res);
        });
        client.close();
    });
}

module.exports = {
    listOwnOrders, createOrder
}
