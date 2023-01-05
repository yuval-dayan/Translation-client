import React, { useState, useContext, useEffect,useRef } from "react";
import { TranslationContext } from "../../context/TranslationContext";
import { SaveContext } from "../../context/SaveContext";
import '../mainMenu/style/mainMenu.css'
import CheckIcon from '@mui/icons-material/Check';
import TextFieldOption from "./TextFieldOption";
import SelectOptions from "./SelectOptions";
import FlagWord from "./FlagWord";
import { setTranslationArrayWithNewWord } from "../../Helpers/translationArrayHelper";
import { getValueFromDictionary } from "../../Helpers/DbHelper";

const SpecificWord = ({ rowData}) => {

    const [checkedColor, setCheckedColor] = useState(rowData && rowData.translated ? "#00c853" : "#616161")
    const [checked, setChecked] = useState(rowData && rowData.translated ? true : false);
    const [valueToPresent, setValueToPresent] = useState(rowData && rowData.translation);
    const valueFromRow = rowData;
    const [valueSet, setValueSet] = useState([])
    const { translationArray, setTranslationArray } = useContext(TranslationContext)
    const { setPresentPopUp } = useContext(SaveContext)
    const [options, setOptions] = useState([]);
    const [otherOption, setOtherOption] = useState(false)
    const OTHER = 'Other';
    const [textInput, setTextInput] = useState('');

    const setValues = (value) => {
        setPresentPopUp(false)
        setValueToPresent(value);
        setChecked(true);
        setCheckedColor("#00c853")
        setTranslationArrayWithNewWord(translationArray,rowData,value,setTranslationArray);
    }
    const setValuesAndColors = (value) => {
        setPresentPopUp(false)
        setValueToPresent(value);
        setChecked(true);
        setCheckedColor("#00c853")
    }

    const saveOptionAsValue = () => {
        setValuesAndColors(valueToPresent);
        setValues(valueToPresent);
    }
    useEffect(() => {
        const keyDownHandler = event => {
            if (event.key === 'Escape') {
                setOtherOption(false);
            }
        };

        document.addEventListener('keydown', keyDownHandler);
        if (valueFromRow && valueSet.length == 0) {
            getValueFromDictionary(setValueSet,valueFromRow.englishWord)
        }
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, []);


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
            {(checked || options.length >1) && <div className="checked-icon" > <CheckIcon sx={{ color: `${checkedColor}`  } }  onClick={saveOptionAsValue}/> </div>}
            <FlagWord translationArray={translationArray} rowData={rowData} setTranslationArray={setTranslationArray} setPresentPopUp={setPresentPopUp} />
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