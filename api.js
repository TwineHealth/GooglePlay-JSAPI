var request = require('request');

module.exports = {
	/**
	* Retrieves information with a given appID
	*
	* @param Object config
		* @prop String appID
	* @param Function callback
		* @param Object data
	*/
	getApp: function (config, callback) {
		var basePath = "https://play.google.com/store/apps/details?id=";

		request(basePath+config.appID, function (error, res, chunk) {
			if (!error && res.statusCode == 200) {
				var scraper = require('./scrapers/app');
				var data = scraper.parse(chunk);
				if (typeof callback == 'function') {
					return callback(error, JSON.stringify(data));
				}
			}
            if (typeof callback == 'function') {
                return callback(error);
            }
		});
	},
	/**
	* Retrieves search details for a given name
	*
	* @param Object config
		* @prop String queryStr
	 	* @prop String lang
	* @param Function callback
		* @param Object data
	*/
	getSearch: function (config, callback) {
		var basePath = "https://play.google.com/store/search?&c=apps&q=" + config.queryStr + "&hl=" + config.lang;
		console.log('Fetching url ' + basePath);
		request(basePath, function (error, res, chunk) {
			if (!error && res.statusCode == 200) {
				var scraper = require('./scrapers/search');
				var data = scraper.parse(chunk);
				if (typeof callback == 'function') {
					callback(JSON.stringify(data));
				}
			}
		});
	}

};
