// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {
 
 	$scope.loadDish = false;
	$scope.dish = Dinner.Dish.get({id:$routeParams.dishId},function(data){
	$scope.ingredients = data.Ingredients;
	$scope.loadDish = true;
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