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

const DeleteIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const TaskIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const TopicPane = ({ subject, onUpdateSubject, onAddNewTopic, onDeleteTopic, onAddSubtopic, onDeleteSubtopic, onAddToTasks }) => {
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
            if (topic._id === topicId) {
                const updatedSubtopics = topic.subtopics.map(subtopic =>
                    subtopic._id === subtopicId ? { ...subtopic, completed: !subtopic.completed } : subtopic
                );
                return { ...topic, subtopics: updatedSubtopics };
            }
            return topic;
        });
        onUpdateSubject(subject._id, { topics: updatedTopics });
    };

    const handleShowAddSubtopicForm = (topicId) => {
        setAddingToTopicId(topicId);
        setNewSubtopicText('');
    };

    const handleAddSubtopic = (e, topicId) => {
        e.preventDefault();
        if (newSubtopicText.trim() === '') return;
        onAddSubtopic(subject._id, topicId, newSubtopicText);
        setNewSubtopicText('');
        setAddingToTopicId(null);
    };

    const handleAddNewTopic = (e) => {
        e.preventDefault();
        if (newTopicTitle.trim() === '') return;
        onAddNewTopic(subject._id, newTopicTitle);
        setNewTopicTitle('');
        setIsAddingTopic(false);
    };

    const handleDeleteTopic = (topicId, topicName) => {
        if (window.confirm(`Are you sure you want to delete "${topicName}" and all its subtopics?`)) {
            onDeleteTopic(subject._id, topicId);
        }
    };

    const handleDeleteSubtopic = (topicId, subtopicId, subtopicName) => {
        if (window.confirm(`Are you sure you want to delete "${subtopicName}"?`)) {
            onDeleteSubtopic(subject._id, topicId, subtopicId);
        }
    };

    const handleAddTopicToTasks = (topicName) => {
        onAddToTasks(`Study: ${topicName}`);
    };

    const handleAddSubtopicToTasks = (subtopicName) => {
        onAddToTasks(`Study: ${subtopicName}`);
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
                        <div key={topic._id} className="topic-group">
                            <div className="topic-group-header">
                                <h4 className="topic-group-title">{topic.name}</h4>
                                <div className="topic-actions">
                                    <button 
                                        className="add-to-tasks-btn" 
                                        onClick={() => handleAddTopicToTasks(topic.name)}
                                        title="Add topic to daily tasks"
                                    >
                                        <TaskIcon />
                                    </button>
                                    <button className="add-subtopic-btn" onClick={() => handleShowAddSubtopicForm(topic._id)}>
                                        <AddIcon />
                                    </button>
                                    <button 
                                        className="delete-topic-btn" 
                                        onClick={() => handleDeleteTopic(topic._id, topic.name)}
                                        title="Delete topic"
                                    >
                                        <DeleteIcon />
                                    </button>
                                </div>
                            </div>
                            {addingToTopicId === topic._id && (
                                <form className="new-subtopic-form" onSubmit={(e) => handleAddSubtopic(e, topic._id)}>
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
                                    <li key={subtopic._id} className={`subtopic-item ${subtopic.completed ? 'completed' : ''}`}>
                                        <div className="subtopic-name-section" onClick={() => handleToggleSubtopic(topic._id, subtopic._id)}>
                                            <div className="subtopic-checkbox"></div>
                                            <AiIcon />
                                            <span>{subtopic.name}</span>
                                        </div>
                                        <div className="subtopic-actions">
                                            <button 
                                                className="add-to-tasks-btn" 
                                                onClick={() => handleAddSubtopicToTasks(subtopic.name)}
                                                title="Add subtopic to daily tasks"
                                            >
                                                <TaskIcon />
                                            </button>
                                            <button className="ai-assist-btn">
                                                <span>Ask AI Help</span>
                                            </button>
                                            <button 
                                                className="delete-subtopic-btn" 
                                                onClick={() => handleDeleteSubtopic(topic._id, subtopic._id, subtopic.name)}
                                                title="Delete subtopic"
                                            >
                                                <DeleteIcon />
                                            </button>
                                        </div>
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
