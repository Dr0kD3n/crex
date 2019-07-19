import React from 'react';
import styled from 'styled-components';
import { Dropdown, Input } from 'semantic-ui-react';

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	margin-bottom: 15px;
	${({style}) => style};
`;

const SInput = styled(Input)`
	* {
		border-top-right-radius: 0 !important;
		border-bottom-right-radius: 0 !important;
		width: 120px !important;
	}
`;

const SDropdown = styled(Dropdown)`
	border-top-left-radius: 0 !important;
	border-bottom-left-radius: 0 !important;
	min-width: 0 !important;
	width: 80px !important;
`;

export default (props) => {
	const { options, value, onChange, type="number", min=1, onCurrencyChange, selectValue, style, className } = props;
	const keys = Object.keys(options);
	const stateOptions = keys.map(e => ({
		key: e,
		value: e,
		text: e
	}));
	return (
		<Wrapper style={style}>
			<SInput
				value={value}
				onChange={onChange}
				type={type}
				min={min}
				className={`input_${className}`}
			/>
			<SDropdown
				placeholder='State'
				search
				selection
				options={stateOptions}
				onChange={onCurrencyChange}
				defaultValue={selectValue}
				className={`dropdown_${className}`}
			/>
		</Wrapper>
	);
};
