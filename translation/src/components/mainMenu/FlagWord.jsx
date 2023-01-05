import React, { useState } from "react";
import '../../components/MainRow.css'
import FlagIcon from '@mui/icons-material/Flag';
import { setTranslationArrayWithFlags } from "../../Helpers/translationArrayHelper";

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
        setTranslationArrayWithFlags(rowData,translationArray,flag,setTranslationArray)
        setFlagColor(color)
    }

    return (
        <div onClick={() => { addOrRemoveFlag() }} className="add-flag"><FlagIcon sx={{ color: `${flagColor}` }} fontSize="small" />
        </div>
    )
}
export default FlagWord;