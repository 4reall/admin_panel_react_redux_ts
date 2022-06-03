import { IHero } from '../types/store';
import { Elements } from '../types/enums';
import { ElementsClasses } from '../types/helpers';

export const getClassByElement = (
	elementsClasses: ElementsClasses,
	element: Elements
): string => {
	switch (element) {
		case Elements.FIRE:
			return elementsClasses.fire;
		case Elements.WATER:
			return elementsClasses.water;
		case Elements.WIND:
			return elementsClasses.wind;
		case Elements.EARTH:
			return elementsClasses.earth;
		default:
			return elementsClasses.all;
	}
};

export const filterByElement = (
	arr: Array<IHero>,
	element: string
): Array<IHero> => {
	return arr.filter((item) => item.element === element);
};

export const deleteById = (
	arr: Array<IHero>,
	id: number | string
): Array<IHero> => {
	return arr.filter((item) => item.id !== id);
};
