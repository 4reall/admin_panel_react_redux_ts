// export interface Filters {
//
//
// }

import { Elements, Statuses } from './enums';

export interface IFilters {
	filters: Array<Elements>;
	filtersLoadingStatus: Statuses;
}

export interface IHero {
	id: number;
	name: string;
	description: string;
	element: Elements;
}

export interface IHeroes {
	heroes: Array<IHero>;
	heroesLoadingStatus: Statuses;
}

export interface IStore {
	heroes: IHeroes;
	filters: IFilters;
}
