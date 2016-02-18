$.FM.BookmarksView = $.FM.FilesView.extend({
	tagName: "table",
	className: "bookmarks-list-view",
	parent: $.FM.FilesView,

	initialize: function () {
		_.bindAll(this, "render", "file_remove_handler", "files_sort_name", "files_sort_type", "files_sort_size",
			"files_filter_handler");
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
		renderContent.mode = $.FM.Const.MODE_BOOKMARK;
		renderContent.bookmarksList = collection;

		el.html(this.template(renderContent));

		// Sorting
		if (this.collection.sortField !== undefined) {
			var icon = $.FM.Const.ICON_SORT_ASC;
			if (this.collection.isAscending === false) {
				icon = $.FM.Const.ICON_SORT_DESC;
			}
			$("." + this.collection.sortField).addClass(icon);
		}

		// Filtering
		if (this.collection.filterPattern !== undefined) {
			$("." + $.FM.Const.FILE_NAME_PATTERN).val(this.collection.filterPattern);
		}

		return this;
	},

	render_sort_actions: function (sortField, isAscending) {
		var collection = this.collection.toJSON(),
			el = $(this.el),
			renderContent = {};

		renderContent.mode = $.FM.Const.MODE_BOOKMARK;
		renderContent.sortField = sortField;
		renderContent.isAscending = isAscending;
		renderContent.fileList = collection;

		el.html(this.template(renderContent));

		return this;
	},

	events: {
		"click .file-name-sort": "files_sort_name",
		"click .file-type-sort": "files_sort_type",
		"click .size-sort": "files_sort_size",
		"click .file-name-filter": "files_filter_handler",
		"click #remove-action": "file_remove_handler"
	},

	files_sort_name: function () {
		this.parent.prototype.files_sort_name.call(this);

		return false;
	},

	files_sort_type: function () {
		this.parent.prototype.files_sort_type.call(this);

		return false;
	},

	files_sort_size: function () {
		this.parent.prototype.files_sort_size.call(this);

		return false;
	},

	files_filter_handler: function () {
		this.parent.prototype.files_filter_handler.call(this);

		return false;
	},

	file_remove_handler: function (e) {
		if ($.FM.Components.bookmarksList === undefined || $.FM.Components.bookmarksList === null) {
			throw new ReferenceError("Unresolved dependencies!");
		}

		var clickedFileIndex = parseInt($(e.target).attr($.FM.Const.DATA_INDEX_ATTR_NAME));

		if(confirm("Are you sure you want to delete the bookmark?")) {
			this.collection.models[clickedFileIndex].destroy()
		}

		return false;
	}
});