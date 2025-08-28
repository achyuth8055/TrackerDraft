import React, { useState, useEffect, useRef, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthContext from '../../context/AuthContext';

// --- SVG Icons ---
const SendIcon = () => ( <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> );
const ReplyIcon = () => ( <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> );

const ChatPane = ({ group, authAxios }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const messagesEndRef = useRef(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchMessages = async () => {
      if (group) {
        try {
          const res = await authAxios.get(`/${group._id}/messages`);
          setMessages(res.data.data);
        } catch (error) {
          console.error("Failed to fetch messages:", error);
          setMessages([]); // Clear messages on error or group switch
        }
      }
    };
    fetchMessages();
  }, [group, authAxios]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    try {
      const res = await authAxios.post(`/${group._id}/messages`, {
        text: newMessage,
        parentMessageId: replyingTo ? replyingTo._id : null
      });
      // Add the new message to the list without a full refetch
      setMessages(prevMessages => [...prevMessages, res.data.data]);
      setNewMessage('');
      setReplyingTo(null);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  if (!group) {
    return <div className="chat-pane-empty">Select or join a group to start chatting.</div>;
  }

  return (
    <div className="chat-pane">
      <header className="chat-pane-header">
        <h2 className="chat-group-name"># {group.name}</h2>
        <div className="chat-group-description">{group.description}</div>
      </header>
      <div className="message-list">
        <AnimatePresence>
          {messages.map(msg => (
            <motion.div
              key={msg._id}
              className={`message-item ${msg.user._id === user.id ? 'sent' : 'received'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="message-avatar">{msg.user.name.charAt(0).toUpperCase()}</div>
              <div className="message-content">
                <div className="message-header">
                  <span className="message-user-name">{msg.user.name}</span>
                  <span className="message-timestamp">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p className="message-text">{msg.text}</p>
                <button className="reply-btn" onClick={() => setReplyingTo(msg)}><ReplyIcon/> Reply</button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {replyingTo && (
        <div className="replying-to-banner">
          <span>Replying to <strong>{replyingTo.user.name}</strong></span>
          <button onClick={() => setReplyingTo(null)}>×</button>
        </div>
      )}

      <form className="message-input-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          className="message-input"
          placeholder={replyingTo ? 'Write a reply...' : `Message #${group.name}`}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit" className="send-message-btn"><SendIcon /></button>
      </form>
    </div>
  );
};

export default ChatPane;