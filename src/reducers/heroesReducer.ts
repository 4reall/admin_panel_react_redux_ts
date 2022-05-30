import { IHeroes } from '../types/store';
import { IHeroesFetchAction } from '../types/actions';
import {
	HEROES_FETCHED,
	HEROES_FETCHING,
	HEROES_FETCHING_ERROR,
} from '../constants';
import { Statuses } from '../types/enums';

const initialState: IHeroes = {
	heroes: [],
	heroesLoadingStatus: Statuses.OK,
};

const heroesReducer = (state = initialState, action: IHeroesFetchAction) => {
	switch (action.type) {
		case HEROES_FETCHING:
			return {
				...state,
				heroesLoadingStatus: Statuses.LOADING,
			};
		case HEROES_FETCHED:
			return {
				...state,
				heroes: action.payload,
				heroesLoadingStatus: Statuses.OK,
			};
		case HEROES_FETCHING_ERROR:
			return {
				...state,
				heroesLoadingStatus: Statuses.ERROR,
			};
		default:
			return state;
	}
};

export default heroesReducer;
