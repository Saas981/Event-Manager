import React, { useState } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';

const ProfileUploader = ({ savedFile, setSavedFile }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleDrop = (event) => {
    event.preventDefault();

    const droppedFile = event.dataTransfer.files[0];
    setSavedFile(droppedFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleEdit = () => {
    document.getElementById('upload-input').click();
  };

  const handleDelete = () => {
    setSavedFile(null);
  };

  return (
    <Box
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      position="relative"
      sx={{
          display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        justifyContent:"center",
        borderRadius: '100%',
        width: '105px', // Set the width and height for a fixed circle
        height: '105px',
                border: isHovered ? '4px solid #dce' : '4px solid #ccc', // Dashed border on hover

        
      }}
    >
      {savedFile ? (
        <>
          <Box
            sx={{
              position: 'absolute',
              width: '95%',
              height: '95%',
              filter: isHovered ? 'brightness(70%)' : 'brightness(100%)',
            }}
          >
            <img
              src={URL.createObjectURL(savedFile)}
              alt="Uploaded"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover', // Cover the container while maintaining aspect ratio
                borderRadius: '50%',
              }}
            />
            {isHovered && (
              <Tooltip title="Edit" arrow>
                <IconButton
                  onClick={handleEdit}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'white',
                  }}
                >
                  <EditIcon fontSize="48" sx={{width:"100%",height:"auto"}} />
                  <input
                    type="file"
                    id="upload-input"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      setSavedFile(e.target.files[0]);
                    }}
                  />
                </IconButton>
              </Tooltip>
            )}
          </Box>
          {/* Disabled delete button since we can just edit */}
          {/* <IconButton
            onClick={handleDelete}
            sx={{ position: 'absolute', top: '8px', right: '8px', color: 'rgba(0, 0, 0, 0.5)' }}
          >
            <DeleteOutlineIcon />
          </IconButton> */}
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
              onChange={(e) => {
                setSavedFile(e.target.files[0]);
              }}
            />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default ProfileUploader;
