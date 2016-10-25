
var dinnerPlannerApp = angular.module('dinnerPlanner', ['ngRoute','ngResource', 'ngCookies']);

dinnerPlannerApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html'
      }).
      when('/search', {
        templateUrl: 'partials/search.html',
        controller: 'SearchCtrl'
      }).
      when('/dish/:dishId', {
        templateUrl: 'partials/dish.html',
        controller: 'DishCtrl'
      }).
      when('/overView', {
        templateUrl: 'partials/dinnerOverview.html',
        controller: 'DinnerCtrl'
      }).
      when('/preparation', {
        templateUrl: 'partials/dinnerInstructions.html',
        controller: 'DinnerCtrl'
      }).

      otherwise({
        redirectTo: '/home'
      });
  }]);