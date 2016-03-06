// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner) {

  $scope.numberOfGuests = Dinner.getNumberOfGuests();

  $scope.setNumberOfGuest = function(number){
    Dinner.setNumberOfGuests(number);
  }


  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }

  $scope.addDishToMenu = function(){
	Dinner.addDishToMenu();
}
	$scope.getPending = function(){
		return Dinner.returnPending();
	}

  $scope.getFullMenu = Dinner.getFullMenu();

  $scope.checkStarterMenu = function(){
    if ($scope.getFullMenu.starter.Title == 'None selected'){
      $scope.getFullMenu = Dinner.getFullMenu();
      return true;
    }
  }

  $scope.checkMainMenu = function(){
    if ($scope.getFullMenu.main.Title == 'None selected'){
      $scope.getFullMenu = Dinner.getFullMenu();
      return true;
    }
  }

  $scope.checkDessertMenu = function(){
    if ($scope.getFullMenu.dessert.Title == 'None selected'){
      $scope.getFullMenu = Dinner.getFullMenu();
      return true;
    }
  }

  $scope.removeDish = function(type){
    Dinner.removeDishFromMenu(type);
    console.log(type);
  }

$scope.getPendingPrice = function(){
  return Dinner.getPendingPrice();
}

$scope.getPrice = function(ingredientsList){
  return Dinner.getTotalDishPrice(ingredientsList);
}
  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price

});