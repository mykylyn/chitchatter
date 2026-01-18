import Box, { BoxProps } from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface SplashScreenProps extends BoxProps {}

export const SplashScreen = ({ sx = [], ...props }: SplashScreenProps) => {
  return (
    <Box
      sx={[
        {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: theme =>
            theme.palette.mode === 'dark' ? '#111521' : 'rgba(0,0,0,0.05)',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 'bold',
          mb: 3,
          color: 'text.primary',
        }}
      >
        Blitz Meet
      </Typography>
    </Box>
  )
}
