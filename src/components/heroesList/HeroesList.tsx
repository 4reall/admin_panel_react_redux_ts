import HeroesListItem from '../heroesListItem/HeroesListItem';
import Spinner from '../spinner/Spinner';

import { useEffect } from 'react';

import { IHero, IStore } from '../../types/store';
import { Elements, Statuses } from '../../types/enums';
import { createSelector } from 'reselect';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchHeroes } from '../../reducers/heroesSlice';

const HeroesList = () => {
	const store = createSelector(
		(state: IStore) => state.filters.filters.activeFilter,
		(state: IStore) => state.heroes,
		(filter, heroes) => ({ filter, heroes })
	);

	const { filter, heroes } = useAppSelector(store);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchHeroes());
		// eslint-disable-next-line
	}, []);

	if (heroes.heroesLoadingStatus === Statuses.LOADING) {
		return <Spinner />;
	} else if (heroes.heroesLoadingStatus === Statuses.ERROR) {
		return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
	}

	const renderHeroesList = (heroes: Array<IHero>) => {
		if (heroes.length === 0) {
			return <h5 className="text-center mt-5">Героев пока нет</h5>;
		}

		const filteredItems = heroes.filter(
			(hero) => hero.element === filter || filter === Elements.ALL
		);

		return filteredItems.map(({ id, ...props }) => {
			return <HeroesListItem key={id} id={id} {...props} />;
		});
	};

	const elements = renderHeroesList(heroes.heroes);
	return <ul>{elements}</ul>;
};

export default HeroesList;
