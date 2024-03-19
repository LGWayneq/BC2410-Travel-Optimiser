import React from 'react';
import InputContainer from './InputContainer';
import { TextField } from '@mui/material';

export default function TextInput(props) {
    return (
        <InputContainer
            label={props.label}>
            <TextField
                value={props.value}
                onChange={props.onChange}
                InputProps={{
                    startAdornment: props.startAdornment
                }}
                type={props.type}
            />
        </InputContainer>
    )
}