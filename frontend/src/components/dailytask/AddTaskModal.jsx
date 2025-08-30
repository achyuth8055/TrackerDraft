import React, { useState } from 'react';

const AddTaskModal = ({ isOpen, onClose, onAddTask }) => {
    const [taskTitle, setTaskTitle] = useState('');

    if (!isOpen) {
        return null; // Don't render anything if the modal is not open
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskTitle.trim()) {
            onAddTask(taskTitle);
            setTaskTitle(''); // Reset input after adding
            onClose(); // Close the modal
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <header className="modal-header">
                    <h3>Add New Task</h3>
                    <button onClick={onClose} className="modal-close-btn">&times;</button>
                </header>
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="task-title">Task Title</label>
                        <input
                            id="task-title"
                            type="text"
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            placeholder="e.g., Finish project report"
                            autoFocus
                        />
                        <button type="submit" className="modal-add-btn">Add Task</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddTaskModal;