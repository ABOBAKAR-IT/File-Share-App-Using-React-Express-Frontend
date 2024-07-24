import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import LinearWithValueLabel from '../LinearProgressBar.jsx';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import BackupIcon from '@mui/icons-material/Backup';
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload({setRerender,render}) {
  const [uploaded, setUploaded] = useState(0);
  const [fileName, setFileName] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  async function Submit(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      const fileInput = e.target.elements.file;
      
      if (fileInput && fileInput.files.length > 0) {
        formData.append('file', fileInput.files[0]);
        let response = await axios.post('http://localhost:4000/upload', formData, {
          onUploadProgress: (data) => {
            setUploaded(Math.round((data.loaded / data.total) * 100));
          },
        });
        setRerender(!render)
        console.log(response.data);
        setUploadSuccess(true);
      } else {
        console.log('No file selected');
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setUploadSuccess(false);
      setUploaded(0);
    } else {
      setFileName('');
      setUploadSuccess(false);
      setUploaded(0);
    }
  }

  return (
    <form onSubmit={Submit}>
       <Stack direction="row" spacing={2} style={{ marginTop: '20px', justifyContent:'center' }}>
       <Button
        component="label"
        variant="contained"
        startIcon={<AddToDriveIcon />
      }
      sx={{ backgroundColor: '#1976d2', color: '#fff' }}
      >
        Select file
        <VisuallyHiddenInput type="file" name="file" onChange={handleFileChange} />
      </Button>
       <Button variant="contained" type="submit" endIcon={<BackupIcon />} sx={{ backgroundColor: '#4caf50', color: '#fff' }}>
         Upload
       </Button>
     </Stack>
     
      {fileName && <p>{fileName}</p>}
      {uploadSuccess ? (
        <CheckCircleIcon style={{ color: 'green', marginTop: '10px' }} />
      ) : (
        uploaded > 0 && (
          <div>
            <LinearWithValueLabel progress={uploaded} />
          </div>
        )
      )}
     
    </form>
  );
}
