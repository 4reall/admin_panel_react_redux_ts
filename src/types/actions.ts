import {
	FILTERS_FETCHED,
	FILTERS_FETCHING,
	FILTERS_FETCHING_ERROR,
	HEROES_FETCHED,
	HEROES_FETCHING,
	HEROES_FETCHING_ERROR,
} from '../constants';
import { IFilters, IHero, IHeroes } from './store';
import { Elements } from './enums';

interface IHeroesFetching {
	type: typeof HEROES_FETCHING;
}
interface IHeroesFetched {
	type: typeof HEROES_FETCHED;
	payload: IHeroes;
}
interface IHeroesFetchingError {
	type: typeof HEROES_FETCHING_ERROR;
}

interface IFiltersFetching {
	type: typeof FILTERS_FETCHING;
}

interface IFiltersFetched {
	type: typeof FILTERS_FETCHED;
	payload: IFilters;
}

interface IFiltersFetchError {
	type: typeof FILTERS_FETCHING_ERROR;
}

export type IHeroesFetchAction =
	| IHeroesFetched
	| IHeroesFetching
	| IHeroesFetchingError;
export type IFiltersFetchAction =
	| IFiltersFetched
	| IFiltersFetchError
	| IFiltersFetching;
