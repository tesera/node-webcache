var Q = require('q');
var rp = require('request-promise');
var _ = require('lodash');

var WebCacheMem = function () {
    this.client = {};
};

WebCacheMem.prototype.get = function (key) {
    var val = this.client[key];
    return Q.fcall(function () { return val; });
};

WebCacheMem.prototype.set = function (key, val) {
    this.client[key] = val;
    return Q.fcall(function () { return 'OK'; });
};

var WebCache = function (urls, options) {
    this.urls = urls;
    this.options = options || {};
    this.cache = this.options.store || new WebCacheMem();
    this.isReady = false;

    if(this.options.refreshInterval) {
        setInterval(this.seed.bind(this), this.options.refreshInterval);
    }
};

WebCache.prototype.seed = function () {
    var that = this;
    var start = +new Date
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
        results = _.groupBy(results, 'state');
        results.rejected = results.rejected || [];

        var sets = results.fulfilled.map(function (r) { return that.cache.set(r.value.url, r.value.data); })

        return Q.allSettled(sets).then(function () {
            var end = +new Date
            var duration = (end-start)
            if(!that.isready) {
                console.log('cache seeded with %s successes and %s timeouts in %s milliseconds', results.fulfilled.length, results.rejected.length, duration);
                that.isready = true;
            } else {
                console.log('cache refreshed with %s successes and %s timeouts in %s milliseconds', results.fulfilled.length, results.rejected.length, duration);
            }
        });
    }, function(e) { console.log('error:' + e); });
};

WebCache.prototype.get = function (url) {
    return this.cache.get(url);
};

module.exports = WebCache;