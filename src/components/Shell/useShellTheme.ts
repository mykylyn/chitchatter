import { SettingsContext } from 'contexts/SettingsContext'
import { useContext, useMemo } from 'react'
import { createTheme } from '@mui/material/styles'

export const useShellTheme = () => {
  const { getUserSettings } = useContext(SettingsContext)
  // Default colorMode to 'dark' if it's not set in user settings
  const { colorMode = 'dark' } = getUserSettings()

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: 'Inter, "Noto Sans", sans-serif',
        },
        palette: {
          mode: colorMode,
          primary: {
            main: '#194ce6', // Updated primary color
          },
          secondary: {
            main: colorMode === 'dark' ? '#93a0c8' : '#8E8E93', // Updated secondary
          },
          text: {
            primary: colorMode === 'dark' ? '#ffffff' : '#1C1C1E', // Updated text colors
            secondary: colorMode === 'dark' ? '#93a0c8' : '#8E8E93',
          },
          background: {
            default: colorMode === 'dark' ? '#111521' : '#f6f6f8', // Updated backgrounds
            paper: colorMode === 'dark' ? '#1a2032' : '#ffffff',
          },
          divider: colorMode === 'dark' ? '#344065' : '#e5e7eb', // Updated dividers
        },
        shape: {
          borderRadius: 4, // Default 0.25rem
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: '12px', // 0.75rem
                textTransform: 'none',
                fontWeight: 700,
                letterSpacing: '0.015em',
                minHeight: '44px',
                padding: '8px 20px',
              },
              outlined: {
                borderColor: colorMode === 'dark' ? '#344065' : '#e5e7eb',
                backgroundColor: colorMode === 'dark' ? '#1a2032' : '#ffffff',
                color: colorMode === 'dark' ? '#ffffff' : '#1C1C1E',
                borderWidth: '1px',
                '&:hover': {
                  backgroundColor: colorMode === 'dark' ? '#1a2032' : '#f6f6f8',
                  borderColor: '#194ce6',
                },
              },
              contained: {
                backgroundColor: '#194ce6',
                color: '#ffffff',
                borderRadius: '12px', // xl rounded
                '&:hover': {
                  backgroundColor: '#194ce6',
                },
              },
            },
          },
          MuiToggleButton: {
            styleOverrides: {
              root: {
                borderRadius: '8px', // Smaller for segmented control
                textTransform: 'none',
                fontWeight: 500,
                letterSpacing: '0.015em',
                padding: '8px 16px',
                border: 'none',
                backgroundColor: 'transparent',
                color: colorMode === 'dark' ? '#93a0c8' : '#8E8E93',
                '&:hover': {
                  backgroundColor: 'transparent',
                },
                '&.Mui-selected': {
                  backgroundColor: colorMode === 'dark' ? '#0f1420' : '#f0f2f5',
                  color: colorMode === 'dark' ? '#ffffff' : '#1C1C1E',
                  fontWeight: 'bold',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  '&:hover': {
                    backgroundColor:
                      colorMode === 'dark' ? '#0f1420' : '#f0f2f5',
                  },
                },
              },
            },
          },
          MuiIconButton: {
            styleOverrides: {
              root: {
                color: colorMode === 'dark' ? '#ffffff' : '#1C1C1E',
                backgroundColor: 'transparent',
                borderRadius: '8px', // rounded-lg
                '&:hover': {
                  backgroundColor:
                    colorMode === 'dark'
                      ? 'rgba(255,255,255,0.08)'
                      : 'rgba(0,0,0,0.04)',
                  color: '#194ce6',
                },
                '&:focus': {
                  backgroundColor:
                    colorMode === 'dark'
                      ? 'rgba(255,255,255,0.08)'
                      : 'rgba(0,0,0,0.04)',
                  color: '#194ce6',
                },
              },
            },
          },
          MuiLink: {
            styleOverrides: {
              root: {
                color: '#0062f5',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              },
            },
          },
          MuiDrawer: {
            styleOverrides: {
              paper: {
                backgroundColor: colorMode === 'dark' ? '#1e1e1e' : '#ffffff',
                borderRight:
                  colorMode === 'dark'
                    ? '1px solid #333333'
                    : '1px solid #f0f2f5',
              },
            },
          },
          MuiSvgIcon: {
            styleOverrides: {
              root: {
                fontSize: '1.25rem',
                color: colorMode === 'dark' ? '#ffffff' : '#101418',
              },
            },
          },

          MuiStepIcon: {
            styleOverrides: {
              root: {
                '& > *': {
                  color:
                    colorMode === 'dark'
                      ? '#ffffff !important'
                      : '#101418 !important',
                  fontSize: '0.75rem !important',
                  fontWeight: '600 !important',
                },
              },
            },
          },
          MuiTooltip: {
            styleOverrides: {
              tooltip: {
                backgroundColor: colorMode === 'dark' ? '#101418' : '#101418',
                color: '#ffffff',
                fontSize: '0.75rem',
                fontWeight: 500,
                borderRadius: '8px',
                padding: '8px 12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              },
              arrow: {
                color: colorMode === 'dark' ? '#101418' : '#101418',
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                '& .MuiOutlinedInput-root': {
                  height: 56,
                  borderRadius: 12,
                  backgroundColor: colorMode === 'dark' ? '#1a2032' : '#ffffff',
                  '& fieldset': {
                    borderColor: colorMode === 'dark' ? '#344065' : '#e5e7eb',
                    borderWidth: '1px',
                  },
                  '&:hover fieldset': {
                    borderColor: '#194ce6',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#194ce6',
                  },
                },
              },
            },
          },
          MuiInputLabel: {
            styleOverrides: {
              root: {
                color: colorMode === 'dark' ? '#b0b0b0' : '#5e718d',
                fontSize: '0.875rem',
                fontWeight: 500,
                marginBottom: '8px',
                '&.Mui-focused': {
                  color: '#0062f5',
                },
                '&.MuiFormLabel-filled': {
                  color: colorMode === 'dark' ? '#ffffff' : '#101418',
                },
              },
            },
          },
          MuiOutlinedInput: {
            styleOverrides: {
              input: {
                padding: '15px',
                fontSize: '1rem',
                color: colorMode === 'dark' ? '#ffffff' : '#1C1C1E',
                '&::placeholder': {
                  color: colorMode === 'dark' ? '#93a0c8' : '#8E8E93',
                  opacity: 1,
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
                color: colorMode === 'dark' ? '#ffffff' : '#1C1C1E',
              },
              h5: {
                fontSize: '1.375rem',
                fontWeight: 700,
                letterSpacing: '-0.015em',
                color: colorMode === 'dark' ? '#ffffff' : '#1C1C1E',
              },
            },
          },
          MuiAccordion: {
            styleOverrides: {
              root: {
                backgroundColor: 'transparent',
                boxShadow: 'none',
                '&:before': {
                  display: 'none',
                },
              },
            },
          },
          MuiAccordionSummary: {
            styleOverrides: {
              root: {
                padding: '12px 0',
                minHeight: 'auto',
                '& .MuiAccordionSummary-content': {
                  margin: 0,
                },
              },
            },
          },
          MuiAccordionDetails: {
            styleOverrides: {
              root: {
                padding: '8px 0 0 0',
              },
            },
          },
        },
      }),
    [colorMode]
  )

  return theme
}
