$.FM.Components = {
	filesList: null,
	filesView: null,
	bookmarksList: null,
	bookmarksView: null,
	editedFile: null,
	fileView: null
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
		this.bookmarksContainer = $("#bookmarks-list");
		this.filesContainer = $("#files-list");
		this.filesPageContainer = $("#files-page");
		this.fileContainer = $("#edit-file-page");
	},

	index: function () {
		// Clear LS
		localStorage.clear();

		$.FM.Components.editedFile = new $.FM.File();
		$.FM.Components.fileView = new $.FM.FileView({
			el: this.fileContainer,
			model: $.FM.Components.editedFile
		});

		$.FM.Components.bookmarksList = new $.FM.Bookmarks();
		$.FM.Components.bookmarksView = new $.FM.BookmarksView({
			el: this.bookmarksContainer,
			collection: $.FM.Components.bookmarksList
		});

		$.FM.Components.filesList = new $.FM.Files();
		$.FM.Components.filesView = new $.FM.FilesView({
			el: this.filesContainer,
			collection: $.FM.Components.filesList
		});

		// Parse initial mock data.
		var i,
			fileObj;
		for (i = 0; i < $.FM.initialData.length; i++) {
			fileObj = new $.FM.FileText($.FM.initialData[i]);
			$.FM.Components.filesList.add(fileObj);
		}

		$.FM.Components.filesList.each(function (file) {
			file.save();
		});
		delete $.FM.initialData;
	},

	files: function () {
		if ($.FM.Components.filesList === null) {
			window.location = "";
		}

		// Beautify
		this.nav.bookmarks.removeClass($.FM.Const.NAV_CLASS_ACTIVE);
		this.header.bookmarks.hide();
		this.bookmarksContainer.hide();
		this.fileContainer.hide();

		this.nav.fileList.addClass($.FM.Const.NAV_CLASS_ACTIVE);
		this.filesPageContainer.show();
		this.header.fileList.show();

		this.actionsCtrl.show();

		// Logic
		$.FM.Components.filesList.fetch();
		this.filesContainer.show();
	},

	bookmarks: function () {
		if ($.FM.Components.bookmarksList === null) {
			window.location = "";
		}

		// Beautify
		this.nav.fileList.removeClass($.FM.Const.NAV_CLASS_ACTIVE);
		this.header.fileList.hide();
		this.filesContainer.hide();
		this.fileContainer.hide();

		this.actionsCtrl.hide();

		this.nav.bookmarks.addClass($.FM.Const.NAV_CLASS_ACTIVE);
		this.filesPageContainer.show();
		this.header.bookmarks.show();

		// Logic
		$.FM.Components.bookmarksList.fetch();
		this.bookmarksContainer.show();
	},

	addFile: function () {
		if ($.FM.Components.filesList === null) {
			window.location = "";
		}

		this.filesPageContainer.hide();

		$.FM.Components.fileView.render();
		this.fileContainer.show();
	},

	editFile: function (index) {
		if ($.FM.Components.filesList === null) {
			window.location = "";
		}

		var requestedFile = $.FM.Components.filesList.models[index];
		if(requestedFile !== undefined) {
			$.FM.Components.editedFile = requestedFile;
		}

		this.filesPageContainer.hide();

		$.FM.Components.fileView.render();
		this.fileContainer.show();
	}
});