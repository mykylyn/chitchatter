import {
  KeyboardEvent,
  SyntheticEvent,
  useContext,
  useRef,
  useState,
} from 'react'
import FormControl from '@mui/material/FormControl'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Fab from '@mui/material/Fab'
import SendIcon from '@mui/icons-material/Send'

import { messageCharacterSizeLimit } from 'config/messaging'
import { SettingsContext } from 'contexts/SettingsContext'
import { Form } from 'components/Elements'

interface MessageFormProps {
  onMessageSubmit: (message: string) => void
  onMessageChange: (message: string) => void
  isMessageSending: boolean
}

export const MessageForm = ({
  onMessageSubmit,
  onMessageChange,
  isMessageSending,
}: MessageFormProps) => {
  const settingsContext = useContext(SettingsContext)
  const { showActiveTypingStatus } = settingsContext.getUserSettings()
  const textFieldRef = useRef<HTMLInputElement>(null)
  const [textMessage, setTextMessage] = useState('')

  const canMessageBeSent = () => {
    return (
      textMessage.trim().length > 0 &&
      textMessage.length < messageCharacterSizeLimit &&
      !isMessageSending
    )
  }

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setTextMessage(value)
    onMessageChange(value)
  }

  const submitMessage = () => {
    onMessageSubmit(textMessage)
    setTextMessage('')
  }

  const handleMessageKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    const { key, shiftKey } = event

    if (key === 'Enter' && shiftKey === false) {
      event.preventDefault()

      if (!canMessageBeSent()) return

      submitMessage()
    }
  }

  const handleMessageSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    submitMessage()
  }

  return (
    <Form
      onSubmit={handleMessageSubmit}
      sx={{
        ...(showActiveTypingStatus && {
          pt: 2,
          px: 2,
        }),
        ...(!showActiveTypingStatus && {
          p: 2,
        }),
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <FormControl fullWidth>
          <TextField
            variant="outlined"
            value={textMessage}
            onChange={handleMessageChange}
            onKeyPress={handleMessageKeyPress}
            size="small"
            placeholder="Your message"
            inputRef={textFieldRef}
            multiline
            minRows={1}
            maxRows={4}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 20, // Pill shape
                backgroundColor: theme =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(0, 0, 0, 0.04)',
                '& fieldset': {
                  borderColor: theme =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.23)'
                      : 'rgba(0, 0, 0, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor: theme =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.5)'
                      : 'rgba(0, 0, 0, 0.87)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme => theme.palette.primary.main,
                },
              },
            }}
          />
        </FormControl>
        <Fab
          sx={{
            flexShrink: 0,
            borderRadius: '50%', // Perfect circle
            width: 36,
            height: 36,
            minWidth: 'auto', // Override default min width
            // Align properly with the text field
            alignSelf: 'center',
            boxShadow: 1, // Subtle shadow
          }}
          aria-label="Send"
          type="submit"
          disabled={!canMessageBeSent()}
          color="primary"
        >
          <SendIcon fontSize="small" />
        </Fab>
      </Stack>
    </Form>
  )
}
