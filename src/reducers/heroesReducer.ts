import { IHeroes } from '../types/store';
import { HeroesActions } from '../types/actions';
import {
	HERO_DELETED,
	HERO_POSTED,
	HEROES_FETCHED,
	HEROES_LOADING,
	HEROES_LOADING_ERROR,
} from '../constants';
import { Statuses } from '../types/enums';
import { deleteById } from '../helpers/helpers';

const initialState: IHeroes = {
	heroes: [],
	heroesLoadingStatus: Statuses.OK,
};

const heroesReducer = (state = initialState, action: HeroesActions) => {
	switch (action.type) {
		case HEROES_LOADING:
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
		case HERO_POSTED:
			return {
				...state,
				heroes: [...state.heroes, action.payload],
				heroesLoadingStatus: Statuses.OK,
			};
		case HERO_DELETED:
			return {
				...state,
				heroes: [...deleteById(state.heroes, action.payload)],
				heroesLoadingStatus: Statuses.OK,
			};
		case HEROES_LOADING_ERROR:
			return {
				...state,
				heroesLoadingStatus: Statuses.ERROR,
			};
		default:
			return state;
	}
};

export default heroesReducer;
