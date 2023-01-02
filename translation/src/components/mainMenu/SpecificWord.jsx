import React, { useState, useContext, useEffect } from "react";
import { TranslationContext } from "../../context/TranslationContext";
import { SaveContext } from "../../context/SaveContext";
import '../../components/MainRow.css'
import CheckIcon from '@mui/icons-material/Check';
import TextFieldOption from "./TextFieldOption";
import SelectOptions from "./SelectOptions";
import FlagWord from "./FlagWord";

const SpecificWord = ({ rowData }) => {

    const [checked, setChecked] = useState(rowData && rowData.translated ? true : false);
    const [valueToPresent, setValueToPresent] = useState(rowData && rowData.translation);
    const valueFromRow = rowData;
    const [valueSet, setValueSet] = useState([])
    const { translationArray, setTranslationArray } = useContext(TranslationContext)
    const { setPresentPopUp } = useContext(SaveContext)
    const [newTranslationArray, setNewTranslationArray] = useState(translationArray);
    const [options, setOptions] = useState([]);
    const [otherOption, setOtherOption] = useState(false)
    const OTHER = 'Other';
    const [textInput, setTextInput] = useState('');

    const setValues = (value) => {
        setPresentPopUp(false)
        setValueToPresent(value);
        setChecked(true);
        setNewTranslationArray([...translationArray, { id: rowData.id, translation: value, translated: true, flagged: rowData.flagged }]);

    }
    useEffect(() => {
        const keyDownHandler = event => {
            if (event.key === 'Escape') {
                setOtherOption(false);
            }
        };
        document.addEventListener('keydown', keyDownHandler);
        if (valueFromRow && valueSet.length == 0) {
            fetch(`http://localhost:7776/dictionary/translation?regexName=${valueFromRow.englishWord}`)
                .then(response => response.json()).then(data1 => setValueSet(data1)).catch(e => console.error(e))
        }
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
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
            else if (rowData && rowData.translation) {
                newOptions = [{ value: rowData.translation, label: rowData.translation }, ...newOptions]
            }
            else {
                setOtherOption(true);
            }
            newOptions = [{ value: OTHER, label: OTHER }, ...newOptions]
            setOptions(newOptions);
        }
    }, [valueSet]);


    return (
        <div>{rowData && rowData.id && <div className="specificRow">
            {checked && <div className="checked-icon" > <CheckIcon sx={{ color: '#00c853' }} /> </div>}
            <FlagWord translationArray={translationArray} rowData={rowData} setTranslationArray={setTranslationArray} />
            <div className="label">
                {rowData && (rowData.englishWord || rowData.label)}
            </div >
            {<div className="dropDown-wrapper" >
                <div className="App">
                    {
                        otherOption ? <TextFieldOption textInput={textInput} setTextInput={setTextInput} setValueToPresent={setValueToPresent} setValues={setValues} setOptions={setOptions} options={options} setOtherOption={setOtherOption} />
                            : <SelectOptions valueToPresent={valueToPresent} options={options} setValues={setValues} OTHER={OTHER} setOtherOption={setOtherOption} />
                    }
                </div>
            </div>}
        </div>}
        </div>
    )
}
export default SpecificWord;