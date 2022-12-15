import MainRow from './MainRow';
import { TranslationContext } from './context/TranslationContext'
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import MainBody from './MainBody';
import './MainRow.css'

function App() {
  const [translationArray, setTranslationArray] = useState([])
  const [disabled,setDisabled] = useState(true);

  useEffect(() => {
if(translationArray.length > 0 && disabled)
{
setDisabled(false);
}

}, [translationArray]);

  const saveChangesToWordsFile = () => {
    if (translationArray.length > 0) {
      setDisabled(true);
      setTranslationArray([]);
      translationArray.map((v) => {
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ translation: v.translation })
        };
        fetch(`http://localhost:7779/words/${v.wordId}`, requestOptions)
          .then(response => response.json())
      })
    }

  }
  return (
    <div className='app'>
      <TranslationContext.Provider value={{ translationArray, setTranslationArray }}>
        <div className='app-left-menu '>
          <div className='left-menu-options'>
          <Button disabled={disabled} onClick={() => { saveChangesToWordsFile() }}>SAVE</Button>
          </div>
          <div className='left-menu-options'></div>
          <div className='left-menu-options'></div>
          <div className='left-menu-options'></div>
        </div>
          <MainBody />
          <div className='right-bar'></div>
      </TranslationContext.Provider>
    </div>
  );
}

export default App;
