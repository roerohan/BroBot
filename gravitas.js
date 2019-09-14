var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/GravitasDB";



Regcount = function (message, api) {

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var GRAVITASdb = db.db("GravitasDB");
        var querycb = {
            event: "G19ETCH090",
            payment_status: "Success"
        }; //clickbait query
        GRAVITASdb.collection("participants").count(querycb)
            .then(count => {
                api.sendMessage({
                    chat_id: message.chat.id,
                    text: "Clickbait success =" + count
                });
                console.log(`${count} documents match the specified query.`)
            })
            .catch(err => console.error("Failed to count documents: ", err));

        var querylt = {
            event: "G19ENON074",
            payment_status: "Success"
        }; //lasertag query

        GRAVITASdb.collection("participants").count(querylt)
            .then(count => {
                api.sendMessage({
                    chat_id: message.chat.id,
                    text: "Lasertag success =" + count
                });
                console.log(`${count} documents match the specified query.`)
            })
            .catch(err => console.error("Failed to count documents: ", err))
    });




}

module.exports.Regcount = Regcount;
