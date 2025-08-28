import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { marked } from 'marked';
import AuthContext from '../context/AuthContext';

// --- SVG Icons (no changes) ---
const AiIcon = () => ( <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> );
const CloseIcon = () => ( <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> );


const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { token, user } = useContext(AuthContext);

    const greeting = user ? `Hi ${user.name}, this is Tom. How can I help you?` : "Ask me anything...";

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (prompt.trim() === '' || !token) return;

        setIsLoading(true);
        setResponse('');
        const currentPrompt = prompt;
        setPrompt('');

        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/ai/ask`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ prompt: currentPrompt }),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop(); // Keep the last, possibly incomplete line

                for (const line of lines) {
                    const trimmedLine = line.replace(/^data: /, '').trim();
                    if (trimmedLine === '' || trimmedLine === '[DONE]') continue;

                    try {
                        const parsed = JSON.parse(trimmedLine);
                        const content = parsed.choices[0]?.delta?.content || '';
                        if (content) {
                            setResponse(prev => prev + content);
                        }
                    } catch (error) {
                        // This can happen if a line is not valid JSON, we can ignore it
                        console.warn('Skipping non-JSON line from stream:', trimmedLine);
                    }
                }
            }
        } catch (error) {
            setResponse('Sorry, something went wrong. Please try again.');
            console.error("Error asking AI:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    const formattedResponse = marked.parse(response || '');

    return (
        <>
            <motion.button className="ai-fab" onClick={() => setIsOpen(true)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} aria-label="Open AI Assistant">
                <AiIcon />
            </motion.button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div className="ai-modal-backdrop" onClick={() => setIsOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <motion.div className="ai-modal-content" onClick={(e) => e.stopPropagation()} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
                            <div className="ai-modal-header">
                                <h3>Hai {user.name}! i'm your Assistant</h3>
                                <button onClick={() => setIsOpen(false)} aria-label="Close AI Assistant"><CloseIcon /></button>
                            </div>
                            <div className="ai-modal-body">
                                <div className="ai-response-area">
                                    {isLoading && response === '' ? (
                                        <div className="loader"></div>
                                    ) : response ? (
                                        <div dangerouslySetInnerHTML={{ __html: formattedResponse }} />
                                    ) : (
                                        <p>{greeting}</p>
                                    )}
                                </div>
                                <form onSubmit={handleSubmit} className="ai-prompt-form">
                                    <input type="text" placeholder="Explain the concept of..." value={prompt} onChange={(e) => setPrompt(e.target.value)} disabled={isLoading}/>
                                    <button type="submit" disabled={isLoading}>
                                        {isLoading ? 'Thinking...' : 'Ask'}
                                    </button>
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
