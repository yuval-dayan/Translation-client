import React, { useState } from "react";
import '../../components/MainRow.css'
import FlagIcon from '@mui/icons-material/Flag';

const FlagWord = ({ translationArray, setTranslationArray, rowData }) => {
    const GREY = '#616161';
    const ORANGE = '#ff6d00'
    const [flagColor, setFlagColor] = useState(rowData && rowData.flagged ? ORANGE : GREY)

    const addOrRemoveFlag = () => {
        if (flagColor == GREY) {
            updateFlagPropInWord(true, ORANGE);
        }
        else
            updateFlagPropInWord(false, GREY);
    }
    const updateFlagPropInWord = (flag, color) => {
        let wordIndex = translationArray.findIndex(word => word.id == rowData.id);
        if (wordIndex == -1) {
            setTranslationArray([...translationArray, { id: rowData.id, flagged: flag, translation: rowData.translation, translated: rowData.translated }])
            console.log([...translationArray, { id: rowData.id, flagged: flag, translation: rowData.translation, translated: rowData.translated }])
        }
        else {
            let arrAfterUpdate = [...translationArray];
            arrAfterUpdate[wordIndex] = { ...translationArray[wordIndex], id: rowData.id, flagged: flag }
            setTranslationArray(arrAfterUpdate);

        }
        setFlagColor(color)
    }

    return (
        <div onClick={() => { addOrRemoveFlag() }} className="add-flag"><FlagIcon sx={{ color: `${flagColor}` }} fontSize="small" />
        </div>
    )
}
export default FlagWord;