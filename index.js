var Q = require('q');
var rp = require('request-promise');

var WebCache = function (urls, refreshInterval) {
    this.urls = urls;
    this.cache = {};
    this.isReady = false;

    if(refreshInterval) {
        setInterval(this.seed.bind(this), refreshInterval);
    }
};

WebCache.prototype.seed = function () {
    var that = this;
    var requests = this.urls.map(function (url) { 
        var options = {
            uri: url,
            transform: function (body, response) {
                return {
                    url: url,
                    data: body
                }
            }
        };

        return rp(options).catch(function(e) {console.log(e)});
    });

    return Q.allSettled(requests).then(function (results) {
        results.forEach(function (r) {
            if (r.state === 'fulfilled') {
                that.cache[r.value.url] = r.value.data;
            }
        });

        if(!that.isready) {
            console.log('cache seeded');
            that.isready = true;
        } else {
            console.log('cache refreshed');
        }
        
        return that.isready;
    }, function(e) {console.log(e)} );
};

WebCache.prototype.get = function (url) {
    if(this.isready){
        return this.cache[url];
    }
};

module.exports = WebCache;