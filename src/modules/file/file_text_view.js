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
		alert("save");

		return false;
	},

	cancel_handler: function () {
		if(confirm("Are you sure you want to cancel any changes in the file?")) {
			window.history.back();
		}
		return false;
	}
});