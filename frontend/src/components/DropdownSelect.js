import React from 'react';
import { Select } from "@material-ui/core";
import { MenuItem } from "@mui/material";
import InputContainer from './InputContainer';

export default function DropdownSelect(props) {
    return (
        <InputContainer
            label={props.label}>
            <Select
                style={{ padding: 5 }}
                value={props.value}
                onChange={props.onChange}>
                {props.options.map((option, i) => {
                    return (
                        <MenuItem
                            key={i}
                            value={option}>
                            {option}
                        </MenuItem>
                    );
                })}
            </Select>
        </InputContainer>
    )
}