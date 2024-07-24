import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import InputFileUpload from './components/Upload/UploadForm.jsx'
import GetFileList from './components/GetFileList.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     
       <InputFileUpload />
     <hr/>
      <h1>Server Files List</h1>
      <GetFileList />
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
    </>
  )
}

export default App
