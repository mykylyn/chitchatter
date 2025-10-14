import { useContext, useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { Room } from 'components/Room'
import { WholePageLoading } from 'components/Loading'
import { ShellContext } from 'contexts/ShellContext'
import { useThrottledRoomMount } from 'hooks/useThrottledRoomMount'
import { encryption } from 'services/Encryption'
import { notification } from 'services/Notification'

interface PublicRoomProps {
  userId: string
}

export function PrivateRoom({ userId }: PublicRoomProps) {
  const { roomId = '' } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { meetingCode } = location.state || {}
  const { setTitle } = useContext(ShellContext)
  const canMount = useThrottledRoomMount(roomId)
  const [encodedPassword, setEncodedPassword] = useState<string | null>(null)

  useEffect(() => {
    notification.requestPermission()
  }, [])

  useEffect(() => {
    setTitle(`Room: ${roomId}`)
  }, [roomId, setTitle])

  useEffect(() => {
    if (meetingCode) {
      encryption.encodePassword(roomId, meetingCode).then(password => {
        setEncodedPassword(password)
      })
    }
  }, [roomId, meetingCode])

  if (!canMount) {
    return <WholePageLoading />
  }

  if (!meetingCode) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" color="error">
          Error: No meeting code provided for private room
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Go Back to Home
        </Button>
      </Box>
    )
  }

  if (!encodedPassword) {
    return <WholePageLoading />
  }

  return <Room userId={userId} roomId={roomId} password={encodedPassword} />
}
