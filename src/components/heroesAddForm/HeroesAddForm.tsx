// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import Input from '../UI/Input/Input';
import Textarea from '../UI/Textarea/Textarea';
import Select from '../UI/Select/Select';
import Button from '../UI/Button/Button';
import { useEffect, useState } from 'react';

const HeroesAddForm = () => {
	const [input, setInput] = useState('');
	const [text, setText] = useState('');
	const [select, setSelect] = useState('');
	const onSubmit = () => {};

	return (
		<form className="border p-4 shadow-lg rounded">
			<Input
				value={input}
				setValue={setInput}
				require={'true'}
				type="text"
				name="textInput"
				placeholder="What is my name"
			/>
			<Textarea
				value={text}
				setValue={setText}
				require={'true'}
				name="text"
				placeholder="What i can do?"
				style={{ height: '130px' }}
			/>
			<Select
				value={select}
				setValue={setSelect}
				require={'true'}
				name="select"
			/>
			<Button type="submit" className="btn btn-primary">
				create
			</Button>
		</form>
	);
};

export default HeroesAddForm;
