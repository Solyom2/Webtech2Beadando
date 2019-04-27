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

function list() {
    var client = new MongoClient(MongoConfig.database.url, MongoConfig.config);
    client.connect((err) => {
        assert.strictEqual(err, null);
        var db = client.db(MongoConfig.database.databaseName);
        var collection = db.collection(MongoConfig.database.orderCollection);

        collection.find().toArray(function (err, docs) {
            assert.strictEqual(err, null);
            console.log("okay")
        });

        client.close();
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
    list, createOrder
}
