// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import { Formik, Form, FormikHelpers } from 'formik';
import Input from '../UI/Input/Input';
import Textarea from '../UI/Textarea/Textarea';
import Select from '../UI/Select/Select';
import Button from '../UI/Button/Button';

import { useHttp } from '../../hooks/useHttp';
import { useDispatch } from 'react-redux';

import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { heroPosted } from '../../actions/heroesActions';

import { IHero } from '../../types/store';
import { HEROES_URL } from '../../constants';
import { Elements } from '../../types/enums';

const validationSchema = Yup.object({
	name: Yup.string()
		.min(1, 'The minimum name length is 1 character')
		.max(20, 'The maximum description length is 20 character')
		.required(),
	description: Yup.string()
		.max(300, 'The maximum description length is 30 character')
		.required(),
});

const initialValues: IHero = {
	name: '',
	description: '',
	element: Elements.ALL,
	id: '',
};

const HeroesAddForm = () => {
	const { request } = useHttp();
	const dispatch = useDispatch();

	const onSubmit = (values: IHero, actions: FormikHelpers<IHero>) => {
		const hero = {
			...values,
			id: uuidv4(),
		};
		request(HEROES_URL, 'POST', JSON.stringify(hero))
			.then(() => console.log('Character has been added'))
			.then(() => dispatch(heroPosted(hero)))
			.catch((err) => console.log(err));
		actions.resetForm();
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>
			<Form>
				<Input
					type="text"
					name="name"
					placeholder="Name for character"
				/>
				<Textarea
					name="description"
					placeholder="Description for character"
					style={{ height: '130px' }}
				/>
				<Select type="select" name="element" />
				<Button
					type="submit"
					className="btn-sm btn-primary m-auto d-block"
				>
					create
				</Button>
			</Form>
		</Formik>
	);
};

export default HeroesAddForm;
