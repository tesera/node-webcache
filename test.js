var WebCache = require('./index.js');

var webCache = new WebCache(['http://tesera.com']);
webCache.seed().then(function () {
    webCache.get('http://google.com').then(function (data) {
        console.log(data);
    });
});

// var webCache = new WebCache(['http://tesera.com', 'http://google.com']);
// webCache.seed().then(function () {
//     webCache.get('http://google.com').then(function (data) {
//         console.log(data);
//     });
// });

// var webCache = new WebCache(['http://tesera.com'], {refreshInterval: 1200});

// var urls = [
//     "http://old.avalanche.ca/dataservices/cac/bulletins/xml/Northwest-Coastal",
//     "http://old.avalanche.ca/dataservices/cac/bulletins/xml/Northwest-Inland",
//     "http://old.avalanche.ca/dataservices/cac/bulletins/xml/Sea-to-Sky",
//     "http://old.avalanche.ca/dataservices/cac/bulletins/xml/South-Coast",
//     "http://old.avalanche.ca/dataservices/cac/bulletins/xml/North-Shore",
//     "http://old.avalanche.ca/dataservices/cac/bulletins/xml/Cariboos",
//     "http://old.avalanche.ca/dataservices/cac/bulletins/xml/Monashees-Selkirks",
//     "http://old.avalanche.ca/dataservices/cac/bulletins/xml/South-Columbia",
//     "http://old.avalanche.ca/dataservices/cac/bulletins/xml/Purcells",
//     "http://old.avalanche.ca/dataservices/cac/bulletins/xml/Kootenay-Boundary",
//     "http://old.avalanche.ca/dataservices/cac/bulletins/xml/South-Rockies",
//     "http://old.avalanche.ca/dataservices/cac/bulletins/xml/Lizardrange",
//     "http://old.avalanche.ca/dataservices/cac/bulletins/xml/Kananaskis"
// ];

// var webCache = new WebCache(urls);
// webCache.seed().then(function () {
//     webCache.get('http://old.avalanche.ca/dataservices/cac/bulletins/xml/Northwest-Inland').then(function (data) {
//         console.log(data);
//     });
// });