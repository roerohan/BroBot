var telegram = require('telegram-bot-api');
const Regcount = require('./count.js');
const Free = require('./free.js');
const fs = require('fs');
const Memes = require('./meme.js');

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
api.on('message', async function (message) { // Received text message
    if (message.text === '/start') {
        console.log(message);
        api.sendMessage(
            {
                chat_id: message.chat.id,
                text: 'Hey There Bro \n Are you Csi? Password please'
            }
        );
    }
    else if (message.text === '/count' || message.text === '/count@CSI_Brobot') { //got a count command

        if (!message.chat.title) {
            api.sendMessage(
                {
                    chat_id: message.chat.id,
                    text: 'This command only works for groups'
                }
            );
        }
        else {
            message.chat.title = message.chat.title.toLowerCase();
            if (/csi/.test(message.chat.title)) {

                api.sendMessage(
                    {
                        chat_id: message.chat.id,
                        text: 'Getting registration counts'
                    }
                );
                Regcount.counter(message, api);
            }
        } //for CSI groups

    }
    else if (/bigbutt/i.test(message.text)) {
        api.sendMessage(
            {
                chat_id: message.chat.id,
                text: 'Getting registration counts'
            }
        );
        Regcount.counter(message, api);
    }

    else if (/hey /i.test(message.text) || /hello /i.test(message.text) || /hi /i.test(message.text)) {
        api.sendDocument(
            {
                chat_id: message.chat.id,
                document: "assets/giphy.gif"
            }
        );
    }
    else if (/sexy /i.test(message.text)) {
        api.sendDocument(
            {
                chat_id: message.chat.id,
                document: "assets/tenor.gif"
            }
        );
    }
    else if (/love /i.test(message.text)) {
        api.sendMessage(
            {
                chat_id: message.chat.id,
                text: 'I love you too bro 🤤🤤'
            }
        );
    }
    else if (/free/i.test(message.text) || message.text === '/free' || message.text === '/free@CSI_Brobot') {
        api.sendMessage(
            {
                chat_id: message.chat.id,
                text: 'Getting this'
            }
        );
        Free.freepeople(message, api);
    }
    else if (/memes/i.test(message.text) || message.text === '/meme' || message.text === '/meme@CSI_Brobot') {
        api.sendMessage(
            {
                chat_id: message.chat.id,
                text: 'Lemmi find some dank ones!'
            }
        );
        await Memes.downloadMemes();
        let files = new Array();
        fs.readdirSync('memes').forEach(file => {
            files.push("memes/" + file);
        });
        Promise.all(files.map(file => {
            api.sendPhoto({
                chat_id: message.chat.id,
                photo:file
            });
        })).catch((err) => {
            console.log(err);
        });
    }
    else {
        api.sendMessage(
            {
                chat_id: message.chat.id,
                text: 'Me No Understands'
            }
        );
    }
});
