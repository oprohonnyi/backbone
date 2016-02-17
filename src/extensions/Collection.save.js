Backbone.Collection.prototype.save = function (options) {
	Backbone.sync("create", this, options);
};