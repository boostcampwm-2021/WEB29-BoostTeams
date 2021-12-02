/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { FaSortDown } from 'react-icons/fa';
import { Background, Container, OptionsWrapper } from './style';

interface Props {
	options: string[];
	selectedOption: string | any;
	setSelectedOption: (value: number) => void;
}

const DropDown: React.FC<Props> = ({ options, selectedOption, setSelectedOption }) => {
	const [dropDownOpen, setDropDownOpen] = useState(false);

	const handleDropDownOpen = () => setDropDownOpen(true);
	const handleDropDownClose = () => setDropDownOpen(false);

	const handleOptionClick = (idx: number) => {
		setSelectedOption(idx);
		setDropDownOpen(false);
	};

	return (
		<Container>
			<div onClick={handleDropDownOpen}>
				<span>{selectedOption}</span>
				<FaSortDown />
			</div>
			{dropDownOpen && (
				<>
					<OptionsWrapper>
						{options.map((option, i) => (
							<div key={option} onClick={() => handleOptionClick(i)}>
								{option}
							</div>
						))}
					</OptionsWrapper>
					<Background onClick={handleDropDownClose} />
				</>
			)}
		</Container>
	);
};

export default DropDown;
