$.FM.Files = Backbone.Collection.extend({
	localStorage: new Backbone.LocalStorage("FM.Files"),
	model: $.FM.FileText,

	initialize: function () {
		if ($.FM.Utils === undefined) {
			throw new ReferenceError("Unresolved dependencies!");
		}

		this.utils = $.FM.Utils.getInstance();
	},

	sortByName: function (isAscending) {
		var self = this;
		this.comparator = function (a, b) {
			var result;

			if (isAscending === true) {
				result = self.utils.compareStringFields(a.toJSON(), b.toJSON(), "name");
			} else {
				result = self.utils.compareStringFields(b.toJSON(), a.toJSON(), "name");
			}

			return result;
		};

		this.sortField = $.FM.Const.ICON_SORT_NAME_ID;
		this.isAscending = isAscending;

		this.sort();
	},

	sortByType: function (isAscending) {
		var self = this;
		this.comparator = function (a, b) {
			var result;

			if (isAscending === true) {
				result = self.utils.compareStringFields(a.toJSON(), b.toJSON(), "type");
			} else {
				result = self.utils.compareStringFields(b.toJSON(), a.toJSON(), "type");
			}

			return result;
		};

		this.sortField = $.FM.Const.ICON_SORT_TYPE_ID;
		this.isAscending = isAscending;

		this.sort();
	},

	sortBySize: function (isAscending) {
		var self = this;
		this.comparator = function (a, b) {
			var result;

			if (isAscending === true) {
				result = self.utils.compareNumberFields(a.toJSON(), b.toJSON(), "size");
			} else {
				result = self.utils.compareNumberFields(b.toJSON(), a.toJSON(), "size");
			}

			return result;
		};

		this.sortField = $.FM.Const.ICON_SORT_SIZE_ID;
		this.isAscending = isAscending;

		this.sort();
	},

	filterByName: function (pattern) {
		var i,
			length = this.length,
			name,
			patternSearch = this.utils.stripFilterPattern(pattern);

		this.filterPattern = pattern;
		this.fetch();

		if (patternSearch === "") {
			return;
		}

		for (i = 0; i < length; i++) {
			name = this.models[i].get("name");

			if (name.indexOf(patternSearch) < 0) {
				this.remove(this.models[i]);
				i--;
				length--;
			}
		}
	}
});