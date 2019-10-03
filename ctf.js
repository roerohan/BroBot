var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/ctf";

Regcount = function (message, api) {

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var ctfDb = db.db("ctf");
        ctfDb.collection("users").count()
            .then(count => {
                api.sendMessage({
                    chat_id: message.chat.id,
                    text: "Reg count" + count
                });
                console.log(`${count} documents match the specified query.`)
            })
            .catch(err => console.error("Failed to count documents: ", err));
    });
}

module.exports.Regcount = Regcount;
