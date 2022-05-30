import React, { ReactNode } from 'react';

interface ButtonProps {
	children: ReactNode;
	type: 'submit' | 'reset' | 'button' | undefined;
	className: string;
}

const Button = ({ children, ...props }: ButtonProps) => {
	return <button {...props}>{children}</button>;
};

export default Button;
