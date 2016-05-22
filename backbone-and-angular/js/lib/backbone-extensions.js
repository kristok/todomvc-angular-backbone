/*global Backbone, _ */
'use strict';

Backbone.Model.prototype.export = function() {
	var angularModel = _.clone(this.attributes),
		self = angularModel;

	angularModel.$$backboneModel = this;

	angularModel.$save = function() {
		_.each(self, function(val, key) {
			if (key.match(/^\$/)) {
				return;
			}
			self.$$backboneModel.set(key, val);
		});
		self.$$backboneModel.save();
	};

	angularModel.$import = function() {
		console.log('$import');
		// apply changed attributes to the model
		_.each(this, function(val, key) {
			console.log('should apply change', val, key);
		});

		return this.$$backboneModel;
	};

	return angularModel;
};

Backbone.Collection.prototype.export = function() {
	var result = [],
		exported;

	_.each(this.models, function(model) {
		exported = model.export();
		result.push(exported);
	});

	return result;
};

Backbone.Model.prototype.import = function() {
	// apply changed attributes to the model
	_.each(this, function(val, key) {
		console.log('should apply change', val, key);
	});

	return this.$$backboneModel;
};

// Backbone.Collection.prototype.import = function(model) {
// 	_.each(this.models, function(model) {
// 		model.import();
// 	});
// };

console.log('extended backbone collections');
