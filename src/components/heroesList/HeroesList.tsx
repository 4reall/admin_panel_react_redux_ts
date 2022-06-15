import HeroesListItem from '../heroesListItem/HeroesListItem';
import Spinner from '../spinner/Spinner';

import { useEffect } from 'react';

import { IHero, RootState } from '../../types/store';
import { Statuses } from '../../types/helpers';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
	fetchHeroes,
	filteredHeroesSelector,
} from '../../store/reducers/heroesSlice';

const HeroesList = () => {
	const heroesLoadingStatus = useAppSelector(
		(state: RootState) => state.heroes.heroesLoadingStatus
	);
	const heroes = useAppSelector(filteredHeroesSelector);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchHeroes());
		// eslint-disable-next-line
	}, []);

	if (heroesLoadingStatus === Statuses.LOADING) {
		return <Spinner />;
	} else if (heroesLoadingStatus === Statuses.ERROR) {
		return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
	}

	const renderHeroesList = (heroes: Array<IHero>) => {
		if (heroes.length === 0) {
			return <h5 className="text-center mt-5">Героев пока нет</h5>;
		}

		return heroes.map(({ id, ...props }) => {
			return <HeroesListItem key={id} id={id} {...props} />;
		});
	};

	const elements = renderHeroesList(heroes);
	return <ul>{elements}</ul>;
};

export default HeroesList;
