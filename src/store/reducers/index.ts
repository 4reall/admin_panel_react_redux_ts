import { combineReducers } from 'redux';
import filtersReducer from './filtersSlice';
import heroesReducer from './heroesSlice';

const reducer = combineReducers({
	filters: filtersReducer,
	heroes: heroesReducer,
});

export default reducer;
