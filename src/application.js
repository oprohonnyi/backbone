$.FM.Components = {
	filesList: null,
	bookmarksList: null
};

$.FM.Router = Backbone.Router.extend({
	routes: {
		"": "index", // First page load
		"files": "files", // File list page
		"bookmarks": "bookmarks", // Bookmarks page
		"file/new": "addFile",
		"file/:id/edit": "editFile"
	},

	initialize: function () {
		this.nav = {
			"fileList": $("#" + $.FM.Const.NAV_FILE_LIST),
			"bookmarks": $("#" + $.FM.Const.NAV_BOOKMARKS)
		};
		this.header = {
			"fileList": $("#" + $.FM.Const.SUB_HEADER_FILE_LIST),
			"bookmarks": $("#" + $.FM.Const.SUB_HEADER_BOOKMARKS)
		};
		this.actionsCtrl = $("#" + $.FM.Const.ACTIONS_GLOBAL);
	},

	index: function () {
		$.FM.Components.bookmarksList = new $.FM.Bookmarks();

		$.FM.Components.filesList = new $.FM.Files();
		new $.FM.FilesView({el: $("#files-list"), collection: $.FM.Components.filesList});

		// Parse initial mock data.
		var i,
			fileObj;
		for (i = 0; i < $.FM.initialData.length; i++) {
			fileObj = new $.FM.FileText($.FM.initialData[i]);
			$.FM.Components.filesList.add(fileObj);
		}

		$.FM.Components.filesList.save();
		delete $.FM.initialData;
	},

	files: function () {
		// Beautify
		this.nav.bookmarks.removeClass($.FM.Const.NAV_CLASS_ACTIVE);
		this.header.bookmarks.hide();

		this.nav.fileList.addClass($.FM.Const.NAV_CLASS_ACTIVE);
		this.header.fileList.show();

		this.actionsCtrl.show();

		// Logic
		$.FM.Components.filesList.fetch();
	},

	bookmarks: function () {
		// Beautify
		this.nav.fileList.removeClass($.FM.Const.NAV_CLASS_ACTIVE);
		this.header.fileList.hide();

		this.actionsCtrl.hide();

		this.nav.bookmarks.addClass($.FM.Const.NAV_CLASS_ACTIVE);
		this.header.bookmarks.show();

		// Logic
		$.FM.Components.bookmarksList.fetch();
	}
});