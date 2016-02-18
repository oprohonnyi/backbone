$.FM.FileView = Backbone.View.extend({
	tagName: "div",
	className: "file-view",

	initialize: function () {
		_.bindAll(this, "render", "save_handler", "cancel_handler");
		this.listenTo(this.model, "change", this.render);
		this.template = _.template($("#file-edit-tpl").html());
	},

	render: function () {
		var model = this.model.toJSON(),
			el = $(this.el),
			renderContent = {};

		renderContent.file = model;

		el.html(this.template(renderContent));

		return this;
	},

	events: {
		"click #save": "save_handler",
		"click #cancel": "cancel_handler"
	},

	save_handler: function () {
		var file = {};

		file.id = this.$el.find("#file-id").val();
		file.name = this.$el.find("#insert-filename").val().trim();
		file.content = this.$el.find("#insert-filecontent").val().trim();
		if (file.id !== "") {
			debugger;
			file.size = this.model.calculateFileSize(file.content);
		} else {
			file = new $.FM.FileText(file);
		}

		$.FM.Components.filesList.create(file);

		alert("All changes have been sucessfully saved!");

		window.location = "#files";

		return false;
	},

	cancel_handler: function () {
		if (confirm("Are you sure you want to cancel any changes in the file?")) {
			window.location = "#files";
		}

		return false;
	}
});