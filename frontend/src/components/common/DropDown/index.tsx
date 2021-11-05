/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { FaSortDown } from 'react-icons/fa';
import { Container, OptionsWrapper } from './style';

interface Props {
	options: string[];
	selectedRepeat: string;
	setSelectedOption: any;
}

const DropDown: React.FC<Props> = ({ options, selectedRepeat, setSelectedOption }) => {
	const [dropDownOpen, setDropDownOpen] = useState<boolean>(false);

	const handleDropDownOpen = () => {
		setDropDownOpen(!dropDownOpen);
	};
	const handleOptionClick = (e: any) => {
		setSelectedOption(e.target.dataset.option);
		setDropDownOpen(false);
	};

	return (
		<Container>
			<div onClick={handleDropDownOpen}>
				<span>{selectedRepeat}</span>
				<FaSortDown />
			</div>
			{dropDownOpen && (
				<OptionsWrapper>
					{options.map((option) => (
						<div key={option} data-option={option} onClick={handleOptionClick}>
							{option}
						</div>
					))}
				</OptionsWrapper>
			)}
		</Container>
	);
};

export default DropDown;
