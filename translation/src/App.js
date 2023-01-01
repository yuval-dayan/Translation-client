import { TranslationContext } from './context/TranslationContext'
import { useEffect, useState } from 'react';
import MainBody from './components/mainMenu/MainBody';
import '../src/components/MainRow.css'
import LeftMenu from './components/leftMenu/LeftMenu';
import UpperBar from "./components/upperBarLowerBar/UpperBar";
import Elbit_Systems from '../src/Icons/Elbit_Systems.png'
function App() {
  const [translationArray, setTranslationArray] = useState([])
  const [disabled, setDisabled] = useState(true);
  const [applicationsPageNumber, setApplicationPageNumber] = useState([]);
  const [containerName, setContainerName] = useState('Container Name');
  const [updateStatus,setUpdateStatus] = useState(false);


  useEffect(() => {
    if (translationArray.length > 0 && disabled) {
      setDisabled(false);
    }

  }, [translationArray]);

  useEffect(() => {
    if (applicationsPageNumber.length > 0) {
      setContainerName(applicationsPageNumber[0].name)
    }
    let itemsFromLocalStorage = JSON.parse(localStorage.getItem('applicationsStatus'))
    if (itemsFromLocalStorage == undefined || itemsFromLocalStorage.length == 0) {
      let itemsFromLocalStorage = [];
      for (let i = 0; i < applicationsPageNumber.length; i++) {
        itemsFromLocalStorage[i] = {name: (applicationsPageNumber[i]).name, pageNumber: 1 }
      }
      localStorage.setItem('applicationsStatus', JSON.stringify(itemsFromLocalStorage))
    }

  }, [applicationsPageNumber]);

  useEffect(() => {
    fetch('http://localhost:7776/words/status')
      .then(response => response.json()).then(data => setApplicationPageNumber(data)).catch(e => console.error(e))

  }, []);

  const saveChangesToWordsFile = () => {
    if (translationArray.length > 0) {
      setDisabled(true);
      setTranslationArray([]);
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(translationArray)
      };
      fetch(`http://localhost:7776/words/`, requestOptions)
        .then(setUpdateStatus(!updateStatus))
    }

  }
  return (
    <div className='app'>
      <TranslationContext.Provider value={{ translationArray, setTranslationArray }}>
      <UpperBar containerName={containerName} saveChangesToWordsFile={saveChangesToWordsFile} disabled={disabled}/>
      <div className='main'>
      <div className='app-left-menu '>
          <label className='upload-button'>
            <img className='elbit-img' src={Elbit_Systems}/>
          </label>
          <div className='save-button-wrapper'>
           </div>
          <LeftMenu updateStatus={updateStatus} setContainerName={setContainerName} containerName={containerName} />
        </div>
        <MainBody containerName={containerName} />
        </div>
    </TranslationContext.Provider>
      </div>
     
  );
}

export default App;
