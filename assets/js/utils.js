$.FM.Utils = (function () {
	var _instance = null;

	var Utils = function () {
		this.compareNumberFields = function (a, b, fieldName) {
			return parseInt(a[fieldName]) - parseInt(b[fieldName]);
		};
		this.compareStringFields = function (a, b, fieldName) {
			var result = 0;
			if (a[fieldName] < b[fieldName]) {
				result = -1;
			}
			if (a[fieldName] > b[fieldName]) {
				result = 1;
			}
			return result;
		};
		this.stripFilterPattern = function (pattern) {
			return pattern.split("*").join("");
		};
	};

	var getInstance = function () {
		if (_instance === null) {
			_instance = new Utils();
		}

		return _instance;
	};

	return {
		"getInstance": getInstance
	};
})();