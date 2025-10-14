// import React from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import CallEndIcon from '@mui/icons-material/CallEnd'

import { MediaButton } from './MediaButton'

export function RoomEndCallControl() {
  const navigate = useNavigate()

  const handleLeaveRoom = () => {
    navigate('/')
  }

  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        px: 1,
      }}
    >
      <Tooltip title="Leave room and return to home">
        <MediaButton
          isActive={false} // Make this false to avoid the blue color from MediaButton.tsx
          onClick={handleLeaveRoom}
          aria-label="Leave room"
          sx={{
            backgroundColor: '#f44336 !important',
            color: '#ffffff !important',
            '&:hover': {
              backgroundColor: '#d32f2f !important',
              color: '#ffffff !important',
            },
            '& .MuiSvgIcon-root': {
              color: '#ffffff !important',
              fontSize: '1.5rem !important',
            },
          }}
        >
          <CallEndIcon />
        </MediaButton>
      </Tooltip>
    </Box>
  )
}
