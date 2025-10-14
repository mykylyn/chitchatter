import { SettingsContext } from 'contexts/SettingsContext'
import { useContext, useMemo } from 'react'
import { createTheme } from '@mui/material/styles'

export const useShellTheme = () => {
  const { getUserSettings } = useContext(SettingsContext)
  const { colorMode } = getUserSettings()

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: 'Inter, "Noto Sans", sans-serif',
        },
        palette: {
          mode: colorMode,
          primary: {
            main: '#0062f5', // Blue accent for buttons/FAB
          },
          secondary: {
            main: '#6b7280', // Neutral gray for inactive buttons
          },
          text: {
            primary: '#101418', // Main dark text
            secondary: '#5e718d', // Subtle gray text
          },
          background: {
            default: '#ffffff', // White backgrounds
            paper: '#ffffff', // For cards/lists
          },
          divider: '#f0f2f5', // Light borders/dividers
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: '20px',
                textTransform: 'none',
                fontWeight: 700,
                letterSpacing: '0.015em',
                minHeight: '44px',
                padding: '8px 20px',
              },
              outlined: {
                borderColor: '#a8bbd4',
                backgroundColor: '#ffffff',
                color: '#101418',
                borderWidth: '2px',
                '&:hover': {
                  backgroundColor: '#f8f9fa',
                  borderColor: '#8fa8c4',
                  borderWidth: '2px',
                },
                '&.Mui-selected': {
                  backgroundColor: '#0062f5',
                  color: '#ffffff',
                  borderColor: '#0062f5',
                  '&:hover': {
                    backgroundColor: '#0052cc',
                    borderColor: '#0052cc',
                  },
                },
              },
              contained: {
                backgroundColor: '#0062f5',
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: '#0052cc',
                },
              },
            },
          },
          MuiToggleButton: {
            styleOverrides: {
              root: {
                borderRadius: '20px',
                textTransform: 'none',
                fontWeight: 600,
                letterSpacing: '0.015em',
                minHeight: '40px',
                padding: '8px 16px',
                border: '2px solid #c7d2e0',
                backgroundColor: '#ffffff',
                color: '#101418',
                '&:hover': {
                  backgroundColor: '#f8f9fa',
                  borderColor: '#a8bbd4',
                },
                '&.Mui-selected': {
                  backgroundColor: '#0062f5',
                  color: '#ffffff',
                  borderColor: '#0062f5',
                  '&:hover': {
                    backgroundColor: '#0052cc',
                    borderColor: '#0052cc',
                  },
                },
              },
            },
          },
          MuiIconButton: {
            styleOverrides: {
              root: {
                color: '#101418',
                backgroundColor: 'transparent',
                '&:hover': {
                  backgroundColor: '#f8f9fa',
                  color: '#0062f5',
                },
                '&:focus': {
                  backgroundColor: '#f0f2f5',
                  color: '#0062f5',
                },
              },
            },
          },
          MuiDrawer: {
            styleOverrides: {
              paper: {
                backgroundColor: '#ffffff',
                borderRight: '1px solid #f0f2f5',
              },
            },
          },
          MuiSvgIcon: {
            styleOverrides: {
              root: {
                fontSize: '1.25rem',
                color: '#101418',
              },
            },
          },

          MuiStepIcon: {
            styleOverrides: {
              root: {
                '& > *': {
                  color: '#101418 !important',
                  fontSize: '0.75rem !important',
                  fontWeight: '600 !important',
                },
              },
            },
          },
          MuiTooltip: {
            styleOverrides: {
              tooltip: {
                backgroundColor: '#101418',
                color: '#ffffff',
                fontSize: '0.75rem',
                fontWeight: 500,
                borderRadius: '8px',
                padding: '8px 12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              },
              arrow: {
                color: '#101418',
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                '& .MuiOutlinedInput-root': {
                  height: 56,
                  borderRadius: 12,
                  backgroundColor: '#f8f9fa',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  '& fieldset': {
                    borderColor: '#9ca3af',
                    borderWidth: '1.5px',
                  },
                  '&:hover fieldset': {
                    borderColor: '#6b7280',
                    borderWidth: '2px',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#0062f5',
                    borderWidth: '2px',
                    boxShadow: '0 0 0 3px rgba(0, 98, 245, 0.1)',
                  },
                },
              },
            },
          },
          MuiInputLabel: {
            styleOverrides: {
              root: {
                color: '#5e718d',
                fontSize: '0.875rem',
                fontWeight: 500,
                marginBottom: '8px',
                '&.Mui-focused': {
                  color: '#0062f5',
                },
                '&.MuiFormLabel-filled': {
                  color: '#101418',
                },
              },
            },
          },
          MuiOutlinedInput: {
            styleOverrides: {
              input: {
                padding: '12px 16px',
                fontSize: '1rem',
                color: '#101418',
                '&::placeholder': {
                  color: '#5e718d',
                  opacity: 1, // Increased for better placeholder visibility
                },
              },
            },
          },
          MuiTypography: {
            styleOverrides: {
              h6: {
                fontWeight: 700,
                fontSize: '1.125rem',
                letterSpacing: '-0.015em',
              },
              h5: {
                fontSize: '1.375rem',
                fontWeight: 700,
                letterSpacing: '-0.015em',
              },
            },
          },
        },
      }),
    [colorMode]
  )

  return theme
}
