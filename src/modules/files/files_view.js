$.FM.FilesView = Backbone.View.extend({
	tagName: "table",
	className: "files-list-view",

	initialize: function () {
		_.bindAll(this, "render", "render_file_actions", "file_select_handler", "file_download_handler",
			"file_bookmark_handler", "files_sort_name", "files_sort_type", "files_sort_size", "files_filter_handler");
		this.listenTo(this.collection, "add", this.render);
		this.listenTo(this.collection, "sort", this.render);
		this.listenTo(this.collection, "remove", this.render);
		this.template = _.template($("#files-list-tpl").html());
	},

	render: function () {
		var collection = this.collection.toJSON(),
			el = $(this.el),
			renderContent = {};

		renderContent.selectedIndex = -1;
		renderContent.fileList = collection;

		el.html(this.template(renderContent));

		// Sorting
		if (this.collection.sortField !== undefined) {
			var icon = $.FM.Const.ICON_SORT_ASC;
			if (this.collection.isAscending === false) {
				icon = $.FM.Const.ICON_SORT_DESC;
			}
			$("#" + this.collection.sortField).addClass(icon);
		}

		// Filtering
		if (this.collection.filterPattern !== undefined) {
			$("#" + $.FM.Const.FILE_NAME_PATTERN).val(this.collection.filterPattern);
		}

		return this;
	},

	render_file_actions: function (selectedIndex) {
		var collection = this.collection.toJSON(),
			el = $(this.el),
			renderContent = {};

		renderContent.selectedIndex = selectedIndex;
		renderContent.fileList = collection;

		el.html(this.template(renderContent));

		return this;
	},

	render_sort_actions: function (sortField, isAscending) {
		var collection = this.collection.toJSON(),
			el = $(this.el),
			renderContent = {};

		renderContent.sortField = sortField;
		renderContent.isAscending = isAscending;
		renderContent.fileList = collection;

		el.html(this.template(renderContent));

		return this;
	},

	events: {
		"click .row-select": "file_select_handler",
		"click #download-action": "file_download_handler",
		"click #bookmark-action": "file_bookmark_handler",
		"click #file-name-sort": "files_sort_name",
		"click #file-type-sort": "files_sort_type",
		"click #size-sort": "files_sort_size",
		"click #file-name-filter": "files_filter_handler"
	},

	file_select_handler: function (e) {
		var clickedParent = $(e.target).parent(),
			clickedRowIndex = clickedParent.attr($.FM.Const.DATA_INDEX_ATTR_NAME);

		if (clickedParent.hasClass($.FM.Const.FILE_TABLE_ROW_SELECTED_CLASS) === true) {
			this.render();
		} else {
			this.render_file_actions(parseInt(clickedRowIndex));
		}
	},

	file_download_handler: function (e) {
		if (Blob === undefined || saveAs === undefined) {
			throw new ReferenceError("Unresolved dependencies!");
		}

		var clickedFileIndex = parseInt($(e.target).attr($.FM.Const.DATA_INDEX_ATTR_NAME)),
			collection = this.collection.toJSON(),
			blob;

		blob = new Blob([collection[clickedFileIndex].content], {type: $.FM.Const.BLOB_HEADERS_TEXT});
		saveAs(blob, collection[clickedFileIndex].name);

		return false;
	},

	file_bookmark_handler: function (e) {
		if ($.FM.Components.bookmarksList === undefined || $.FM.Components.bookmarksList === null) {
			throw new ReferenceError("Unresolved dependencies!");
		}

		var clickedFileIndex = parseInt($(e.target).attr($.FM.Const.DATA_INDEX_ATTR_NAME)),
			collection = this.collection.toJSON(),
			bookmark = {};

		$.extend(true, bookmark, collection[clickedFileIndex]);

		$.FM.Components.bookmarksList.add(bookmark);

		alert("The file has been successfully added to bookmarks!");

		return false;
	},

	files_sort_name: function () {
		var icon = $("#" + $.FM.Const.ICON_SORT_NAME_ID),
			isAscending = false;
		if (icon.hasClass($.FM.Const.ICON_SORT_ASC) === false) {
			isAscending = true;
		}

		this.collection.sortByName(isAscending);

		return false;
	},

	files_sort_type: function (e) {
		var icon = $("#" + $.FM.Const.ICON_SORT_TYPE_ID),
			isAscending = false;
		if (icon.hasClass($.FM.Const.ICON_SORT_ASC) === false) {
			isAscending = true;
		}

		this.collection.sortByType(isAscending);

		return false;
	},

	files_sort_size: function (e) {
		var icon = $("#" + $.FM.Const.ICON_SORT_SIZE_ID),
			isAscending = false;
		if (icon.hasClass($.FM.Const.ICON_SORT_ASC) === false) {
			isAscending = true;
		}

		this.collection.sortBySize(isAscending);

		return false;
	},

	files_filter_handler: function () {
		var pattern = $("#" + $.FM.Const.FILE_NAME_PATTERN).val();

		if (pattern !== "") {
			this.collection.filterByName(pattern);
		}
	}
});