export const updateStatusFromDb = (setAppStatus) =>{
    fetch('http://localhost:7776/words/status')
    .then(response => response.json()).then(data => setAppStatus(data)).catch(e => console.error(e))
}
export const updateDbWordsCollection = (translationArray,setUpdateStatus,updateStatus) =>{
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(translationArray)
    };
    fetch(`http://localhost:7776/words/`, requestOptions)
      .then(setUpdateStatus(!updateStatus))
  }

  export const setApplicationsFromDB =(setApplications)=>{
    fetch('http://localhost:7776/words/status')
    .then(response => response.json()).then(data => setApplications(data)).catch(e => console.error(e))

  }
  export const changeDataByContainerName = (containerName,setData) => {
    if (containerName) {
        fetch(`http://localhost:7776/words/projectName/${containerName}`)
            .then(response => response.json()).then(data => setData(data)).catch(e => console.error(e))
    }
}
export  const setDataFromDb = (setData) =>{
    fetch('http://localhost:7776/words')
    .then(response => response.json()).then(data => setData(data)).catch(e => console.error(e))
}
export const getValueFromDictionary = (setValueSet,value)=>{
    fetch(`http://localhost:7776/dictionary/translation?regexName=${value}`)
    .then(response => response.json()).then(data1 => setValueSet(data1)).catch(e => console.error(e))
}