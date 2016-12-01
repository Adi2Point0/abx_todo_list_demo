angular.module('todoController', [])
  .controller('mainController', ['$scope', '$http', 'Todos', function($scope, $http, Todos) {
    $scope.formData = {};
    $scope.loading = true;

    Todos.get()
      .success(function(data) {
        $scope.todos = data;
        $scope.loading = false;
      });

    $scope.createTodo = function() {
      if ($scope.formData.text != undefined) {
        for (var i = 0; i < $scope.todos.length; i++) {
          if($scope.todos[i].text === $scope.formData.text) {
            alert("That todo is already on the list!");
            return;
          }
        }
        $scope.loading = true;
        Todos.create($scope.formData)
          .success(function(data) {
            $scope.loading = false;
            $scope.formData = {};
            $scope.todos = data;
          });
      }
    };

    $scope.deleteTodo = function(id) {
      $scope.loading = true;

      Todos.delete(id)
        .success(function(data) {
          $scope.loading = false;
          $scope.todos = data;
        });
    };
  }]);
