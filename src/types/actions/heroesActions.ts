import {
	HERO_POSTED,
	HEROES_FETCHED,
	HEROES_LOADING,
	HEROES_LOADING_ERROR,
	HERO_DELETED,
} from '../../constants';
import { IHero } from '../store';

export interface IHeroesFetching {
	type: typeof HEROES_LOADING;
}
export interface IHeroesFetched {
	type: typeof HEROES_FETCHED;
	payload: Array<IHero>;
}
export interface IHeroPosted {
	type: typeof HERO_POSTED;
	payload: IHero;
}
export interface IHeroDeleted {
	type: typeof HERO_DELETED;
	payload: number | string;
}
export interface IHeroesFetchingError {
	type: typeof HEROES_LOADING_ERROR;
}
