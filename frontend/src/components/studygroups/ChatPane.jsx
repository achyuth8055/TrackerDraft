import React, { useState, useEffect, useRef } from 'react';

// SVG Icon for the send button
const SendIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChatPane = ({ group }) => {
  const [messages, setMessages] = useState(group.messages);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  // This effect ensures the chat window always shows the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // This effect updates the messages when the user switches groups
  useEffect(() => {
    setMessages(group.messages);
  }, [group]);


  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const messageToSend = {
      id: Date.now(),
      user: { name: 'Alex Turner', avatar: 'A' }, // This would come from user context in a real app
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, messageToSend]);
    setNewMessage('');
  };

  if (!group) {
    return <div className="chat-pane-empty">Select a group to start chatting</div>;
  }

  return (
    <div className="chat-pane">
      <header className="chat-pane-header">
        <h2 className="chat-group-name"># {group.name}</h2>
        <div className="chat-group-description">{group.description}</div>
      </header>
      <div className="message-list">
        {messages.map(msg => (
          <div key={msg.id} className="message-item">
            <div className="message-avatar">{msg.user.avatar}</div>
            <div className="message-content">
              <div className="message-header">
                <span className="message-user-name">{msg.user.name}</span>
                <span className="message-timestamp">{msg.timestamp}</span>
              </div>
              <p className="message-text">{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form className="message-input-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          className="message-input"
          placeholder={`Message #${group.name}`}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit" className="send-message-btn">
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default ChatPane;