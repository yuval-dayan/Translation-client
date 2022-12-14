import React, { useState, useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
//import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TranslationContext } from "./context/TranslationContext";
import Select from 'react-select';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function DropDown({ rowData, setChecked }) {
    const [valueToPresent, setValueToPresent] = useState(rowData.translation);
    const valueFromRow = rowData;
    const [valueSet, setValueSet] = useState([])
    const { translationArray, setTranslationArray } = useContext(TranslationContext)
    const [newTranslationArray,setNewTranslationArray] = useState(translationArray);
    let [options,setOptions] = useState([]);
    const [otherOption,setOtherOption] = useState(false)
    const OTHER = 'Other';
    const [textInput, setTextInput] = useState('');
    const handleTextInputChange = event => {
        setTextInput(event.target.value);
    };
    const saveNewValue = ()=>{
        let newTranslationArray = [...translationArray, { wordId: rowData.id, translation: textInput }]
        setValueToPresent(textInput);
        setChecked(true);
        setNewTranslationArray(newTranslationArray);
        setOptions([{value:textInput,label:textInput},...options]);
        setOtherOption(false);
        setTextInput('');

    }

    const handleChange = (event) => {
        if(event.value == OTHER)
        {
            setOtherOption(true)
        }
        else{
            let newTranslationArray = [...translationArray, { wordId: rowData.id, translation: event.value }]
            setValueToPresent(event.value);
            setChecked(true);
            setNewTranslationArray(newTranslationArray);
        }

    };
    useEffect(() => {
        if(valueFromRow && valueSet.length == 0){
            fetch(`http://localhost:7779/bulgaria/translation?regexName=${valueFromRow.label}`)
            .then(response => response.json()).then(data1 => setValueSet(data1)).catch(e => console.error(e))
        }
    }, []);
    useEffect(() => {
        if(newTranslationArray.length >0)
        {
            setTranslationArray(newTranslationArray);
            console.log(newTranslationArray);
        }
   
    
    }, [newTranslationArray]);
    useEffect(() => {
        {
        let newOptions =[];
        if(rowData && rowData.translation)
        {
            newOptions = [{value:rowData.translation,label:rowData.translation},{value:'other',label:'other'},...newOptions]
        }
        else
        {
            newOptions = [{value:'other',label:'other'},...newOptions]

        }
        setOptions(newOptions);
        }
   
    
    }, [valueSet]);

    return (
        <div className="App">
       {
        otherOption ? <React.Fragment>
<TextField onChange= {handleTextInputChange}
        value= {textInput}
        id="standard-basic" label="add your new translation" variant="standard" />
        <IconButton color="primary" aria-label="upload picture" component="label" onClick={saveNewValue}><CheckCircleOutlineIcon /></IconButton>
        </React.Fragment> 
        :
        <Select placeholder={valueToPresent}
          defaultValue={valueToPresent}
          onChange={handleChange}
          options={options}
        />}
      </div>
    );
}