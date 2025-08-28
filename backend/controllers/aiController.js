const axios = require('axios');
require('dotenv').config();

const handleAskAI = async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ success: false, error: 'Prompt is required.' });
    }

    // Token-optimized prompt
    const optimizedPrompt = `
        You are an expert tutor AI named Tom. A student has asked a question. 
        Provide a concise, direct explanation suitable for a study guide. 
        Use markdown for formatting like code blocks, bold text, and lists.
        Get straight to the point.
        Question: "${prompt}"
    `;

    try {
        // Set headers for Server-Sent Events (SSE)
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        const response = await axios.post(
            'https://api.deepseek.com/chat/completions',
            {
                model: 'deepseek-chat',
                messages: [
                    { "role": "user", "content": optimizedPrompt }
                ],
                stream: true, // This is the crucial parameter for enabling streaming
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
                },
                responseType: 'stream', // Tell axios to handle the response as a stream
            }
        );

        // Pipe the data from the DeepSeek API directly to our client
        response.data.on('data', (chunk) => {
            res.write(chunk);
        });

        response.data.on('end', () => {
            res.end(); // End the response when the stream is finished
        });

    } catch (error) {
        console.error('Error with DeepSeek API stream:', error.message);
        res.status(500).end(); // End the connection with an error status
    }
};

module.exports = { handleAskAI };