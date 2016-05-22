/*global _, app, angular */
'use strict';

/**
 * The main controller for the app. The controller:
 * - exposes the model to the template and provides event handlers
 */
angular.module('todomvc', []).controller('Todo',
function TodoCtrl(
	$scope,
	$location,
	$timeout
	//,$firebaseArray
) {

	// always use within digest cycle
	function render() {
		// remove the ones that don't match the filter
		$scope.todos = _.filter(
			app.todos.export(),
			function(todo) {
				if (!app.TodoFilter) {
					return true;
				}
				if (todo.completed && app.TodoFilter === 'completed') {
					return true;
				}
				if (!todo.completed && app.TodoFilter === 'active') {
					return true;
				}
				return false;
			}
		);
		$scope.todos = app.todos.export();
		$scope.totalCount = $scope.todos.length;
	}

	// render todos
	app.todos.on('all', function(eventName) {
		console.log('event', eventName); $timeout(render, 0);
	});

	// was originally initiated from backbone view
	// load all todos
	app.todos.fetch({reset: true});
	//var url = 'https://todomvc-angular.firebaseio.com/todos';
	//var fireRef = new Firebase(url);

	$scope.addTodo = function () {
		app.todos.create({
			title: $scope.newTodo,
			order: app.todos.nextOrder(),
			completed: false
		});
	};

	$scope.newTodo = '';
	$scope.editedTodo = null;

	$scope.removeTodo = function (todo) {
		todo.$import().destroy();
	};

	$scope.editTodo = function (todo) {
		$scope.editedTodo = todo;
		$scope.originalTodo = angular.extend({}, $scope.editedTodo);
	};

	$scope.doneEditing = function (todo) {
		$scope.editedTodo = null;
		var title = todo.title.trim();
		if (title) {
			todo.$save();
		} else {
			$scope.removeTodo(todo);
		}
	};

	$scope.revertEditing = function (todo) {
		todo.title = $scope.originalTodo.title;
		$scope.doneEditing(todo);
	};


	$scope.clearCompletedTodos = function () {
		$scope.todos.forEach(function (todo) {
			if (todo.completed) {
				$scope.removeTodo(todo);
			}
		});
	};

	$scope.markAll = function (allCompleted) {
		$scope.todos.forEach(function (todo) {
			todo.completed = allCompleted;
			todo.$save();
		});
	};

});
