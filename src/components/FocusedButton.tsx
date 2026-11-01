import React, { type ReactNode } from 'react';

interface Props {
	children: ReactNode,
	onClick?: () => void,
	focused?: boolean
}

const FocusedButton = ({ children, onClick, focused = true }: Props) => {
	return (
		<>
			<button className={`${focused ? "bg-green-900/30" : "bg-black/30"} px-6 py-2 rounded-full border border-green-950 cursor-pointer hover:scale-105`} onClick={onClick}>{children}</button>
		</>
	);
};

export default React.memo(FocusedButton);