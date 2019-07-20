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
    if(message.text==='/start'){
        console.log(message);
        api.sendMessage(
            {
                chat_id: message.chat.id,
                text: 'Hey There Bro \n Are you Csi? Password please'
            }
        );
    }
    else if (message.text === '/count' || message.text === '/count@CSI_Brobot') { //got a count command

            if(!message.chat.title){
                api.sendMessage(
                    {
                        chat_id: message.chat.id,
                        text: 'This command only works for groups'
                    }
                );
            }
            else{
        message.chat.title = message.chat.title.toLowerCase();
            if (/csi/.test(message.chat.title)) {  Regcount.counter(message, api); }
        } //for CSI groups

        }
    

    else if (/bigbutt/i.test(message.text) && passgiven == 0) {
        Regcount.counter(message, api);

        passgiven = 1;
    }

    else if (/hey/i.test(message.text) || /hello/i.test(message.text) || /hi/i.test(message.text)) {
        api.sendDocument(
            {
                chat_id: message.chat.id,
                document: "assets/giphy.gif"
            }
        );
    }
    else if (/sexy/i.test(message.text)) {
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
