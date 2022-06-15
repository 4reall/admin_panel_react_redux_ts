import { Elements, Statuses } from './helpers';
import store from '../store/store';
import { EntityState } from '@reduxjs/toolkit';

export interface IFilter {
	element: Elements;
	id: number | string;
}

export type Filters = IFilter[];

export interface IHero {
	id: string;
	name: string;
	description: string;
	element: Elements;
}

export type Heroes = IHero[];

export interface IHeroesState extends EntityState<IHero> {
	heroesLoadingStatus: Statuses;
}
export interface IFiltersState extends EntityState<IFilter> {
	activeFilter: Elements;
	filtersLoadingStatus: Statuses;
}

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
