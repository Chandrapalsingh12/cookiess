import { createStore, combineReducers } from 'redux';
import searchReducer from './Reducer/search';

const rootReducer = combineReducers({
  search: searchReducer,
});

const store = createStore(rootReducer);

export default store;