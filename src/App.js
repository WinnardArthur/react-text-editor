import React, { useState } from 'react';
import './App.css';
import TextEditor from './TextEditor';
import parser from 'html-react-parser';

function App() {
  const [desc, setDesc] = useState('');

  return (
    <div className="App">
      <TextEditor setDesc={setDesc}/>

      <div className='content'>
        {parser(desc)}
      </div>

    </div>
  );
}

export default App;
