import { useContext, useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import useTheme from '@mui/material/styles/useTheme'
import { Cached } from '@mui/icons-material'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Divider from '@mui/material/Divider'

import { Form, Main } from 'components/Elements'
import { PeerNameDisplay } from 'components/PeerNameDisplay'
import { EnhancedConnectivityControl } from 'components/EnhancedConnectivityControl'
import { SettingsContext } from 'contexts/SettingsContext'
import { RoomNameType } from 'lib/RoomNameGenerator'

import { isEnhancedConnectivityAvailable } from '../../config/enhancedConnectivity'

import { useHome } from './useHome'
import { EmbedCodeDialog } from './EmbedCodeDialog'

export interface HomeProps {
  userId: string
}

export function Home({ userId }: HomeProps) {
  const theme = useTheme()
  const { updateUserSettings, getUserSettings } = useContext(SettingsContext)
  const { isEnhancedConnectivityEnabled } = getUserSettings()

  // State for meeting code and room type
  const [meetingCode, setMeetingCode] = useState('')
  const [isPrivateRoom, setIsPrivateRoom] = useState(false)

  const {
    roomName,
    roomNameType,
    showEmbedCode,
    handleRoomNameChange,
    handleRoomNameTypeChange,
    regenerateRoomName,
    handleFormSubmit,
    handleJoinPublicRoomClick,
    handleJoinPrivateRoomClick,
    handleEmbedCodeWindowClose,
    isRoomNameValid,
  } = useHome()

  const handleIsEnhancedConnectivityEnabledChange = (
    _event: React.ChangeEvent<{}>,
    newIsEnhancedConnectivityEnabled: boolean
  ) => {
    updateUserSettings({
      isEnhancedConnectivityEnabled: newIsEnhancedConnectivityEnabled,
    })
  }

  return (
    <Box className="Home">
      <EmbedCodeDialog
        showEmbedCode={showEmbedCode}
        handleEmbedCodeWindowClose={handleEmbedCodeWindowClose}
        roomName={roomName}
      />
      <Main
        sx={{
          maxWidth: theme.breakpoints.values.md,
          mt: 3,
          mx: 'auto',
          px: 2,
          textAlign: 'center',
        }}
      >
        <Form
          onSubmit={handleFormSubmit}
          sx={{ maxWidth: theme.breakpoints.values.sm, mx: 'auto' }}
        >
          <Typography sx={{ mb: 2 }}>
            Your username:{' '}
            <PeerNameDisplay paragraph={false} sx={{ fontWeight: 'bold' }}>
              {userId}
            </PeerNameDisplay>
          </Typography>

          {/* Room Type Toggle */}
          <Box
            sx={{
              mb: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography sx={{ mb: 1 }}>Room Type:</Typography>
            <ToggleButtonGroup
              value={isPrivateRoom ? 'private' : 'public'}
              exclusive
              onChange={(_, value) => {
                setIsPrivateRoom(value === 'private')
              }}
              aria-label="room type"
              size="small"
            >
              <ToggleButton value="public">Public</ToggleButton>
              <ToggleButton value="private">Private</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <FormControl fullWidth>
            <TextField
              label="Room name (generated on your device)"
              variant="outlined"
              value={roomName}
              onChange={handleRoomNameChange}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="Regenerate room id"
                    onClick={regenerateRoomName}
                    size="small"
                  >
                    <Cached />
                  </IconButton>
                ),
                sx: { fontSize: { xs: '0.9rem', sm: '1rem' } },
              }}
              size="medium"
            />
          </FormControl>
          {/* Meeting Code Field (only visible for private rooms) */}
          {isPrivateRoom && (
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <TextField
                label="Meeting Code"
                variant="outlined"
                type="text"
                value={meetingCode}
                onChange={e => setMeetingCode(e.target.value)}
                placeholder="Enter a code for your meeting"
                size="medium"
              />
            </FormControl>
          )}
          <Box sx={{ mt: 2, mb: 2 }}>
            <ToggleButtonGroup
              value={roomNameType}
              exclusive
              onChange={handleRoomNameTypeChange}
              aria-label="room name type"
              size="small"
            >
              <ToggleButton value={RoomNameType.UUID} aria-label="UUID">
                UUID
              </ToggleButton>
              <ToggleButton
                value={RoomNameType.PASSPHRASE}
                aria-label="Passphrase"
              >
                Passphrase
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          {/* Join Button */}
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (isPrivateRoom) {
                  if (meetingCode) {
                    handleJoinPrivateRoomClick(meetingCode)
                  } else {
                    alert('Please enter a meeting code for private rooms')
                    return
                  }
                } else {
                  handleJoinPublicRoomClick()
                }
              }}
              disabled={!isRoomNameValid}
              sx={{ width: '100%', maxWidth: '300px' }}
            >
              Join Room
            </Button>
          </Box>
        </Form>
      </Main>
      <Box component="section" aria-label="Additional options and information">
        {isEnhancedConnectivityAvailable && (
          <>
            <Divider sx={{ my: 2 }} />
            <Box maxWidth={theme.breakpoints.values.sm} mx="auto" px={2}>
              <EnhancedConnectivityControl
                isEnabled={isEnhancedConnectivityEnabled}
                onChange={handleIsEnhancedConnectivityEnabledChange}
                showSecondaryColor={true}
              />
            </Box>
          </>
        )}
        <Divider sx={{ my: 2 }} />
      </Box>
    </Box>
  )
}
