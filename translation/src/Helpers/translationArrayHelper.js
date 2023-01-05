export const setTranslationArrayWithFlags = (rowData,translationArray,flag,setTranslationArray)=>{
    let wordIndex = translationArray.findIndex(word => word.id == rowData.id);
    if (wordIndex == -1) {
        setTranslationArray([...translationArray, { id: rowData.id, flagged: flag, translation: rowData.translation, translated: rowData.translated }])
    }
    else {
        let arrAfterUpdate = [...translationArray];
        arrAfterUpdate[wordIndex] = { ...translationArray[wordIndex], id: rowData.id, flagged: flag }
        setTranslationArray(arrAfterUpdate);
    
    }
} 

export const setTranslationArrayWithNewWord = (translationArray,rowData,value,setTranslationArray) =>{
    let wordIndex = translationArray.findIndex(word => word.id == rowData.id);
    if (wordIndex == -1) {
        setTranslationArray([...translationArray, { id: rowData.id, flagged:  rowData.flagged , translation: value, translated: true }])
    }
    else {
        let arrAfterUpdate = [...translationArray];
        arrAfterUpdate[wordIndex] = { ...translationArray[wordIndex], translation:value,translated: true }
        setTranslationArray(arrAfterUpdate);
    }
}