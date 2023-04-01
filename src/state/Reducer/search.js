import { UPDATE_SEARCH_QUERY } from '../Action/search';
import { foodList } from '../../utils/FoodName';


let selectedFood = '';

function selectRandomFood() {
  const foodIds = Object.keys(foodList);
  const randomIndex = Math.floor(Math.random() * foodIds.length);
  const randomFoodId = foodIds[randomIndex];
  selectedFood = foodList[randomFoodId];
}

selectRandomFood();
setInterval(() => {
  selectRandomFood(); 
}, 24 * 60 * 60 * 1000); 

// console.log(selectedFood)

const initialState = {
  query: selectedFood,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SEARCH_QUERY:
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;