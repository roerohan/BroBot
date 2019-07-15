const request = require('request');
const cheerio = require('cheerio');
var counts;
counter = function (message, api) {
    request.post({
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: 'https://devspace.csivit.com/regCount',
        body: "pass=bigbutt"
    }, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            //console.log($.html());
            console.log($.html());
            counts = $('td').text();
            console.log(counts);
            api.sendMessage(
                {
                    chat_id: message.chat.id,
                    text: counts
                }
            );

            //console.log($('td').text()+'\n');

        }
    });
}

module.exports.counter = counter;
module.exports.counts = counts;
