import { useState } from 'react'
//import './App.css'
//import './assets/css/material-kit.min.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
     <button type="button" class="btn btn-primary w-auto me-1 mb-0">Primary</button>
    </div>
  )
}

export default App
