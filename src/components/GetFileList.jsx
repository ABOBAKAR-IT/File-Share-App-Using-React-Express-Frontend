import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GetFileList({ render, setRerender }) {
  const [fileList, setFileList] = useState([]);

  async function getFile() {
    try {
      let response = await axios.get('http://localhost:4000/files');
      setFileList(response.data);  // Assuming response.data is an array
     // console.log(response)
    } catch (error) {
      console.log(error);
    }
  }

  async function downloadFile(fileName) {
    try {
        console.log('downalod call')
      let response = await axios.get(`http://localhost:4000/download?filename=${fileName}`);
      console.log("donwlaod data ", response)
      // Assuming you want to refresh the file list after downloading
     // setRender(!render);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getFile();
  }, [render]);

  return (
    <>
      {fileList.length > 0 ? (
        fileList.map((file) => (
          <div key={file}>
            <div>
             <a href={`http://localhost:4000/download?filename=${file}`} >{file}</a>
             <hr/>
            </div>
          </div>
        ))
      ) : (
        <div>No File On Server</div>
      )}
    </>
  );
}

export default GetFileList;
