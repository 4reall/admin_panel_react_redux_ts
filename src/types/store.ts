import { Elements, Statuses } from './enums';

export interface IHero {
	id: number | string;
	name: string;
	description: string;
	element: Elements;
}

export interface IHeroes {
	heroes: Array<IHero>;
	heroesLoadingStatus: Statuses;
}

export interface IFilters {
	filters: {
		activeFilter: Elements;
		elements: Array<Elements>;
	};
	filtersLoadingStatus: Statuses;
}

export interface IStore {
	heroes: IHeroes;
	filters: IFilters;
}
