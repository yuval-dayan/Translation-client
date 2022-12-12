import React, { useState, useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TranslationContext } from "./context/TranslationContext";

export default function DropDown({ rowData, setChecked }) {
    const [valueToPresent, setValueToPresent] = useState('');
    const valueFromRow = rowData;
    const [valueSet, setValueSet] = useState([])
    const { translationArray, setTranslationArray } = useContext(TranslationContext)


    const handleChange = (event: SelectChangeEvent) => {
        setValueToPresent(event.target.value);
        setChecked(true);
        let newTranslationArray = [...translationArray, { wordId: rowData.id, translation: event.target.value }]
        setTranslationArray(newTranslationArray);
        console.log(newTranslationArray);

    };
    useEffect(() => {
        if(valueFromRow){
            fetch(`http://localhost:7779/bulgaria/translation?regexName=${valueFromRow.label}`)
            .then(response => response.json()).then(data1 => setValueSet(data1)).catch(e => console.error(e))
        }


    }, []);

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{valueToPresent ? valueToPresent : rowData.translation}</InputLabel>


                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={valueToPresent}
                    label={valueToPresent}
                    onChange={handleChange}
                >
                    <MenuItem value={rowData.translation}>{rowData.translation}</MenuItem>
                    {
                        valueSet.map((v,index) =>
                            <MenuItem key={`menuItemId${(v && v.id)?v.id : `menuItemIdFromIndex${index}`}`} value={v.translation}>{v.translation}</MenuItem>
                        )
                    }
                </Select>

            </FormControl>

        </Box>
    );
}