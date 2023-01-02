import React from "react";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import '../../components/MainRow.css'

const TextFieldOption = ({textInput,setTextInput,setValueToPresent,setValues,setOptions,options,setOtherOption}) => {
   
    const handleTextInputChange = event => {
        setTextInput(event.target.value);
    };
    const onkeyPress = (event) => {
        if (event.key == "Enter") {
            saveNewValue();
        }
        setValueToPresent(event.target.value);


    }
    const saveNewValue = () => {
        if(textInput.length >0)
        {
            setValues(textInput)
            setOptions([{ value: textInput, label: textInput }, ...options]);
            setOtherOption(false);
            setTextInput('');
        }
    }
    return (
        <div className='other-translation'>
                    <div className='other-translation-new-word'>
                        <TextField  fullWidth onChange={handleTextInputChange} onKeyPress={onkeyPress}
                            value={textInput}
                           className="other-translation-specific-row"
                            id="standard-basic" variant="standard" inputRef={input => input && input.focus()} />
                         
                    </div>
                    <div>
                     { textInput && textInput.length >0 && <IconButton color="primary" aria-label="upload picture" component="label" onKeyDown={saveNewValue} onClick={saveNewValue}><CheckCircleOutlineIcon /></IconButton>} 
                    </div>
                </div>
   
    )
}
export default TextFieldOption;