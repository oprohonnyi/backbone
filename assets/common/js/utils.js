$.FM.Utils = function() {
	var Utils = function() {

	};
	this._instance = null;

	this.getInstance = function(){
		if(this._instance === null) {
			this._instance = new Utils();
		}

		return this._instance;
	}
};