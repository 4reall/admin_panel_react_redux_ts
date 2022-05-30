import React, { ChangeEvent, SetStateAction, Dispatch } from 'react';

interface InputProps {
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
	require?: string;
	type: string;
	name: string;
	className?: string;
	placeholder: string;
}

const Input = ({
	setValue,
	name,
	className = 'form-control',
	...props
}: InputProps) => {
	return (
		<div className="mb-3">
			<label htmlFor={name} className="form-label fs-4">
				The name of the new hero
			</label>
			<input
				{...props}
				onChange={(e) => setValue(e.target.value)}
				className={className}
				name={name}
				id={name}
			/>
		</div>
	);
};

export default Input;
