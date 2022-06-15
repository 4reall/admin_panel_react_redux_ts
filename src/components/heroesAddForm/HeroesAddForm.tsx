import { Formik, Form, FormikHelpers } from 'formik';
import Input from '../UI/Input/Input';
import Textarea from '../UI/Textarea/Textarea';
import Select from '../UI/Select/Select';
import Button from '../UI/Button/Button';

import { useHttp } from '../../hooks/useHttp';

import * as Yup from 'yup';
import { heroPosted } from '../../store/reducers/heroesSlice';

import { IHero } from '../../types/store';
import { HEROES_URL } from '../../constants';
import { Elements } from '../../types/helpers';
import { useAppDispatch } from '../../hooks/hooks';

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
	const dispatch = useAppDispatch();

	const onSubmit = (values: IHero, actions: FormikHelpers<IHero>) => {
		request(HEROES_URL, 'POST', JSON.stringify({ ...values }))
			.then(() => console.log('Character has been added'))
			.then(() => dispatch(heroPosted({ ...values })))
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
