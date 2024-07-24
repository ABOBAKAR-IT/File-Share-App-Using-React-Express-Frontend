import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import InputFileUpload from './components/Upload/UploadForm.jsx'
import GetFileList from './components/GetFileList.jsx'
function App() {
  const [count, setCount] = useState(0)
  const [render,setRerender]=useState(false)
  useEffect(()=>{

  },[render])
  return (
    <>
     
       <InputFileUpload setRerender={setRerender} render={render}/>
     <hr/>
      <h1>Server Files List</h1>
      <GetFileList setRerender={setRerender} render={render}/>
     
      <p className="read-the-docs">
        Developed by RANA ABOBAKAR
      </p>
    </>
  )
}

export default App
