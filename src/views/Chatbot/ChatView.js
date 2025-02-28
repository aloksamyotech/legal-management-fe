import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, IconButton, Typography, Paper, Container, Avatar, Drawer } from '@mui/material';
import { styled } from '@mui/system';
import { format } from 'date-fns';
import { Messages } from 'core/comman/comman';
import { postApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import { useTranslation } from 'react-i18next';
import { IconMessage, IconMessageChatbot } from '@tabler/icons';

const ChatContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '80vh',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
}));

const MessagesArea = styled(Box)({
  flex: 1,
  overflowY: 'auto',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px'
});

const MessageBubble = styled(Paper)(({ isUser }) => ({
  maxWidth: '70%',
  padding: '12px 16px',
  borderRadius: isUser ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
  backgroundColor: isUser ? '#E6F2FF' : '#F0F0F0',
  alignSelf: isUser ? 'flex-end' : 'flex-start',
  position: 'relative'
}));

const InputArea = styled(Box)({
  padding: '20px',
  borderTop: '1px solid #eee',
  display: 'flex',
  gap: '10px',
  alignItems: 'center'
});

const StyledAvatar = styled(Avatar)({
  width: 32,
  height: 32,
  marginRight: '8px'
});

const ChatInterface = ({ chatOpen, setChatOpen }) => {
  const { t } = useTranslation();
  const [botGetResponse, setBotGetResponse] = useState(true);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
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
      setMessages([...messages, userMessage]);
      setNewMessage('');
      try {
        setBotGetResponse(true);
        const response = await postApi(urls?.ChatBot.sendPrompt, {
          text: newMessage.trim(),
          userId: localStorage.getItem('$2b$10$ehdPSDmr6P2')
        });
        const botMessage = {
          text: response.data?.data?.message,
          isUser: false,
          timestamp: new Date()
        };
        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        toast.error(t(Messages.CaseStage.CaseStage_add_Failed));
      } finally {
        setBotGetResponse(false);
      }

      //   setTimeout(() => {
      //     const botMessage = {
      //       text: "Thank you for your message. I'll get back to you shortly.",
      //       isUser: false,
      //       timestamp: new Date()
      //     };
      //     setMessages(prev => [...prev, botMessage]);
      //   }, 1000);
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
    <Drawer
      open={chatOpen}
      onClose={() => setChatOpen(false)}
      anchor="bottom"
      sx={{
        width: 500,
        '& .MuiDrawer-paper': {
          width: 500,
          boxSizing: 'border-box'
        }
      }}
    >
      <Container style={{}} maxWidth="md">
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

                {botGetResponse && !message.isUser && <Box>
                  <MessageBubble isUser={message.isUser}>
                    <Typography variant="body1">...</Typography>
                  </MessageBubble>
                </Box>}
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
            <IconButton onClick={handleSend} color="primary" disabled={!newMessage.trim()} sx={{ p: '10px' }}>
              Send
            </IconButton>
          </InputArea>
        </ChatContainer>
      </Container>
    </Drawer>
  );
};

export default ChatInterface;
