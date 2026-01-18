import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import ChatIcon from '@mui/icons-material/Chat'
import CallIcon from '@mui/icons-material/Call'
import useTheme from '@mui/material/styles/useTheme'
import { useState } from 'react'

interface RoomBottomNavigationProps {
  initialTab?: number
  onTabChange?: (tab: number) => void
}

export const RoomBottomNavigation = ({
  initialTab = 0,
  onTabChange,
}: RoomBottomNavigationProps) => {
  const theme = useTheme()
  const [tabValue, setTabValue] = useState(initialTab)

  const handleTabChange = (
    _event: React.SyntheticEvent | null,
    newValue: number
  ) => {
    setTabValue(newValue)
    if (onTabChange) {
      onTabChange(newValue)
    }
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          backgroundColor: theme.palette.background.paper,
          borderTop: `1px solid ${theme.palette.divider}`,
          borderRadius: 0,
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
          height: 80,
          boxShadow: '0px -4px 24px rgba(0, 0, 0, 0.1)',
          mx: 0, // No margin on sides
          width: '100%',
        }}
      >
        {/* Moving selection indicator */}
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            left: tabValue === 0 ? '8px' : 'calc(50% + 4px)',
            width: 'calc(50% - 12px)',
            height: 56,
            bgcolor: theme.palette.primary.main,
            borderRadius: 3,
            opacity: 0.1,
            zIndex: 100,
            transition: 'left 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          }}
        />
        <BottomNavigation
          value={tabValue}
          onChange={handleTabChange}
          showLabels
          sx={{
            backgroundColor: 'transparent',
            height: '100%',
            '.Mui-selected': {
              zIndex: 200,
              color: theme.palette.primary.contrastText + ' !important',
            },
          }}
        >
          <BottomNavigationAction
            label="Call"
            icon={<CallIcon />}
            sx={{
              minWidth: '50%',
              maxWidth: '50%',
              flex: 1,
              color: theme.palette.text.secondary,
              zIndex: 200,
              '.MuiTouchRipple-root': {
                display: 'none',
              },
            }}
            disableRipple
          />
          <BottomNavigationAction
            label="Chat"
            icon={<ChatIcon />}
            sx={{
              minWidth: '50%',
              maxWidth: '50%',
              flex: 1,
              color: theme.palette.text.secondary,
              zIndex: 200,
              '.MuiTouchRipple-root': {
                display: 'none',
              },
            }}
            disableRipple
          />
        </BottomNavigation>
      </Box>
    </Box>
  )
}
