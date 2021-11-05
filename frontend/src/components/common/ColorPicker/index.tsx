import React, { useState } from 'react';
import { Container, ColorDropDown, ColorCircle } from './style';
import { PrimaryPalette } from '../../../utils/constants';

interface Props {
	selectedColor: number;
	setSelectedColor: any;
}

const ColorPicker: React.FC<Props> = ({ selectedColor, setSelectedColor }) => {
	const [dropDownOpen, setDropDownOpen] = useState<boolean>(false);

	const handleDropDownOpen = () => {
		setDropDownOpen(!dropDownOpen);
	};

	// React.MouseEvent<HTMLElement> 타입으로 하면 dataset을 이용 못한다..
	const handleColorClick = (e: any) => {
		setSelectedColor(e.target.dataset.color);
	};

	return (
		<Container onClick={handleDropDownOpen}>
			<ColorCircle color={PrimaryPalette[selectedColor]} />
			{dropDownOpen && (
				<ColorDropDown>
					{PrimaryPalette.map((colorCode, i) => (
						<ColorCircle key={colorCode} color={colorCode} data-color={i} onClick={handleColorClick} />
					))}
				</ColorDropDown>
			)}
		</Container>
	);
};

export default ColorPicker;
