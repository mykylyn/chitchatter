import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useTheme from '@mui/material/styles/useTheme'

export interface RecentRoomCardProps {
  name: string
}

export const RecentRoomCard = ({ name }: RecentRoomCardProps) => {
  const theme = useTheme() // STEP 1: Extract the first letter and make it uppercase

  const firstLetter = name.charAt(0).toUpperCase()

  return (
    <Box
      sx={{
        // STEP 3: Adjust layout for icon on the left
        display: 'flex',
        justifyContent: 'flex-start', // Aligns icon and text to the left
        alignItems: 'center',
        flexDirection: 'row', // Lays out children horizontally
        // Existing styles remain
        padding: theme.spacing(2),
        margin: theme.spacing(1),
        boxShadow: theme.shadows[3], // Applying a shadow
        borderRadius: theme.shape.borderRadius,
        cursor: 'pointer',
        backgroundColor: theme.palette.background.paper,
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: theme.shadows[6], // Enhanced shadow on hover
        },
      }}
    >
      {/* STEP 2: Icon Container */}
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: '50%', // Circle shape
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: theme.spacing(2), // Space to the right of the icon
          flexShrink: 0,
        }}
      >
        <Typography variant="h6">{firstLetter}</Typography>
      </Box>
      {/* The meeting name Typography */}
      <Typography variant="body1">{name}</Typography>
    </Box>
  )
}
