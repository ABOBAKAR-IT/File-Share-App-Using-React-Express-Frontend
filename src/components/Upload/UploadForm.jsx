import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import LinearWithValueLabel from '../LinearProgressBar.jsx';

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

export default function InputFileUpload() {
  const [uploaded, setUploaded] = useState(0);
  const [fileName, setFileName] = useState('');
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

        console.log(response.data);
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
    } else {
      setFileName('');
    }
  }
  return (
    <form onSubmit={Submit}>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Upload file
        <VisuallyHiddenInput type="file" name="file" onChange={handleFileChange} />
      </Button>
      {fileName && <p>{fileName}</p>}
      {uploaded > 0 && (
        <div>
          <LinearWithValueLabel progress={uploaded} />
        </div>
      )}
      <Stack direction="row" spacing={2} style={{ marginTop: '20px', marginLeft: '60px' }}>
        <Button variant="outlined" startIcon={<DeleteIcon />}>
          Cancel
        </Button>
        <Button variant="contained" type="submit" endIcon={<SendIcon />}>
          Save
        </Button>
      </Stack>
    </form>
  );
}
