import { drinkNames } from "./FoodName";

export let selectedDrinks = '';

function selectRandomDrinks() {
  const foodIds = Object.keys(drinkNames);
  const randomIndex = Math.floor(Math.random() * foodIds.length);
  const randomFoodId = foodIds[randomIndex];
  selectedDrinks = drinkNames[randomFoodId];

}

selectRandomDrinks();
setInterval(() => {
  selectRandomDrinks(); 
},5*5000); 