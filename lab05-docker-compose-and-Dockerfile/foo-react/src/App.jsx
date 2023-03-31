import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'

const endPoint = import.meta.env.VITE_APP_END_POINT || 'http://localhost:5229/api/v1/hello';

function App() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(1)
  const [greeting, setGreeting] = useState(2)

  useEffect(() => {
    axios
      .get(endPoint, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        setGreeting(response.data);
        setLoading(false);
      });
  },[]);

  if (loading) {
    return <div className="App">Loading...</div>;
  }

  return (
    <div className="App">
      <h1>Vite + React</h1>
      <h1 className="App-title" id='message'>{greeting.word}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
