// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {
  
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  	$scope.dish = Dinner.Dish.get({id:$routeParams.dishId});
  // Check the app.js to figure out what is the paramName in this case
	$scope.dish = Dinner.Dish.get({id:$routeParams.dishId},function(data){
	$scope.ingredients = data.Ingredients;
	});

	$scope.addToMenu = function(){
		Dinner.addDishToMenu();
	}

	$scope.removePending = function(){
		Dinner.removeFromPending();
	}

	$scope.getDishPrice = function(){
		return Dinner.getTotalDishPrice($scope.dish.Ingredients);
	}

	$scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }
});