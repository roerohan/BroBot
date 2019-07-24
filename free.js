const request = require('request');
const cheerio = require('cheerio');
var free=[];
var date = new Date;
freepeople = function (message, api) {
    request.get({
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        url: 'https://timetables.csivit.com/?free=true'
    }, (error, response, html) => {

            const $ = cheerio.load(html);
            var i;
            var start;
            var end;
            var t, t2;
            console.log(date.getHours());
            switch (date.getDay()) {
                case 1:
                    start = 1;
                    end = 11;
                    break;
                case 2:
                    start = 13;
                    end = 23;
                    break;
                case 3:
                    start = 25;
                    end = 35;
                    break;
                case 4:
                    start = 37;
                    end = 47;
                    break;
                case 5:
                    start = 49;
                    end = 59;
            }
            console.log(start + "start end" + end);
            var x = [];
            for (i = start; i <= end; i++) {
                x.push($("td").eq(i).text()+"\n");
            }

            for (i = 0, t = 8; i < 11; i++, t++) {
                t2 = t + 1;
                free.push(t + "-" + t2 + "\t =>" + x[i]);

            }
        
            api.sendMessage({
                chat_id: message.chat.id,
                text: free[date.getHours()-8],

            });



    });
}

module.exports.freepeople = freepeople;
