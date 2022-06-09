import { useHttp } from '../../hooks/useHttp';

import { heroDeleted, heroesLoadingError } from '../../reducers/heroesSlice';
import { getClassByElement } from '../../helpers/helpers';

import { IHero } from '../../types/store';
import { ElementsClasses } from '../../types/helpers';
import { HEROES_URL } from '../../constants';
import { useAppDispatch } from '../../hooks/hooks';

const elementsClasses: ElementsClasses = {
	all: 'bg-gradient bg-warning',
	fire: 'bg-gradient bg-danger',
	water: 'bg-gradient bg-primary',
	wind: 'bg-gradient bg-info',
	earth: 'bg-gradient bg-success',
};

const HeroesListItem = ({ id, name, description, element }: IHero) => {
	const { request } = useHttp();
	const dispatch = useAppDispatch();
	let elementClassName = getClassByElement(elementsClasses, element);

	const onClick = () => {
		request(`${HEROES_URL}/${id}`, 'DELETE')
			.then(() => console.log('Character has been deleted'))
			.then(() => dispatch(heroDeleted(id)))
			.catch(() => dispatch(heroesLoadingError()));
	};

	return (
		<li
			className={`card flex-row mb-4 shadow-lg text-white ${elementClassName}`}
		>
			<img
				src="http://www.stpaulsteinbach.org/wp-content/uploads/2014/09/unknown-hero.jpg"
				className="img-fluid w-25 d-inline"
				alt="unknown hero"
				style={{ objectFit: 'cover' }}
			/>
			<div className="card-body">
				<h3 className="fs-4 card-title">{name}</h3>
				<p className="fs-6 card-text">{description}</p>
			</div>
			<span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
				<button
					onClick={onClick}
					type="button"
					className="btn-close btn-close"
					aria-label="Close"
				></button>
			</span>
		</li>
	);
};

export default HeroesListItem;
