import React from "react";
import Select from 'react-select';
import '../../components/MainRow.css'

const SelectOptions = ({ valueToPresent, setOtherOption, setValues, OTHER, options }) => {
    const handleChange = (event) => {
        if (event.value == OTHER) {
            setOtherOption(true)
        }
        else {
            setValues(event.value)
        }
    };

    return (
        <Select placeholder={valueToPresent}
            defaultValue={valueToPresent}
            onChange={handleChange}
            options={options}
            sx={{ backgroundColor: 'red' }}
        />
    )
}
export default SelectOptions;