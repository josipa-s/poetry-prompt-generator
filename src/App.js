import './App.css';
import { Form } from './Form';
import { useState } from 'react';

function App() {
  const [prompt, setPrompt] = useState("")
  return (
    <div className='App'>
      <header>
        <h1>Poetry Prompt Generator</h1>
      </header>
      <main>
        <div className='textContainer'>
          <img src='feather.png' className='feather' alt='feather icon'/>
          <h4>Not sure what to write about? Generate a prompt and start writing. Don’t like it? Generate another one!</h4>
          <img src='feather.png' className='feather' id='rightFeather' alt='mirrored feather icon'/>
        </div>
       <Form setPrompt={setPrompt}/>
      </main>
      <h3 className='prompt'>{prompt}</h3>
    </div>
  );
}

export default App;
