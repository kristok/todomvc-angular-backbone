/*global $ */
/*global angular */
/*jshint unused:false */
var app = app || {};
var ENTER_KEY = 13;
var ESC_KEY = 27;

$(function () {
	'use strict';

	// kick things off by creating the `App`

	//new app.AppView();

	/**
	 * The main TodoMVC app module
	 *
	 * @type {angular.Module}
	 */
	var todomvc = angular.module('todomvc');

	//<li ng-repeat="(id, todo) in todos | todoFilter"

	todomvc.filter('todoFilter', function ($location) {
		return function (input) {
			var filtered = {};
			angular.forEach(input, function (todo, id) {
				var path = $location.path();
				if (path === '/active') {
					if (!todo.completed) {
						filtered[id] = todo;
					}
				} else if (path === '/completed') {
					if (todo.completed) {
						filtered[id] = todo;
					}
				} else {
					filtered[id] = todo;
				}
			});
			return filtered;
		};
	});

	// var todomvc = angular.module('todomvc', ['firebase']);
});

