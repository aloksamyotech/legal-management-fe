import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Drawer, Fab, IconButton } from '@mui/material';
import { IconSettings, IconMessageChatbot } from '@tabler/icons';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { SET_BORDER_RADIUS, SET_FONT_FAMILY } from 'store/actions';
import { gridSpacing } from 'store/constant';
import ChatInterface from 'views/Chatbot/ChatView';

// concat 'px'

// ==============================|| LIVE CUSTOMIZATION ||============================== //

const Customization = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const theme = useTheme();

  return (
    <>
      <Fab
        component="div"
        onClick={() => setChatOpen(!chatOpen)}
        size="medium"
        variant="circular"
        color="secondary"
        sx={{
          borderRadius: 0,
          borderTopLeftRadius: '50%',
          borderBottomLeftRadius: '50%',
          borderTopRightRadius: '50%',
          borderBottomRightRadius: '4px',
          top: '35%',
          position: 'fixed',
          right: 10,
          zIndex: theme.zIndex.speedDial
        }}
      >
        <IconButton size="large" color="inherit" onClick={() => setChatOpen(!chatOpen)}>
          <IconMessageChatbot />
        </IconButton>
      </Fab>
      <ChatInterface chatOpen={chatOpen} setChatOpen={setChatOpen} />
    </>
  );
};

export default Customization;
