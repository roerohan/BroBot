const NineGag = require('9gag');
const download = require('download');
const rimraf = require("rimraf");
const Scraper = NineGag.Scraper;

async function getMemes() {
    const scraper = new Scraper(4, 'fresh', 0);
    let posts = await scraper.scrap();
    let memeUrls = new Array();
    posts.forEach((meme) => {
        memeUrls.push(meme.content);
    });
    return memeUrls;
}

async function downloadMemes() {
    rimraf.sync('memes');
    let memeUrls = await getMemes();
    return await Promise.all(memeUrls.map(x => download(x, 'memes')));
}

module.exports.downloadMemes = downloadMemes;