// Search controller that we use whenever we have a search inputs
// and search results
dinnerPlannerApp.controller('SearchCtrl', function ($scope,Dinner) {

$scope.search = function(query) {
   $scope.status = "Searching...";
   Dinner.DishSearch.get({title_kw:query},function(data){
     $scope.dishes=data.Results;
     $scope.status = "Showing " + data.Results.length + " results";
   },function(data){
     $scope.status = "There was an error";
   });
 }

 $scope.addToPending =function(RecipeID){
  console.log(RecipeID);
  $scope.getDish = Dinner.Dish.get({id:RecipeID});
   Dinner.addToPending($scope.getDish);
  }

});