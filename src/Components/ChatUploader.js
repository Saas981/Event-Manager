import React, { useState } from 'react';
import { Box, Paper, Typography, IconButton } from '@mui/material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Uploader = ({savedFile,setSavedFile}) => {

  const handleDrop = (event) => {
    event.preventDefault();

    const droppedFile = event.dataTransfer.files[0];
    setSavedFile(droppedFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDelete = () => {
    setSavedFile(null);
  };

  return (
    <Box>
      <Paper
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        sx={{
          padding: 8,
          height: "100%",
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: '#f4f4f4',
          borderRadius: '10px',
          marginBottom: 2,
          border: '2px dashed #ccc',
          position: 'relative',
        }}
      >
        {savedFile ? (
          <>
            <Box sx={{ maxHeight: '80px',paddingBottom:'12%' }}>
              <img
                src={URL.createObjectURL(savedFile)}
                alt="Uploaded"
                style={{ maxWidth: '100%', maxHeight: '120px', borderRadius: '10px', }}
              />
              
            </Box>
           
            <IconButton
              onClick={handleDelete}
              sx={{ position: 'absolute', top: '8px', right: '8px', color: 'rgba(0, 0, 0, 0.5)' }}
            >
        
              <DeleteOutlineIcon />
            </IconButton>
          </>
        ) : (
          <Box>
            <IconButton
              component="label"
              htmlFor="upload-input"
              sx={{ fontSize: 60, padding: 2, borderRadius: '50%' }}
            >
              <CloudUploadOutlinedIcon fontSize="24" />
              <input
                type="file"
                id="upload-input"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) =>{ 
                    setSavedFile(e.target.files[0])
                }}
              />
            </IconButton>
            <Typography sx={{ fontFamily: "Poppins", fontSize: "16px" }} variant="body1">Drag & Drop or Click to Upload</Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Uploader;
