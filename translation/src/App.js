import { TranslationContext } from './context/TranslationContext'
import { SaveContext } from './context/SaveContext';
import { useEffect, useState } from 'react';
import MainBody from './components/mainMenu/MainBody';
import '../src/components/MainRow.css'
import LeftMenu from './components/leftMenu/LeftMenu';
import UpperBar from "./components/upperBarLowerBar/UpperBar";
import Elbit_Systems from '../src/Icons/Elbit_Systems.png'
import AlertDialog from './components/AlertDialog';
function App() {
  const getCurrentContainer = () => {
    return JSON.parse(localStorage.getItem('currentContainer'));
  }

  const [translationArray, setTranslationArray] = useState([])
  const [disabled, setDisabled] = useState(true);
  const [applicationsPageNumber, setApplicationPageNumber] = useState([]);
  const [containerName, setContainerName] = useState(getCurrentContainer() ? getCurrentContainer() : 'Container Name');
  const [updateStatus, setUpdateStatus] = useState(false);
  const [presentPopUp, setPresentPopUp] = useState(false);


  const setApplicationStatusToLS = () => {
    let itemsFromLocalStorage = JSON.parse(localStorage.getItem('applicationsStatus'))
    if (itemsFromLocalStorage == undefined || itemsFromLocalStorage.length == 0) {
      let itemsFromLocalStorage = [];
      for (let i = 0; i < applicationsPageNumber.length; i++) {
        itemsFromLocalStorage[i] = { name: (applicationsPageNumber[i]).name, pageNumber: 1 }
      }
      localStorage.setItem('applicationsStatus', JSON.stringify(itemsFromLocalStorage))
    }
  }
  const saveChangesToWordsFile = () => {
    if (translationArray.length > 0) {
      setDisabled(true);
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(translationArray)
      };
      fetch(`http://localhost:7776/words/`, requestOptions)
        .then(setUpdateStatus(!updateStatus))
      setTranslationArray([]);
    }
  }
  useEffect(() => {
    if (translationArray.length > 0 && disabled) {
      setDisabled(false);
    }
  }, [translationArray]);

  useEffect(() => {
    setTranslationArray([])
  }, [updateStatus]);

  useEffect(() => {
    if (getCurrentContainer() == undefined) {
      setContainerName(applicationsPageNumber[0].name)
    }
    setApplicationStatusToLS();
  }, [applicationsPageNumber]);

  useEffect(() => {
    fetch('http://localhost:7776/words/status')
      .then(response => response.json()).then(data => setApplicationPageNumber(data)).catch(e => console.error(e))

  }, []);


  return (
    <div className='app'>
      {presentPopUp && translationArray.length > 0 && <AlertDialog presentPopUp={presentPopUp} setPresentPopUp={setPresentPopUp} saveChangesToWordsFile={saveChangesToWordsFile} />}
      <TranslationContext.Provider value={{ translationArray, setTranslationArray }}>
        <SaveContext.Provider value={{ setPresentPopUp }}>

          <UpperBar containerName={containerName} saveChangesToWordsFile={saveChangesToWordsFile} disabled={disabled} />
          <div className='main'>
            <div className='app-left-menu '>
              <label className='upload-button'>
                <img className='elbit-img' src={Elbit_Systems} />
              </label>
              <div className='save-button-wrapper'>
              </div>
              <LeftMenu setPresentPopUp={setPresentPopUp} updateStatus={updateStatus} setContainerName={setContainerName} containerName={containerName} />
            </div>
            <MainBody containerName={containerName} />
          </div>
        </SaveContext.Provider>
      </TranslationContext.Provider>
    </div>

  );
}

export default App;
