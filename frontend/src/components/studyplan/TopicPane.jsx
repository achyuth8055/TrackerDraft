import React, { useState, useMemo } from 'react';

// --- Custom SVG Icon Components (no changes here) ---
const AiIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="subtopic-ai-icon">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const AddIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


const TopicPane = ({ subject, onUpdateSubject, onAddNewTopic }) => {
    const [addingToTopicId, setAddingToTopicId] = useState(null);
    const [newSubtopicText, setNewSubtopicText] = useState('');
    const [newTopicTitle, setNewTopicTitle] = useState(''); // State for new topic title
    const [isAddingTopic, setIsAddingTopic] = useState(false); // State to show/hide the new topic form

    const progress = useMemo(() => {
        if (!subject || !subject.topics) return 0;
        const totalSubtopics = subject.topics.reduce((acc, topic) => acc + topic.subtopics.length, 0);
        if (totalSubtopics === 0) return 0;
        const completedSubtopics = subject.topics.reduce((acc, topic) =>
            acc + topic.subtopics.filter(st => st.completed).length, 0);
        return Math.round((completedSubtopics / totalSubtopics) * 100);
    }, [subject]);

    const handleToggleSubtopic = (topicId, subtopicId) => {
        const updatedTopics = subject.topics.map(topic => {
            if (topic.id === topicId) {
                const updatedSubtopics = topic.subtopics.map(subtopic =>
                    subtopic.id === subtopicId ? { ...subtopic, completed: !subtopic.completed } : subtopic
                );
                return { ...topic, subtopics: updatedSubtopics };
            }
            return topic;
        });
        onUpdateSubject(subject.id, { topics: updatedTopics });
    };

    const handleShowAddSubtopicForm = (topicId) => {
        setAddingToTopicId(topicId);
        setNewSubtopicText('');
    };

    const handleAddSubtopic = (e, topicId) => {
        e.preventDefault();
        if (newSubtopicText.trim() === '') return;
        const updatedTopics = subject.topics.map(topic => {
            if (topic.id === topicId) {
                const newSubtopic = { id: Date.now(), name: newSubtopicText, completed: false };
                return { ...topic, subtopics: [...topic.subtopics, newSubtopic] };
            }
            return topic;
        });
        onUpdateSubject(subject.id, { topics: updatedTopics });
        setNewSubtopicText('');
        setAddingToTopicId(null);
    };

    const handleAddNewTopic = (e) => {
        e.preventDefault();
        if (newTopicTitle.trim() === '') return;
        onAddNewTopic(subject.id, newTopicTitle);
        setNewTopicTitle('');
        setIsAddingTopic(false);
    };

    if (!subject) {
        return <div className="topic-pane-empty">Select a subject to see its topics</div>;
    }

    return (
        <div className="topic-pane">
            <div className="topic-pane-header">
                <div>
                    <h2 className="topic-pane-title">{subject.name}</h2>
                    <div className="overall-progress-widget">
                        <span>Overall Progress</span>
                        <div className="progress-bar-background">
                            <div
                                className="progress-bar-foreground"
                                style={{ width: `${progress}%`, background: subject.gradient }}
                            ></div>
                        </div>
                        <span>{progress}%</span>
                    </div>
                </div>
                <button className="add-topic-title-btn" onClick={() => setIsAddingTopic(true)}>
                    <AddIcon /> Add Topic
                </button>
            </div>

            {isAddingTopic && (
                <form className="new-topic-title-form" onSubmit={handleAddNewTopic}>
                    <input
                        type="text"
                        placeholder="New topic title (e.g., Basics, Advanced)"
                        value={newTopicTitle}
                        onChange={(e) => setNewTopicTitle(e.target.value)}
                        autoFocus
                    />
                    <button type="submit">Save Topic</button>
                    <button type="button" onClick={() => setIsAddingTopic(false)}>Cancel</button>
                </form>
            )}

            <div className="topics-container">
                {subject.topics.length === 0 && !isAddingTopic ? (
                    <div className="topic-pane-empty-state">
                        <div className="empty-state-icon">📚</div>
                        <h3>No Topics Yet</h3>
                        <p>Click the "Add Topic" button to create your first topic group.</p>
                    </div>
                ) : (
                    subject.topics.map(topic => (
                        <div key={topic.id} className="topic-group">
                            <div className="topic-group-header">
                                <h4 className="topic-group-title">{topic.name}</h4>
                                <button className="add-subtopic-btn" onClick={() => handleShowAddSubtopicForm(topic.id)}>
                                    <AddIcon />
                                </button>
                            </div>
                            {addingToTopicId === topic.id && (
                                <form className="new-subtopic-form" onSubmit={(e) => handleAddSubtopic(e, topic.id)}>
                                    <input
                                        type="text"
                                        className="new-subtopic-input"
                                        placeholder="Enter new subtopic..."
                                        value={newSubtopicText}
                                        onChange={(e) => setNewSubtopicText(e.target.value)}
                                        autoFocus
                                    />
                                    <button type="submit">Add</button>
                                </form>
                            )}
                            <ul className="subtopic-list">
                                {topic.subtopics.map(subtopic => (
                                    <li key={subtopic.id} className={`subtopic-item ${subtopic.completed ? 'completed' : ''}`}>
                                        <div className="subtopic-name-section" onClick={() => handleToggleSubtopic(topic.id, subtopic.id)}>
                                            <div className="subtopic-checkbox"></div>
                                            <AiIcon />
                                            <span>{subtopic.name}</span>
                                        </div>
                                        <button className="ai-assist-btn">
                                            <span>Ask AI Help</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TopicPane;