// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource, $cookieStore) {
 
  // GET DATA FROM BIG OVEN
  var apiKey = "F088t4s6QGI5T92W3Nwiju8jFU52J8SP";
  this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:25,api_key:apiKey}); 

  this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key:apiKey});

  // MENU VARIABLE FROM COOKIES
  var menu = {
    'starter': this.Dish.get({id:$cookieStore.get('starterID')}),
    'main': this.Dish.get({id:$cookieStore.get('mainID')}),
    'dessert':this.Dish.get({id:$cookieStore.get('dessertID')})
  };

  // PENDING DISH RELATED
  var pending = [];

  // Add dish to pending
  this.addToPending = function(dish){
    console.log('dish',dish);
    pending.push(dish);
    console.log(pending);
  };

  // Remove pending dish
  this.removeFromPending = function(){
    while(pending.length > 0) {
      pending.pop();
    }
  }

  // Return pending dish
  this.returnPending = function(){
    return pending;
  }

  // Calculates pending price
  this.getPendingPrice = function(){  
      var pendingPrice = 0;
      if (pending.length !== 0){
      for(x in pending[0].Ingredients){
        var pendingPrice = pendingPrice + pending[0].Ingredients[x].Quantity;
      };
      var pendingPrice = pendingPrice*this.getNumberOfGuests();
      return pendingPrice;
    
    }
    else{return 0}
  }

  //  NUMBER OF GUESTS
  // Updates number of guests 
  this.setNumberOfGuests = function(num) {
    $cookieStore.remove('number')
    $cookieStore.put('number', num);
    if ($cookieStore.get('number') <= 0){
      $cookieStore.remove('number')      
      $cookieStore.put('number', 0);
    }
   }
 
 // Returns number of guests
  this.getNumberOfGuests = function() {
    return $cookieStore.get('number');
  }

  //  MENU RELATED
  //Returns the dish that is on the menu for selected type 
  this.getSelectedDish = function(type) {
    if(menu.starter.Category == type){ 
      return menu.starter.Title;
    }
    if(menu.main.Category == type){
      return menu.main.Title;
    }
    if(menu.dessert.Category == type){
      return menu.dessert.Title;
    }
  }

  //Returns all the dishes on the menu.
  this.getFullMenu = function() {
    for(x in menu){
      if (!(menu[x].Title)){
        menu[x].Title = "None selected";
        menu[x].ImageURL = "images/none.jpg";
        menu[x].description = "Hej hej hej";
      }
    }
    return menu;
  };



  // INGREDIENTS AND PRICE
  //Returns all ingredients for all the dishes on the menu.
  this.getAllIngredients = function(){
    var ingredientList = [];
    for(pos in menu.starter.Ingredients){
      ingredientList.push(menu.starter.Ingredients[pos]);
      }
    for(pos in menu.main.Ingredients){
      ingredientList.push(menu.main.Ingredients[pos]);
      }
    for(pos in menu.dessert.Ingredients){
      ingredientList.push(menu.dessert.Ingredients[pos]);
      }
    return ingredientList;
    }

  //Returns the total price of the menu (all the ingredients multiplied by number of guests).
  this.getTotalMenuPrice = function(allIngredients) {
    var pris = 0;
    for(x in allIngredients){
    var pris = pris + allIngredients[x].Quantity;
      }
    var personer = this.getNumberOfGuests();
    var totalPrice = pris*personer;
    return totalPrice;
  };

  // Calculates total dish price
  this.getTotalDishPrice = function(dish){
    var pris = 0;
    var personer = this.getNumberOfGuests();
    for (x in dish){
    var pris = pris + dish[x].Quantity;
      }
    return pris*personer;
  };


  // Gets all ingredients from menu-dishes
  this.getDishIngredients = function(type){
    var dishIngredientList = [];
    if(type == 'Appetizer'){
    for(pos in menu.starter.Ingredients){
      dishIngredientList.push(menu.starter.Ingredients[pos]);
    }
    }
    if(type == 'Main Dish'){
    for(pos in menu.main.Ingredients){
      dishIngredientList.push(menu.main.Ingredients[pos]);
    }
    }
    if(type == 'Dessert'){
    for(pos in menu.dessert.Ingredients){
      dishIngredientList.push(menu.dessert.Ingredients[pos]);
    }
    }
    return dishIngredientList;
  }


  //Adds the passed dish to the menu from list pending. If the dish of that type already exists on the menu
  //it is removed from the menu and the new one added.
  this.addDishToMenu = function() {
        if(pending[0].Category == 'Appetizers'){
        menu.starter = pending[0];
        $cookieStore.put('starterID', menu.starter.RecipeID)
        }
        if(pending[0].Category == 'Main Dish'){
          menu.main = pending[0];
        $cookieStore.put('mainID', menu.main.RecipeID)

        }
        if(pending[0].Category == 'Desserts'){
          menu.dessert = pending[0];
        $cookieStore.put('dessertID', menu.dessert.RecipeID)
        }
        console.log(menu);
        this.removeFromPending();
  };

  //Removes dish from menu
  this.removeDishFromMenu = function(type) {
    var removeValue = [];
    if (type == "starter"){
      menu.starter = removeValue;
      $cookieStore.remove('starterID');
      }
    if(type == "main"){
      menu.main = removeValue;
      $cookieStore.remove('mainID');
      }
    if(type == "dessert"){
      menu.dessert = removeValue;
      $cookieStore.remove('dessertID');
      }
  }

  return this;

});