import { styled, useTheme } from '@mui/material/styles'

import IconButton from '@mui/material/IconButton'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Fab from '@mui/material/Fab'
import StepIcon from '@mui/material/StepIcon'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Slide from '@mui/material/Slide'
import Zoom from '@mui/material/Zoom'

import ExpandMore from '@mui/icons-material/ExpandMore'
import Menu from '@mui/icons-material/Menu'

import { useContext } from 'react'

import { ShellContext } from 'contexts/ShellContext'

import { drawerWidth } from './Drawer'
import { peerListWidth } from './PeerList'

interface AppBarProps extends MuiAppBarProps {
  isDrawerOpen?: boolean
  isPeerListOpen?: boolean
}

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop =>
    prop !== 'isDrawerOpen' && prop !== 'isPeerListOpen',
})<AppBarProps>(
  ({ theme, isDrawerOpen, isPeerListOpen }) => ({
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    boxShadow: 'none',
    '&.MuiAppBar-root, &.MuiPaper-root': {
      backgroundColor: theme.palette.background.default,
      backgroundImage: 'none',
    },
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(isDrawerOpen && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
    }),
    ...(isPeerListOpen && {
      width: `calc(100% - ${peerListWidth}px)`,
      marginRight: `${peerListWidth}px`,
    }),
    ...((isDrawerOpen || isPeerListOpen) && {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
    ...(isDrawerOpen &&
      isPeerListOpen && {
        width: `calc(100% - ${drawerWidth}px - ${peerListWidth}px)`,
      }),
  }),
  {
    // Override any default AppBar styles
    overridesResolver: (_props: any, styles: any) => ({
      ...styles.root,
    }),
  }
)

interface ShellAppBarProps {
  onDrawerOpen: () => void
  onLinkButtonClick: () => Promise<void>
  isDrawerOpen: boolean
  isPeerListOpen: boolean
  title: string
  onPeerListClick: () => void
  onRoomControlsClick: () => void
  setIsQRCodeDialogOpen: (isOpen: boolean) => void
  showAppBar: boolean
  isFullscreen: boolean
  setIsFullscreen: (isFullscreen: boolean) => void
}

export const ShellAppBar = (props: ShellAppBarProps) => {
  const {
    onDrawerOpen,
    onLinkButtonClick: _onLinkButtonClick,
    isDrawerOpen,
    isPeerListOpen,
    setIsQRCodeDialogOpen: _setIsQRCodeDialogOpen,
    title,
    onPeerListClick,
    onRoomControlsClick,
    showAppBar,
    isFullscreen: _isFullscreen,
    setIsFullscreen: _setIsFullscreen,
  } = props

  const theme = useTheme()
  const {
    peerList,
    isEmbedded,
    showRoomControls: _showRoomControls,
  } = useContext(ShellContext)

  return (
    <>
      <Slide appear={false} in={showAppBar} mountOnEnter unmountOnExit>
        <AppBar
          position="fixed"
          isDrawerOpen={isDrawerOpen}
          isPeerListOpen={isPeerListOpen}
        >
          <Toolbar
            variant="regular"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'transparent',
            }}
          >
            {isEmbedded ? null : (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="Open menu"
                sx={{
                  mr: 2,
                  ...(isDrawerOpen && { display: 'none' }),
                  color: theme.palette.text.primary,
                }}
                onClick={onDrawerOpen}
              >
                <Menu />
              </IconButton>
            )}

            <Tooltip title={title}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  mx: 'auto',
                  color: theme.palette.text.primary,
                }}
              >
                {title}
              </Typography>
            </Tooltip>

            {isEmbedded ? null : (
              <>
                {/* Commenting out these buttons temporarily
                <Tooltip title="Copy current URL">
                  <IconButton
                    size="large"
                    color="inherit"
                    aria-label="Copy current URL"
                    onClick={_onLinkButtonClick}
                    sx={{
                      color: theme.palette.text.primary,
                    }}
                  >
                    <Link />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Show QR Code">
                  <IconButton
                    size="large"
                    color="inherit"
                    aria-label="Show QR Code"
                    onClick={_handleQRCodeClick}
                    sx={{
                      color: theme.palette.text.primary,
                    }}
                  >
                    <QrCode2 />
                  </IconButton>
                </Tooltip>
                <Divider
                  orientation="vertical"
                  sx={{
                    height: theme.spacing(3.5),
                    mx: theme.spacing(1),
                    backgroundColor: theme.palette.divider,
                  }}
                />
                */}
                {/*<Tooltip
                  title={
                    showRoomControls
                      ? 'Hide Room Controls'
                      : 'Show Room Controls'
                  }
                >
                  <IconButton
                    size="large"
                    color="inherit"
                    aria-label="show room controls"
                    onClick={onRoomControlsClick}
                    sx={{
                      color: theme.palette.text.primary,
                    }}
                  >
                    <RoomPreferences />
                  </IconButton>
                </Tooltip>*/}
                {/*<Tooltip
                  title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                >
                  <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="fullscreen"
                    onClick={_onClickFullscreen}
                    sx={{
                      color: theme.palette.text.primary,
                    }}
                  >
                    {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
                  </IconButton>
                </Tooltip>*/}
                <Tooltip title="Click to show peer list">
                  <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="Peer list"
                    onClick={onPeerListClick}
                    sx={{
                      ml: 1,
                      color: theme.palette.text.primary,
                    }}
                  >
                    <StepIcon icon={peerList.length + 1} />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Slide>
      <Zoom
        style={{ position: 'absolute', left: '16px', top: '16px' }}
        in={!showAppBar}
        unmountOnExit
      >
        <Tooltip title="Show room controls">
          <Fab
            size="small"
            aria-label="show room controls"
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              boxShadow: theme.shadows[3],
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
            onClick={onRoomControlsClick}
          >
            <ExpandMore />
          </Fab>
        </Tooltip>
      </Zoom>
    </>
  )
}
