import Box from '@mui/material/Box'
import Zoom from '@mui/material/Zoom'
import { useWindowSize } from '@react-hook/window-size'
import { useContext, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'

import { ChatTranscript } from 'components/ChatTranscript'
import { WholePageLoading } from 'components/Loading'
import { MessageForm } from 'components/MessageForm'
import { trackerUrls } from 'config/trackerUrls'
import { RoomContext } from 'contexts/RoomContext'
import { SettingsContext } from 'contexts/SettingsContext'
import { ShellContext } from 'contexts/ShellContext'
import { useTurnConfig } from 'hooks/useTurnConfig'
import { time } from 'lib/Time'
import { encryption } from 'services/Encryption'

import { RoomAudioControls } from './RoomAudioControls'
import { RoomBottomNavigation } from './RoomBottomNavigation'
import { RoomEndCallControl } from './RoomEndCallControl'
// import { RoomFileUploadControls } from './RoomFileUploadControls'
// import { RoomScreenShareControls } from './RoomScreenShareControls'
import { RoomShowMessagesControls } from './RoomShowMessagesControls'
import { RoomVideoControls } from './RoomVideoControls'
import { RoomVideoDisplay } from './RoomVideoDisplay'
import { TypingStatusBar } from './TypingStatusBar'
import { useRoom } from './useRoom'

export interface RoomProps {
  appId?: string
  getUuid?: typeof uuid
  password?: string
  roomId: string
  userId: string
  encryptionService?: typeof encryption
  timeService?: typeof time
  targetPeerId?: string
}

interface RoomInnerProps extends RoomProps {
  turnConfig: RTCConfiguration
}

const RoomCore = ({
  appId = `${encodeURI(window.location.origin)}_${process.env.VITE_NAME}`,
  getUuid = uuid,
  encryptionService = encryption,
  timeService = time,
  roomId,
  password,
  userId,
  targetPeerId,
  turnConfig,
}: RoomInnerProps) => {
  useEffect(() => {
    console.log(`Room component is running:`)
  }, [])

  const settingsContext = useContext(SettingsContext)
  const { showActiveTypingStatus, publicKey } =
    settingsContext.getUserSettings()

  const {
    isDirectMessageRoom,
    // handleInlineMediaUpload,
    handleMessageChange,
    isMessageSending,
    messageLog,
    peerRoom,
    roomContextValue,
    sendMessage,
    showVideoDisplay,
  } = useRoom(
    {
      appId,
      relayUrls: trackerUrls,
      password,
      relayRedundancy: 4,
      turnConfig: turnConfig.iceServers,
      ...(import.meta.env.VITE_IS_E2E_TEST && {
        rtcConfig: {
          iceServers: [],
        },
      }),
    },
    {
      roomId,
      userId,
      getUuid,
      publicKey,
      encryptionService,
      timeService,
      targetPeerId,
    }
  )

  const { showRoomControls } = useContext(ShellContext)
  const [windowWidth, windowHeight] = useWindowSize()
  const landscape = windowWidth > windowHeight

  const handleMessageSubmit = async (message: string) => {
    await sendMessage(message)
  }

  const showMessages = roomContextValue.isShowingMessages

  // State for bottom navigation tabs (0 = Call, 1 = Chat)
  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = (tab: number) => {
    setActiveTab(tab)
  }

  return (
    <RoomContext.Provider value={roomContextValue}>
      <Box
        className="Room"
        sx={{
          height: '100%',
          display: 'flex',
          flexGrow: 1,
          overflow: 'auto',
          flexDirection: 'column',
        }}
      >
        {/* Parent container */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            overflow: 'auto',
            position: 'relative', // Create positioning context for absolute children
            width: '100%', // Ensure this container is full width for correct centering
            paddingBottom: '80px', // Account for fixed bottom navigation height
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: landscape ? 'row' : 'column',
              height: '100%',
              width: '100%',
              overflow: 'auto',
            }}
          >
            {showVideoDisplay &&
              activeTab === 0 && ( // Only show video when on Call tab
                <RoomVideoDisplay
                  userId={userId}
                  width="100%"
                  height={landscape || !showMessages ? '100%' : '60%'}
                />
              )}

            {/* Show chat content when Chat tab is selected */}
            {activeTab === 1 && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                  width: showVideoDisplay && landscape ? '400px' : '100%',
                  height: '100%',
                  paddingTop: 1,
                }}
              >
                <Box
                  sx={{
                    flexGrow: 1,
                    overflow: 'auto',
                    mb: 1,
                  }}
                >
                  <ChatTranscript
                    messageLog={messageLog}
                    userId={userId}
                    sx={{
                      ...(isDirectMessageRoom && { pt: 1 }),
                      height: '100%',
                    }}
                  />
                </Box>
                <Box>
                  <MessageForm
                    onMessageSubmit={handleMessageSubmit}
                    isMessageSending={isMessageSending}
                    onMessageChange={handleMessageChange}
                  />
                  {showActiveTypingStatus ? (
                    <TypingStatusBar
                      isDirectMessageRoom={isDirectMessageRoom}
                    />
                  ) : null}
                </Box>
              </Box>
            )}
          </Box>

          {/* Show call controls only when on Call tab */}
          {activeTab === 0 && !isDirectMessageRoom && (
            <Zoom in={showRoomControls}>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  overflow: 'visible',
                  position: 'absolute',
                  bottom: '96px', // Positioned above the bottom navigation (80px height + 16px padding)
                  left: 0,
                  right: 0,
                  zIndex: 1000,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around', // Distribute items with equal space around
                    backgroundColor: theme =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(0, 0, 0, 0.4)'
                        : 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 4,
                    padding: 1.5,
                    boxShadow: 3,
                    width: '90%',
                    maxWidth: '700px',
                    overflow: 'hidden',
                    flexWrap: 'nowrap', // Prevent wrapping to maintain horizontal layout
                  }}
                >
                  <RoomAudioControls peerRoom={peerRoom} />
                  <RoomVideoControls peerRoom={peerRoom} />
                  {/*<RoomScreenShareControls peerRoom={peerRoom} />
                  <RoomFileUploadControls
                    peerRoom={peerRoom}
                    onInlineMediaUpload={handleInlineMediaUpload}
                  />*/}
                  <RoomEndCallControl />
                  <Zoom in={showVideoDisplay} mountOnEnter unmountOnExit>
                    <span>
                      <RoomShowMessagesControls />
                    </span>
                  </Zoom>
                </Box>
              </Box>
            </Zoom>
          )}
        </Box>
        <RoomBottomNavigation initialTab={0} onTabChange={handleTabChange} />
      </Box>
    </RoomContext.Provider>
  )
}

export const Room = (props: RoomProps) => {
  const { isEnhancedConnectivityEnabled } =
    useContext(SettingsContext).getUserSettings()

  const { turnConfig, isLoading: isConfigLoading } = useTurnConfig(
    isEnhancedConnectivityEnabled
  )

  if (isConfigLoading) {
    return <WholePageLoading />
  }

  return <RoomCore {...props} turnConfig={turnConfig} />
}
