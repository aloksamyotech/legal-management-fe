import React, { useState } from 'react';
import './GlowingButton.css'; // Import the external CSS file
import ChatInterface from 'views/Chatbot/ChatView';
import { useNavigate } from 'react-router';

const GlowingButton = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const navigate = useNavigate();

  // Function to handle button click
  const toggleChat = () => {
    navigate(`/dashboard/AskAi`);
  };

  // Function to handle key press events for accessibility (Enter/Space)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      toggleChat();
    }
  };

  return (
    <>
      <div className="button-container" role="button" tabIndex="0" onClick={toggleChat} onKeyDown={handleKeyPress} aria-label="Ask AI">
        <div className="circle-btn">
          <span className="circle-text" style={{ marginRight: '8px' }}>
            <h4>Ask AI</h4>
          </span>
        </div>
      </div>

      {/* <ChatInterface chatOpen={chatOpen} setChatOpen={setChatOpen} /> */}
    </>
  );
};

export default GlowingButton;
