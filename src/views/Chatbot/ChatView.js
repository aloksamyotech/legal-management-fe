import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, IconButton, Typography, Paper, Container, Avatar, Drawer } from '@mui/material';
import { styled } from '@mui/system';
import { format } from 'date-fns';
import { Messages } from 'core/comman/comman';
import { postApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import { useTranslation } from 'react-i18next';
import { IconMessage, IconMessageChatbot } from '@tabler/icons';
import { ArrowUpward } from '@mui/icons-material';

const ChatContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '80vh',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  overflow: 'hidden'
}));

const MessagesArea = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  animation: 'fadeIn 0.5s ease-out'
}));

const MessageBubble = styled(Paper)(({ isUser }) => ({
  minWidth: '30%',
  maxWidth: '70%',
  padding: '12px 16px',
  borderRadius: isUser ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
  backgroundColor: isUser ? '#E6F2FF' : '#F0F0F0',
  alignSelf: isUser ? 'flex-end' : 'flex-start',
  position: 'relative',
  transition: 'all 0.3s ease'
}));

const InputArea = styled(Box)(({ theme }) => ({
  padding: '20px',
  borderTop: '1px solid #eee',
  display: 'flex',
  gap: '10px',
  alignItems: 'center'
}));

const StyledAvatar = styled(Avatar)({
  width: 32,
  height: 32,
  marginRight: '8px'
});

const RoundButton = styled(IconButton)(({ theme }) => ({
  padding: '10px',
  borderRadius: '50%',
  backgroundColor: '#8e44ad',
  '&:hover': {
    backgroundColor: '#7d3c98'
  },
  color: '#fff',
  transition: 'background-color 0.3s ease'
}));

const TypingIndicator = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  fontSize: '24px',
  color: '#8e44ad',
  position: 'relative',

  '&::after': {
    content: '"."',
    display: 'inline-block',
    animation: 'waveAnimation 1.5s infinite ease-in-out',
    fontWeight: 'bold'
  },

  '@keyframes waveAnimation': {
    '0%': {
      content: '"."',
      opacity: 0
    },
    '33%': {
      content: '".."',
      opacity: 1
    },
    '66%': {
      content: '"..."',
      opacity: 1
    },
    '100%': {
      content: '"."',
      opacity: 0
    }
  }
}));

const ChatInterface = ({ chatOpen, setChatOpen }) => {
  const { t } = useTranslation();
  const [botGetResponse, setBotGetResponse] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [typingIndicator, setTypingIndicator] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (newMessage.trim()) {
      const userMessage = {
        text: newMessage.trim(),
        isUser: true,
        timestamp: new Date()
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setNewMessage('');

      const typingMessage = { text: '...', isUser: false, timestamp: new Date(), isTyping: true };
      setTypingIndicator(typingMessage);
      setMessages((prevMessages) => [...prevMessages, typingMessage]);

      try {
        const response = await postApi(urls?.ChatBot.sendPrompt, {
          text: newMessage.trim(),
          userId: localStorage.getItem('$2b$10$ehdPSDmr6P2')
        });
        const botMessage = {
          text: response.data?.data?.message,
          isUser: false,
          timestamp: new Date()
        };
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages];
          const typingMessageIndex = newMessages.findIndex((msg) => msg.isTyping);
          if (typingMessageIndex !== -1) {
            newMessages[typingMessageIndex] = botMessage;
          }
          return newMessages;
        });
      } catch (error) {
        toast.error(t(Messages.CaseStage.CaseStage_add_Failed));
      } finally {
        setBotGetResponse(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatMessageTime = (date) => {
    return format(date, 'HH:mm');
  };

  return (
    // <Drawer
    //   open={chatOpen}
    //   onClose={() => setChatOpen(false)}
    //   anchor="bottom"
    //   sx={{
    //     borderRadius: 20,
    //     width: 500,
    //     '& .MuiDrawer-paper': {
    //       width: "100%",
    //       borderRadius: 2,
    //       boxSizing: 'border-box'
    //     }
    //   }}
    // >
    <Container style={{ height: 400, padding: 3 }} maxWidth="md">
      <ChatContainer>
        <MessagesArea>
          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection: message.isUser ? 'row-reverse' : 'row',
                gap: '8px'
              }}
            >
              <StyledAvatar src={message.isUser ? <IconMessageChatbot /> : <IconMessageChatbot />} />

              {message.isTyping && (
                <Box>
                  <MessageBubble isUser={message.isUser}>
                    <TypingIndicator />
                  </MessageBubble>
                </Box>
              )}

              {!message.isTyping && (
                <Box>
                  <MessageBubble isUser={message.isUser}>
                    <Typography variant="body1">{message.text}</Typography>
                  </MessageBubble>
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      textAlign: message.isUser ? 'right' : 'left',
                      mt: 0.5,
                      color: 'text.secondary'
                    }}
                  >
                    {formatMessageTime(message.timestamp)}
                  </Typography>
                </Box>
              )}
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </MessagesArea>

        <InputArea>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            inputProps={{ maxLength: 500 }}
            size="small"
          />
          <RoundButton onClick={handleSend} disabled={!newMessage.trim()}>
            <ArrowUpward sx={{ color: '#fff' }} />
          </RoundButton>
        </InputArea>
      </ChatContainer>
    </Container>
    // </Drawer>
  );
};

export default ChatInterface;
