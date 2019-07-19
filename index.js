var passgiven = 0;
var telegram = require('telegram-bot-api');
const Regcount = require('./count.js')

var api = new telegram({
    token: '651148251:AAFtLgjrHYYBRYU8vW_HPG8GiLgYbBYncOI',
    updates: {
        enabled: true
    }
});

api.getMe()
    .then(function (data) {
        console.log(data);
    })
    .catch(function (err) {
        console.log(err);
    });
api.on('message', function (message) { // Received text message
    message.text = message.text.toLowerCase();
    message.chat.title=message.chat.title.toLowerCase()
    if (message.text === '/count' || message.text === '/count@CSI_Brobot') { //got a count command
        if (/csi/.test(message.chat.title)) { passgiven = 1; } //for CSI groups
        if (passgiven == 0) { //one time password
            api.sendMessage(
                {
                    chat_id: message.chat.id,
                    text: 'Are you Csi? Password please'
                }
            );


        }
        else {
            Regcount.counter(message, api);


        }
    }

    else if (/bigbutt/.test(message.text) && passgiven == 0) {
        Regcount.counter(message, api);

        passgiven = 1;
    }

    else if (/hey/.test(message.text) || /hello/.test(message.text) || /hi/.test(message.text)) {
        api.sendDocument(
            {
                chat_id: message.chat.id,
                document: "assets/giphy.gif"
            }
        );
    }
    else if (/bro/.test(message.text)) {
        api.sendDocument(
            {
                chat_id: message.chat.id,
                document: "assets/tenor.gif"
            }
        );
    }
    else
        api.sendMessage(
            {
                chat_id: message.chat.id,
                text: 'Me No Understands'
            }
        );


}

);
