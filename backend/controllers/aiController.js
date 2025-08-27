const axios = require('axios');
require('dotenv').config();

const handleAskAI = async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ success: false, error: 'Prompt is required.' });
    }

    // This is a token-optimized prompt for short, direct explanations.
    const optimizedPrompt = `
        You are an expert tutor AI. A student has asked the following question. 
        Provide a concise, direct explanation suitable for a study guide. 
        Do not use conversational fluff. Get straight to the point.
        Question: "${prompt}"
    `;

    try {
        const response = await axios.post(
            'https://api.deepseek.com/chat/completions',
            {
                model: 'deepseek-chat',
                messages: [
                    { "role": "system", "content": "You are a helpful assistant." },
                    { "role": "user", "content": optimizedPrompt }
                ],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
                },
            }
        );

        const aiResponse = response.data.choices[0].message.content;
        res.status(200).json({ success: true, response: aiResponse });

    } catch (error) {
        console.error('Error with DeepSeek API:', error.response ? error.response.data : error.message);
        res.status(500).json({ success: false, error: 'Failed to get response from AI.' });
    }
};

module.exports = { handleAskAI };