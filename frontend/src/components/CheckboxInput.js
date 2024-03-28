import React from 'react';
import InputContainer from './InputContainer';
import { Checkbox } from '@mui/material';

export default function CheckboxInput(props) {
    return (
        <InputContainer
            flexDirection="row"
            label={props.label}>
            <Checkbox
                checked={props.checked}
                onChange={props.onChange}
            />
        </InputContainer>
    )
}