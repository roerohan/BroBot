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
api.on('message', function (message) {
    message.text = message.text.toLowerCase();
    if (message.text === '/count' || message.text === '/count@CSI_Brobot') {// Received text message
        if (message.chat.title === 'Bot Testing') { passgiven = 1; }
        if (passgiven == 0) {
            console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
            console.log('yes i got');
            console.log(message);

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
    else if (/sexy/.test(message.text)) {
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
    console.log(message);

}

);
