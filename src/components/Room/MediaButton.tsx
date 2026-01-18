import Fab, { FabProps } from '@mui/material/Fab'
import { forwardRef } from 'react'

interface MediaButtonProps extends Partial<FabProps> {
  isActive: boolean
}

export const MediaButton = forwardRef<HTMLButtonElement, MediaButtonProps>(
  ({ isActive, sx, ...props }: MediaButtonProps, ref) => {
    return (
      <Fab
        {...props}
        ref={ref}
        color={isActive ? 'primary' : 'secondary'}
        sx={{
          flex: 1, // Allow button to take equal space
          height: 48, // Fixed height for pill shape
          minHeight: 48,
          maxHeight: 48, // Fixed height to maintain pill shape
          borderRadius: 24, // Pill shape with half the height for fully rounded ends
          mx: 0.5, // Add horizontal margin for spacing between buttons
          minWidth: 60, // Ensure minimum usability size, but allow shrinking
          ...(isActive && {
            backgroundColor: '#0062f5',
            color: '#ffffff',
            '&:hover': {
              color: '#000',
              backgroundColor: '#0052cc',
            },
          }),
          ...sx, // Allow parent components to override styles
        }}
      />
    )
  }
)
