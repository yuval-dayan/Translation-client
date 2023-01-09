import { TranslationContext } from './context/TranslationContext'
import { SaveContext } from './context/SaveContext';
import { useEffect, useState } from 'react';
import MainBody from './components/mainMenu/MainBody';
import '../src/components/MainRow.css'
import LeftMenu from './components/leftMenu/LeftMenu';
import UpperBar from "./components/upperBarLowerBar/UpperBar";
import Elbit_Systems from '../src/Icons/Elbit_Systems.png'
import AlertDialog from './components/AlertDialog';
import { updateDbWordsCollection,setApplicationsFromDB } from './Helpers/DbHelper';
import { getCurrentContainerFromLS,getApplicationStatusFromLS,setApplicationsStatus} from './Helpers/LocalStorageHelper';
function App() {


  const [translationArray, setTranslationArray] = useState([])
  const [disabled, setDisabled] = useState(true);
  const [applications, setApplications] = useState([]);
  const [containerName, setContainerName] = useState(getCurrentContainerFromLS() ? getCurrentContainerFromLS(): 'Container Name');
  const [updateStatus, setUpdateStatus] = useState(false);
  const [presentPopUp, setPresentPopUp] = useState(false);

 

  const setApplicationStatusToLS = () => {
    let itemsFromLocalStorage = getApplicationStatusFromLS()
    if (itemsFromLocalStorage == undefined || itemsFromLocalStorage.length == 0) {
      let itemsFromLocalStorage = [];
      for (let i = 0; i < applications.length; i++) {
        itemsFromLocalStorage[i] = { name: (applications[i]).name, pageNumber: 1 }
      }
      setApplicationsStatus(itemsFromLocalStorage)  
      }
  }

  const saveChangesToWordsFile = () => {
    if (translationArray.length > 0) {
      setDisabled(true);
      updateDbWordsCollection(translationArray,setUpdateStatus,updateStatus)
      setTranslationArray([]);
    }
  }
  useEffect(() => {
    if (translationArray.length > 0 && disabled) {
      setDisabled(false);
    }
  }, [translationArray]);


  useEffect(() => {
    if (getCurrentContainerFromLS() == undefined) {
      setContainerName(applications[0].name)
    }
    setApplicationStatusToLS();
  }, [applications]);


  useEffect(() => {
    setApplicationsFromDB(setApplications)
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
            <MainBody containerName={containerName} updateStatus={updateStatus}/>
          </div>
        </SaveContext.Provider>
      </TranslationContext.Provider>
    </div>

  );
}

export default App;
