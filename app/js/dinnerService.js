// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource) {
  
  this.number = 4;


  //Meny för alla valda recept att stoppas i
  var menu = {'starter':[],'main':[],'dessert':[]};
  var pending = [];


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


  this.addToPending = function(dish){
    console.log('dish',dish);
    pending.push(dish);
    console.log(pending);
  };

  this.removeFromPending = function(){
    while(pending.length > 0) {
      pending.pop();
    }
  }

  this.returnPending = function(){
    return pending;
  }


//  ANTAL GÄSTER-RELATERAT
  this.setNumberOfGuests = function(num) {
    this.number = num;
    if (this.number <= 0){
      this.number=0;
    }
  }
 
  this.getNumberOfGuests = function() {
    return this.number;
  }

//  MENYRELATERAET

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

// INGREDIENSER OCH PRIS 

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
  //FUNKAR
  this.getTotalMenuPrice = function(allIngredients) {
    var pris = 0;
    for(x in allIngredients){
    var pris = pris + allIngredients[x].Quantity;
      }
    var personer = this.getNumberOfGuests();
    var totalPrice = pris*personer;
    return totalPrice;
  };

  this.getTotalDishPrice = function(dish){
    var pris = 0;
    var personer = this.getNumberOfGuests();
    for (x in dish){
    var pris = pris + dish[x].Quantity;
      }
    return pris*personer;
  };


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

// LÄGG TILL OCH TA BORT FRÅN MENY

  //Adds the passed dish to the menu from list pending. If the dish of that type already exists on the menu
  //it is removed from the menu and the new one added.
  this.addDishToMenu = function() {
        if(pending[0].Category == 'Appetizers'){
        menu.starter = pending[0];

        }
        if(pending[0].Category == 'Main Dish'){
          menu.main = pending[0];
        }
        if(pending[0].Category == 'Desserts'){
          menu.dessert = pending[0];
        }
        console.log(menu);
        this.removeFromPending();
  };

  //Removes dish from menu
  //FUNKAR
  this.removeDishFromMenu = function(type) {
    var removeValue = [];
    if (type == "starter"){
      menu.starter = removeValue;
      }
    if(type == "main"){
      menu.main = removeValue;
      }
    if(type == "dessert"){
      menu.dessert = removeValue;
      }
  }

//  HÄMTA FRÅN BIG OVEN 
var apiKey = "XKEdN82lQn8x6Y5jm3K1ZX8L895WUoXN";
this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:25,api_key:apiKey}); 

this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key:apiKey});
// TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes) 
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details



  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});