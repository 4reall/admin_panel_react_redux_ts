import { combineReducers } from 'redux';
import filtersReducer from './filtersReducer';
import heroesReducer from './heroesReducer';

const reducer = combineReducers({
	filters: filtersReducer,
	heroes: heroesReducer,
});

export default reducer;
