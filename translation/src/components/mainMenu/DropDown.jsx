import React, { useState, useContext, useEffect } from 'react';
import { TranslationContext } from "../../context/TranslationContext";
import Select from 'react-select';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function DropDown({ rowData, setChecked }) {
    const [valueToPresent, setValueToPresent] = useState(rowData.translation);
    const valueFromRow = rowData;
    const [valueSet, setValueSet] = useState([])
    const { translationArray, setTranslationArray } = useContext(TranslationContext)
    const [newTranslationArray, setNewTranslationArray] = useState(translationArray);
    let [options, setOptions] = useState([]);
    const [otherOption, setOtherOption] = useState(false)
    const OTHER = 'Other';
    const [textInput, setTextInput] = useState('');
    const handleTextInputChange = event => {
        setTextInput(event.target.value);
    };
    const saveNewValue = () => {
        setValueToPresent(textInput);
        setChecked(true);
        setNewTranslationArray([...translationArray, { wordId: rowData.id, translation: textInput, translated: true }]);
        setOptions([{ value: textInput, label: textInput }, ...options]);
        setOtherOption(false);
        setTextInput('');

    }

    const handleChange = (event) => {
        if (event.value == OTHER) {
            setOtherOption(true)
        }
        else {
            setValueToPresent(event.value);
            setChecked(true);
            setNewTranslationArray([...translationArray, { wordId: rowData.id, translation: event.value, translated: true }]);

        }

    };
    const onkeyPress = (event) => {
        if (event.key == "Enter") {
            saveNewValue();
        }

    }
    useEffect(() => {
        const keyDownHandler = event => {
            if (event.key === 'Escape') {
                setOtherOption(false);
            }
        };
        document.addEventListener('keydown', keyDownHandler);
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, []);
    useEffect(() => {
        if (valueFromRow && valueSet.length == 0) {
            fetch(`http://localhost:7779/bulgaria/translation?regexName=${valueFromRow.englishWord}`)
                .then(response => response.json()).then(data1 => setValueSet(data1)).catch(e => console.error(e))
        }
    }, []);
    useEffect(() => {
        if (newTranslationArray.length > 0) {
            setTranslationArray(newTranslationArray);
            console.log(newTranslationArray);
        }


    }, [newTranslationArray]);
    useEffect(() => {
        {
            let newOptions = [];
            if (valueSet.length > 0) {

                for (let i = 0; i < valueSet.length; i++) {
                    newOptions[i] = { value: valueSet[i].translation, label: valueSet[i].translation }
                }
            }
            else if(rowData && rowData.translation)
            {
                newOptions = [{ value: rowData.translation, label: rowData.translation }, ...newOptions]

            }
            
            newOptions = [{ value: OTHER, label: OTHER }, ...newOptions]
            
            setOptions(newOptions);


        }


    }, [valueSet]);

    return (
        <div className="App">
            {
                otherOption ? <div className='other-translation'>
                    <div className='other-translation-new-word'>
                        <TextField fullWidth onChange={handleTextInputChange} onKeyPress={onkeyPress}
                            value={textInput}
                            inputRef={input => input && input.focus()}
                            id="standard-basic" label="add your new translation" variant="standard" />
                    </div>
                    <div>
                        <IconButton color="primary" aria-label="upload picture" component="label" onKeyDown={saveNewValue} onClick={saveNewValue}><CheckCircleOutlineIcon /></IconButton>
                    </div>
                </div>
                    :
                    <Select placeholder={valueToPresent}
                        defaultValue={valueToPresent}
                        onChange={handleChange}
                        options={options}
                    />}
        </div>
    );
}