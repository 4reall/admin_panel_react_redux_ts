import {
	HERO_DELETED,
	HERO_POSTED,
	HEROES_FETCHED,
	HEROES_LOADING,
	HEROES_LOADING_ERROR,
} from '../constants';
import { HeroesActions } from '../types/actions';
import { IHero } from '../types/store';

export const heroesLoading = (): HeroesActions => {
	return {
		type: HEROES_LOADING,
	};
};

export const heroesFetched = (heroes: Array<IHero>): HeroesActions => {
	return {
		type: HEROES_FETCHED,
		payload: heroes,
	};
};

export const heroPosted = (heroes: IHero): HeroesActions => {
	return {
		type: HERO_POSTED,
		payload: heroes,
	};
};
export const heroDeleted = (id: number | string): HeroesActions => {
	return {
		type: HERO_DELETED,
		payload: id,
	};
};

export const heroesLoadingError = (): HeroesActions => {
	return {
		type: HEROES_LOADING_ERROR,
	};
};
