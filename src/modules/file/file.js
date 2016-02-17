$.FM.File = Backbone.Model.extend({
	defaults: {
		name: $.FM.Const.FILENAME_DEFAULT,
		type: $.FM.Const.FILETYPE_DEFAULT,
		size: 0,
		content: null
	}
});