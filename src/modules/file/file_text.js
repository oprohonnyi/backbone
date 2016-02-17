$.FM.FileText = $.FM.File.extend({
	defaults: {
		type: $.FM.Const.FILETYPE_TEXT
	},

	initialize: function (attributes, options) {
		options || (options = {});

		if(attributes.size === undefined) {
			this.set("size", this._calculateFileSize(attributes.content));
		}

		this.bind("error", this.defaultErrorHandler);
		this.init && this.init(attributes, options);
	},

	defaultErrorHandler: function (model, error) {
		var response = $.parseJSON(error.responseText);

		console.error("$.FM.FileText error occured", response);
	},

	_calculateFileSize: function(content) {
		return content.length;
	}
});