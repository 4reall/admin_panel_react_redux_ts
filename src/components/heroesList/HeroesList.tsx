import HeroesListItem from '../heroesListItem/HeroesListItem';
import Spinner from '../spinner/Spinner';

import { useHttp } from '../../hooks/useHttp';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	heroesFetched,
	heroesLoading,
	heroesLoadingError,
} from '../../actions/heroesActions';

import { IHero, IStore } from '../../types/store';
import { Elements, Statuses } from '../../types/enums';
import { HEROES_URL } from '../../constants';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
	const { heroes, heroesLoadingStatus } = useSelector(
		({ heroes }: IStore) => heroes
	);
	const { filters } = useSelector(({ filters }: IStore) => filters);
	const dispatch = useDispatch();
	const { request } = useHttp();

	useEffect(() => {
		dispatch(heroesLoading());
		request<Array<IHero>>(HEROES_URL)
			.then((data) => dispatch(heroesFetched(data)))
			.catch(() => dispatch(heroesLoadingError()));

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

		const filteredItems = heroes.filter(
			(hero) =>
				hero.element === filters.activeFilter ||
				filters.activeFilter === Elements.ALL
		);

		return filteredItems.map(({ id, ...props }) => {
			return <HeroesListItem key={id} id={id} {...props} />;
		});
	};

	const elements = renderHeroesList(heroes);
	return <ul>{elements}</ul>;
};

export default HeroesList;
