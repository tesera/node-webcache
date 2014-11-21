var WebCache = require('./index.js');

var webCache = new WebCache(['http://tesera.com']);
webCache.seed().then(function () {
    console.log(webCache.get('http://tesera.com'));
});

var webCache = new WebCache(['http://tesera.com', 'http://google.com']);
webCache.seed().then(function () {
    console.log(webCache.get('http://google.com'));
});

var webCache = new WebCache(['http://tesera.com'], 120000);