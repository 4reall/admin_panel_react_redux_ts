import { FILTERS_URL, HEROES_URL } from '../constants';
import {
	heroesLoading,
	heroesFetched,
	heroesLoadingError,
} from '../reducers/heroesSlice';
import { IFilters, IHero } from '../types/store';
import { Dispatch } from 'react';
import {
	filtersFetched,
	filtersLoading,
	filtersLoadingError,
} from '../reducers/filtersSlice';

export const fetchHeroes =
	(request: <T>(url: string) => Promise<T>) => (next: Dispatch<any>) => {
		next(heroesLoading());
		request<IHero[]>(HEROES_URL)
			.then((data) => next(heroesFetched(data)))
			.catch(() => next(heroesLoadingError()));
	};

export const filtersFetch =
	(request: <T>(url: string) => Promise<T>) => (next: Dispatch<any>) => {
		next(filtersLoading());
		request<IFilters>(FILTERS_URL)
			.then((data) => next(filtersFetched(data)))
			.catch(() => next(filtersLoadingError()));
	};
