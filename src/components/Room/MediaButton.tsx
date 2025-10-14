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
          width: 64,
          height: 64,
          minHeight: 64,
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
