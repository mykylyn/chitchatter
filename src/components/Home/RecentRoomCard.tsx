import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export interface RecentRoomCardProps {
  name: string
  time: string
}

export const RecentRoomCard = ({ name, time }: RecentRoomCardProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2.7,
        borderRadius: 3,
        backgroundColor: 'background.paper',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: theme =>
          theme.palette.mode === 'dark'
            ? `1px solid ${theme.palette.divider}`
            : '1px solid transparent',
      }}
    >
      <Box>
        <Typography sx={{ fontWeight: 'semibold', color: 'text.primary' }}>
          {name}
        </Typography>
        <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
          {time}
        </Typography>
      </Box>
      <Button
        variant="outlined"
        sx={{
          borderRadius: 2.5,
          height: 40,
          px: 4,
          textTransform: 'none',
          fontWeight: 'bold',
          backgroundColor: theme => theme.palette.primary.main + '10',
          color: 'primary.main',
          border: 'none',
          '&:hover': {
            backgroundColor: theme => theme.palette.primary.main + '20',
          },
        }}
      >
        Re-join
      </Button>
    </Box>
  )
}
