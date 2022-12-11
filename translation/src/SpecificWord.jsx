import React, { useState, useContext } from "react";
import './MainRow.css'
import { TranslationContext } from "./context/TranslationContext";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const SpecificWord = ({ rowData }) => {

    const [valueSet, setValueSet] = useState([])
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

    const saveValue = (e) => {
        let newTranslationArray = [...translationArray, { wordId: rowData.id, translation: e.target.value }]
        setTranslationArray(newTranslationArray);
        console.log(newTranslationArray);
    }
    return (
        <div className="specificRow">
            <div>
                {rowData && rowData.label}
            </div>
            {rowData && rowData.translation &&
                <select className="select" defaultValue={rowData.translation} onClick={() => openValueSet(rowData)} onChange={(e) => { saveValue(e) }}>
                    <option id={0}>{rowData.translation ? rowData.translation : "SELECT"}</option>
                    {
                        valueSet.map((v) =>
                            <option className="select" id={v.id}>{v.translation} </option>
                        )
                    }
                </select>}
        </div>
    )
}
export default SpecificWord;