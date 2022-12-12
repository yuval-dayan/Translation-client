import React, { useState, useContext } from "react";
import './MainRow.css'
import { TranslationContext } from "./context/TranslationContext";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const SpecificWord = ({ rowData }) => {

    const [valueSet, setValueSet] = useState([])
    const [selectedValue,setSelectedValue] = useState(rowData.translation);
    const { translationArray, setTranslationArray } = useContext(TranslationContext)
    const openValueSet = (value) => {
        if (valueSet.length == 0) {
            console.log(value);
            let val = value.label;
            if (val == "fires") //will be removed
                val = "fire" //will be removed
            fetch(`http://localhost:7779/bulgaria/translation?regexName=${val}`)
                .then(response => response.json()).then(data1 => setValueSet(data1)).catch(e => console.error(e))
        }

    }

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedValue(event.target.value);
        let newTranslationArray = [...translationArray, { wordId: rowData.id, translation: event.target.value }]
        setTranslationArray(newTranslationArray);
        console.log(newTranslationArray);
      };
    return (
        <div className="specificRow">
            <div>
                {rowData && rowData.label}
            </div>
            {rowData && rowData.translation &&
                <Select  labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedValue} defaultValue={rowData.translation} onClick={() => openValueSet(rowData)} onChange={handleChange}>
                    <MenuItem id={0} value={rowData.translation }>{rowData.translation ? rowData.translation : "SELECT"}</MenuItem>
                    {
                        valueSet.map((v) =>
                            <MenuItem className="select" id={v.id}>{v.translation} </MenuItem>
                        )
                    }
                </Select>}
        </div>
    )
}
export default SpecificWord;