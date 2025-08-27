import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

// --- SVG Icons ---
const AiIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const CloseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [prompt, setPrompt] = useState('');
    // --- These lines define the variables from the error message ---
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // -------------------------------------------------------------
    const { token } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (prompt.trim() === '' || !token) return;
        
        setIsLoading(true);
        setResponse('');

        try {
            const res = await axios.post(
                'http://localhost:5001/api/ai/ask',
                { prompt },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }
            );
            setResponse(res.data.response);
        } catch (error) {
            setResponse('Sorry, something went wrong. Please try again.');
            console.error("Error asking AI:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <motion.button 
                className="ai-fab" 
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <AiIcon />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        className="ai-modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div 
                            className="ai-modal-content"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        >
                            <div className="ai-modal-header">
                                <h3>AI Assistant</h3>
                                <button onClick={() => setIsOpen(false)}><CloseIcon /></button>
                            </div>
                            <div className="ai-modal-body">
                                <div className="ai-response-area">
                                    {isLoading ? (
                                        <div className="loader"></div>
                                    ) : (
                                        <p>{response || "Ask me anything about your study topics..."}</p>
                                    )}
                                </div>
                                <form onSubmit={handleSubmit} className="ai-prompt-form">
                                    <input 
                                        type="text"
                                        placeholder="Explain the concept of..."
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                    />
                                    <button type="submit">Ask</button>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AIAssistant;