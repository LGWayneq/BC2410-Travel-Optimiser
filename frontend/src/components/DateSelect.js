import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputContainer from './InputContainer';

export default function DateSelect(props) {
    return (
        <InputContainer style={props.style} label={props.label}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker
                        value={props.value}
                        onChange={props.onChange} />
                </DemoContainer>
            </LocalizationProvider>
        </InputContainer>
    )
}