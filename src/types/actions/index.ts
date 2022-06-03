import {
	IHeroDeleted,
	IHeroesFetched,
	IHeroesFetching,
	IHeroesFetchingError,
	IHeroPosted,
} from './heroesActions';
import {
	IFilterChanged,
	IFiltersFetched,
	IFiltersFetchError,
	IFiltersFetching,
} from './filtersActions';

export type HeroesActions =
	| IHeroesFetched
	| IHeroPosted
	| IHeroesFetching
	| IHeroesFetchingError
	| IHeroDeleted;

export type FiltersActions =
	| IFiltersFetched
	| IFiltersFetchError
	| IFilterChanged
	| IFiltersFetching;
