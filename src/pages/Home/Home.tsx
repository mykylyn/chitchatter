import { useState, ChangeEvent, SyntheticEvent, useContext } from 'react'

import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Tooltip from '@mui/material/Tooltip'
import useTheme from '@mui/material/styles/useTheme'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import Typography from '@mui/material/Typography'
import { Cached } from '@mui/icons-material'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { ShellContext } from 'contexts/ShellContext'
import { getPeerName } from 'components/PeerNameDisplay'
import { SettingsContext } from 'contexts/SettingsContext'
import { PublicKey } from 'components/PublicKey'
import { PeerNameDisplay } from 'components/PeerNameDisplay'

import { RecentRoomCard } from '../../components/Home/RecentRoomCard'

import { useHome } from './useHome'

export interface HomeProps {}

export function Home(_props: HomeProps) {
  const theme = useTheme()
  const userId = '' // We'll pass the actual userId when available
  const userName = getPeerName(userId)

  // State for meeting code, room type, and error state
  const [meetingCode, setMeetingCode] = useState('')
  const [isPrivateRoom, setIsPrivateRoom] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showMeetingCodeError, setShowMeetingCodeError] = useState(false)

  const { customUsername, setCustomUsername, showAlert } =
    useContext(ShellContext)
  const { getUserSettings } = useContext(SettingsContext)
  const [inflightCustomUsername, setInflightCustomUsername] =
    useState(customUsername)
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false)

  const { publicKey } = getUserSettings()

  const {
    roomName,
    handleRoomNameChange,
    regenerateRoomName,
    handleJoinPublicRoomClick,
    handleJoinPrivateRoomClick,
    isRoomNameValid,
  } = useHome()

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInflightCustomUsername(evt.target.value)
  }

  const updateCustomUsername = () => {
    const trimmedUsername = inflightCustomUsername.trim()
    setCustomUsername(trimmedUsername)

    if (trimmedUsername.length) {
      showAlert(`Username changed to "${trimmedUsername}"`, {
        severity: 'success',
      })
    } else {
      showAlert(`Username reset`, { severity: 'success' })
    }
  }

  const handleSubmit = (evt: SyntheticEvent<HTMLFormElement>) => {
    evt.preventDefault()
    updateCustomUsername()
  }

  const handleBlur = () => {
    updateCustomUsername()
  }

  const handleInfoButtonClick = () => {
    setIsInfoDialogOpen(true)
  }

  const handleInfoDialogClose = () => {
    setIsInfoDialogOpen(false)
  }

  const maxCustomUsernameLength = 30

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
        overflowX: 'hidden',
      }}
    >
      {/* Header Section - Contains Menu Button */}
      {/* This Box was missing its closing tag */}
      <Box
        sx={{
          display: 'flex',
          width: 48,
          alignItems: 'center',
          justifyContent: 'start',
        }}
      ></Box>

      {/* Main Content */}
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, px: 2 }}>
        {/* User Name Field */}
        <Box
          sx={{
            flexWrap: 'wrap',
            alignItems: 'end',
            gap: 4,
            mb: 2,
          }}
        >
          <Box sx={{ width: '100%' }}>
            <form onSubmit={handleSubmit}>
              <FormControl sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    label={`${userName}`}
                    sx={{ width: '100%' }}
                    value={inflightCustomUsername}
                    inputProps={{ maxLength: maxCustomUsernameLength }}
                  />
                  <Tooltip title="Reveal your user info">
                    <IconButton
                      sx={{
                        ml: 1.5,
                        color: theme.palette.action.active,
                      }}
                      onClick={handleInfoButtonClick}
                    >
                      <InfoOutlinedIcon fontSize="large" />
                    </IconButton>
                  </Tooltip>
                </Box>
                <FormHelperText>Your username</FormHelperText>
              </FormControl>
            </form>
          </Box>
        </Box>
        {/* Room Type Toggle */}
        <Box sx={{ py: 3 }}>
          <Box
            sx={{
              display: 'flex',
              height: 40,
              flex: 1,
              justifyContent: 'center',
              borderRadius: 2,
              p: 0.5,
              backgroundColor: sxTheme =>
                sxTheme.palette.mode === 'dark'
                  ? '#242d47'
                  : 'rgba(0,0,0,0.05)',
            }}
          >
            <ToggleButtonGroup
              value={isPrivateRoom ? 'private' : 'public'}
              exclusive
              onChange={(_, value) => {
                setIsPrivateRoom(value === 'private')
              }}
              aria-label="room type"
              sx={{
                width: '100%',
                '& .MuiToggleButton-root': {
                  flex: 1,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                },
              }}
            >
              <ToggleButton value="public">Public</ToggleButton>
              <ToggleButton value="private">Private</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>
        {/* Room Name */}
        <Box
          sx={{
            flexWrap: 'wrap',
            alignItems: 'end',
            gap: 4,
          }}
        >
          <Box sx={{ width: '100%' }}>
            <Typography sx={{ mb: 1, fontWeight: 500, color: 'text.primary' }}>
              Room Name
            </Typography>
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'stretch',
                borderRadius: 2,
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                value={roomName}
                onChange={handleRoomNameChange}
                placeholder="Enter or generate room name"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    borderRight: 0,
                  },
                }}
              />
              <IconButton
                aria-label="Regenerate room id"
                onClick={regenerateRoomName}
                sx={{
                  border: sxTheme => `1px solid ${sxTheme.palette.divider}`,
                  borderLeft: 0,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderTopRightRadius: 4,
                  borderBottomRightRadius: 4,
                  backgroundColor: 'background.paper',
                  color: 'text.secondary',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <Cached />
              </IconButton>
            </Box>
          </Box>
        </Box>
        {/* Meeting Code for Private */}
        {isPrivateRoom && (
          <Box
            sx={{
              flexWrap: 'wrap',
              alignItems: 'end',
              gap: 4,
              mt: 2,
            }}
          >
            <Box sx={{ width: '100%' }}>
              <Typography
                sx={{ mb: 1, fontWeight: 500, color: 'text.primary' }}
              >
                Meeting Code
              </Typography>
              <TextField
                fullWidth
                label="Meeting Code"
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                value={meetingCode}
                onChange={e => setMeetingCode(e.target.value)}
                placeholder="Enter a code for your meeting"
                error={!meetingCode && showMeetingCodeError}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle meeting code visibility"
                      onClick={() => setShowPassword(prev => !prev)}
                      sx={{ color: 'text.secondary' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
              {!meetingCode && showMeetingCodeError && (
                <Typography color="error" sx={{ mt: 1 }}>
                  Please enter a meeting code for private rooms
                </Typography>
              )}
            </Box>
          </Box>
        )}
        {/* Join Button */}
        <Box sx={{ py: 3, mt: 2 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              if (isPrivateRoom) {
                if (meetingCode) {
                  setShowMeetingCodeError(false)
                  handleJoinPrivateRoomClick(meetingCode)
                } else {
                  setShowMeetingCodeError(true)
                  return
                }
              } else {
                handleJoinPublicRoomClick()
              }
            }}
            disabled={!isRoomNameValid}
            sx={{
              height: 56,
              borderRadius: 3,
              fontSize: '1.1rem',
              fontWeight: 'bold',
              textTransform: 'none',
            }}
          >
            Join Room
          </Button>
        </Box>
        <Box sx={{ flexGrow: 1 }} /> {/* Spacer to push recent meetings down */}
        {/* Recent Meetings */}
        <Box sx={{ pt: 8, pb: 3 }}>
          <Accordion
            defaultExpanded
            sx={{ boxShadow: 'none', backgroundColor: 'background.default' }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'text.secondary' }} />}
              sx={{
                px: 0,
                py: 3,
                minHeight: 'auto',
                backgroundColor: 'background.default',
              }}
            >
              <Typography
                sx={{
                  fontSize: '1.375rem',
                  fontWeight: 'bold',
                  color: 'text.primary',
                }}
              >
                Recent Meetings
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{ px: 0, pt: 1, backgroundColor: 'background.default' }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <RecentRoomCard name="Project Sync" time="Yesterday, 3:00 PM" />
                <RecentRoomCard name="Team Standup" time="Today, 9:00 AM" />
                <RecentRoomCard name="Client Review" time="Monday, 2:00 PM" />
              </Box>
            </AccordionDetails>
          </Accordion>
          <Box sx={{ pt: 4 }}>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                height: 48,
                borderRadius: 3,
                textTransform: 'none',
                fontWeight: 'bold',
                backgroundColor: sxTheme => sxTheme.palette.primary.main + '10',
                color: 'primary.main',
                border: 'none',
                '&:hover': {
                  backgroundColor: sxTheme =>
                    sxTheme.palette.primary.main + '20',
                },
              }}
            >
              View All Recent Meetings
            </Button>
          </Box>
        </Box>
      </Box>
      <Dialog open={isInfoDialogOpen} onClose={handleInfoDialogClose}>
        <DialogTitle>
          <Box component="span">
            <PeerNameDisplay sx={{ fontSize: 'inherit' }}>
              {userId}
            </PeerNameDisplay>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your public key (generated locally):
          </DialogContentText>
          <PublicKey publicKey={publicKey} />
          <DialogContentText>
            Your private key, which was also generated locally, is hidden and
            only exists on your device.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleInfoDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
