import {
	HEROES_FETCHED,
	HEROES_FETCHING,
	HEROES_FETCHING_ERROR,
	FILTERS_FETCHED,
	FILTERS_FETCHING_ERROR,
	FILTERS_FETCHING,
} from '../constants';
import { IFiltersFetchAction, IHeroesFetchAction } from '../types/actions';
import { IFilters, IHero, IHeroes } from '../types/store';

export const heroesFetching = (): IHeroesFetchAction => {
	return {
		type: HEROES_FETCHING,
	};
};

export const heroesFetched = (heroes: IHeroes): IHeroesFetchAction => {
	return {
		type: HEROES_FETCHED,
		payload: heroes,
	};
};

export const heroesFetchingError = (): IHeroesFetchAction => {
	return {
		type: HEROES_FETCHING_ERROR,
	};
};

export const filtersFetching = (): IFiltersFetchAction => {
	return {
		type: FILTERS_FETCHING,
	};
};

export const filtersFetched = (heroes: IFilters): IFiltersFetchAction => {
	return {
		type: FILTERS_FETCHED,
		payload: heroes,
	};
};

export const filtersFetchingError = (): IFiltersFetchAction => {
	return {
		type: FILTERS_FETCHING_ERROR,
	};
};
