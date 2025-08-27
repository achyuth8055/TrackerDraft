// frontend/src/components/AIAssistant.jsx

// ... imports
import AuthContext from '../context/AuthContext';
import { useContext } from 'react'; // Make sure useContext is imported
import axios from 'axios'; // Make sure axios is imported

const AIAssistant = () => {
    // ... other state
    const { token } = useContext(AuthContext); // Get the auth token

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (prompt.trim() === '') return;
        
        setIsLoading(true);
        setResponse('');

        try {
            const res = await axios.post(
                'http://localhost:5001/api/ai/ask',
                { prompt }, // The data we are sending
                { // The configuration with the auth header
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

    // ... rest of the component
};

export default AIAssistant;