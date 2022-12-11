import MainRow from './MainRow';
import { TranslationContext } from './context/TranslationContext'
import { useState } from 'react';

function App() {
  const [translationArray, setTranslationArray] = useState([])

  const saveChangesToWordsFile = () => {
    if (translationArray.length > 0) {
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
    <div>
      <TranslationContext.Provider value={{ translationArray, setTranslationArray }}>
        <button onClick={() => { saveChangesToWordsFile() }}>SAVE</button>
        <MainRow />
      </TranslationContext.Provider>
    </div>
  );
}

export default App;
