import { Avatar, Box, Modal, Typography } from '@mui/material'
import React from 'react'
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Login from '../Google/Login';

function LoginModal({ modalOpen, setModalOpen }) {
  return (
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Box sx={{
        backgroundColor: 'white', width: '350px', height: '300px', display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '32px'
      }}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Sign in
        </Typography>
        <Login />
      </Box>
    </Modal>)
}

export default LoginModal