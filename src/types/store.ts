import { Elements, Statuses } from './enums';
import store from '../store';

export interface IHero {
	id: string;
	name: string;
	description: string;
	element: Elements;
}

export interface IHeroesStore {
	heroes: Array<IHero>;
	heroesLoadingStatus: Statuses;
}

export interface IFilters {
	activeFilter: Elements;
	elements: Array<Elements>;
}

export interface IFiltersStore {
	filters: IFilters;
	filtersLoadingStatus: Statuses;
}

export interface IStore {
	heroes: IHeroesStore;
	filters: IFiltersStore;
}

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
