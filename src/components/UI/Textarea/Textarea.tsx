import React, { Dispatch, SetStateAction } from 'react';

interface TextareaProps {
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
	require?: string;
	name: string;
	className?: string;
	placeholder: string;
	style: object;
}

const Textarea = ({
	name,
	setValue,
	className = 'form-control',
	...props
}: TextareaProps) => {
	return (
		<div className="mb-3">
			<label htmlFor={name} className="form-label fs-4">
				Description
			</label>
			<textarea
				{...props}
				onChange={(e) => setValue(e.target.value)}
				name={name}
				className={className}
				id={name}
			/>
		</div>
	);
};

export default Textarea;
