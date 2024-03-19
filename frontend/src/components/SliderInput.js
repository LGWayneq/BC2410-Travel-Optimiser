import React from 'react';
import Slider from '@mui/material/Slider';
import InputContainer from './InputContainer';

export default function SliderInput(props) {
    return (
        <InputContainer label={props.label}>
            <Slider
                step={1}
                marks
                min={0}
                max={10}
                valueLabelDisplay="auto"
                value={props.value}
                onChange={props.onChange}
            />
        </InputContainer>
    )
}