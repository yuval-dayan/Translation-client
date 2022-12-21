import { TranslationContext } from './context/TranslationContext'
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import MainBody from './MainBody';
import './MainRow.css'
import LeftMenu from './LeftMenu';
import UpperBar from "./UpperBar";
function App() {
  const [translationArray, setTranslationArray] = useState([])
  const [disabled, setDisabled] = useState(true);
  const [applicationsStatus, setApplicationsStatus] = useState([]);
  const [containerName, setContainerName] = useState('Container Name')

  useEffect(() => {
    if (translationArray.length > 0 && disabled) {
      setDisabled(false);
    }

  }, [translationArray]);

  useEffect(() => {
    if (applicationsStatus.length > 0) {
      setContainerName(applicationsStatus[0].name)
    }
    let itemsFromLocalStorage = JSON.parse(localStorage.getItem('applicationsStatus'))
    if (itemsFromLocalStorage == undefined || itemsFromLocalStorage.length == 0) {
      let itemsFromLocalStorage = [];
      for (let i = 0; i < applicationsStatus.length; i++) {
        itemsFromLocalStorage[i] = { ...applicationsStatus[i], pageNumber: 1 }
      }
      localStorage.setItem('applicationsStatus', JSON.stringify(itemsFromLocalStorage))
    }

  }, [applicationsStatus]);

  useEffect(() => {
    fetch('http://localhost:7779/words/status')
      .then(response => response.json()).then(data => setApplicationsStatus(data)).catch(e => console.error(e))

  }, []);

  const saveRootFile = (event) => {
    console.log(event.target.value)
  }
  const saveChangesToWordsFile = () => {
    if (translationArray.length > 0) {
      setDisabled(true);
      setTranslationArray([]);
      let wordsToUpdate = [];
      translationArray.map((v) => { wordsToUpdate = [...wordsToUpdate, { id: v.wordId, translation: v.translation, translated: true }] })
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(wordsToUpdate)
      };
      fetch(`http://localhost:7779/words/`, requestOptions)
        .then(response => response.json())
    }

  }
  return (
    <div className='app'>
      <TranslationContext.Provider value={{ translationArray, setTranslationArray }}>
      <UpperBar containerName={containerName} />
      <div className='main'>
      <div className='app-left-menu '>
          <label className='upload-button'>
            <input onChange={saveRootFile} type="file" />
            <span>Upload New Dictionary</span>
          </label>
          <div className='save-button-wrapper'>
            <div className='save-button'>
              <Button disabled={disabled} onClick={() => { saveChangesToWordsFile() }}>SAVE</Button></div></div>
          <LeftMenu applicationsStatus={applicationsStatus} setContainerName={setContainerName} containerName={containerName} />
        </div>
        <MainBody containerName={containerName} />
        <div className='right-bar'></div>
        </div>
    </TranslationContext.Provider>
      </div>
     
  );
}

export default App;
