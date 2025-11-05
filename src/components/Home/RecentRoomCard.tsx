import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton' // Import IconButton
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos' // Import ArrowForwardIosIcon
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
        display: 'flex',
        justifyContent: 'space-between', // Changed to space-between to push icon to the right
        alignItems: 'center',
        flexDirection: 'row',
        padding: theme.spacing(2),
        margin: theme.spacing(1),
        boxShadow: theme.shadows[3],
        borderRadius: theme.shape.borderRadius,
        cursor: 'pointer',
        backgroundColor: theme.palette.background.paper,
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: theme.shadows[6],
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {/* STEP 2: Icon Container */}
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: theme.spacing(2),
            flexShrink: 0,
          }}
        >
          <Typography variant="h6">{firstLetter}</Typography>
        </Box>
        {/* The meeting name Typography */}
        <Typography variant="body1">{name}</Typography>
      </Box>

      {/* New: Arrow button on the right */}
      <IconButton aria-label="go to room">
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  )
}
