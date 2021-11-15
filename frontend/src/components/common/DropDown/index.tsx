/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { FaSortDown } from 'react-icons/fa';
import { Container, OptionsWrapper } from './style';

interface Props {
	options: string[];
	selectedOption: string;
	setSelectedOption: React.Dispatch<React.SetStateAction<number>>;
}

const DropDown: React.FC<Props> = ({ options, selectedOption, setSelectedOption }) => {
	const [dropDownOpen, setDropDownOpen] = useState<boolean>(false);

	const handleDropDownOpen = () => {
		setDropDownOpen(!dropDownOpen);
	};
	const handleOptionClick = (e: React.MouseEvent<HTMLElement>) => {
		setSelectedOption(Number(e.currentTarget.dataset.option));
		setDropDownOpen(false);
	};

	return (
		<Container>
			<div onClick={handleDropDownOpen}>
				<span>{selectedOption}</span>
				<FaSortDown />
			</div>
			{dropDownOpen && (
				<OptionsWrapper>
					{options.map((option, i) => (
						<div key={option} data-option={i} onClick={handleOptionClick}>
							{option}
						</div>
					))}
				</OptionsWrapper>
			)}
		</Container>
	);
};

export default DropDown;
