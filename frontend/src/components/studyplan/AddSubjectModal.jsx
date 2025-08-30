import React, { useState, useEffect } from 'react';

const AddSubjectModal = ({ isOpen, onClose, onAddSubject }) => {
    const [subjectName, setSubjectName] = useState('');
    const [deadline, setDeadline] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [error, setError] = useState(''); // State for displaying an error message

    // Reset the form's state every time the modal opens
    useEffect(() => {
        if (isOpen) {
            setSubjectName('');
            setDeadline(null);
            setCurrentMonth(new Date());
            setError(''); // Clear previous errors
        }
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate that both fields are filled
        if (subjectName.trim() && deadline) {
            // If valid, call the function passed from the parent page
            onAddSubject({ name: subjectName, deadline });
            onClose(); // Close the modal on success
        } else {
            // If not valid, set an error message to display to the user
            setError("Please provide a subject name and select a deadline.");
        }
    };
    
    const handlePrevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    const handleNextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    
    const generateCalendarDays = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        const days = [];
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`pad-${i}`} className="calendar-day empty"></div>);
        }
        
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const isSelected = deadline && date.toDateString() === deadline.toDateString();
            days.push(
                <button 
                    type="button"
                    key={day} 
                    className={`calendar-day ${isSelected ? 'selected' : ''}`}
                    onClick={() => setDeadline(date)}
                >
                    {day}
                </button>
            );
        }
        return days;
    };

    const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content add-subject-modal" onClick={e => e.stopPropagation()}>
                <header className="modal-header">
                    <h3>Add New Subject</h3>
                    <button onClick={onClose} className="modal-close-btn">&times;</button>
                </header>
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="subject-name">Subject Name</label>
                            <input
                                id="subject-name"
                                type="text"
                                value={subjectName}
                                onChange={(e) => setSubjectName(e.target.value)}
                                placeholder="e.g., Quantum Physics"
                                autoFocus
                            />
                        </div>
                        <div className="form-group">
                             <label>Set a Deadline</label>
                             <div className="calendar">
                                <div className="calendar-header">
                                    <button type="button" onClick={handlePrevMonth} className="calendar-nav-btn">&lt;</button>
                                    <span>{monthName}</span>
                                    <button type="button" onClick={handleNextMonth} className="calendar-nav-btn">&gt;</button>
                                </div>
                                <div className="calendar-day-names">
                                    <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                                </div>
                                <div className="calendar-grid">
                                    {generateCalendarDays()}
                                </div>
                             </div>
                        </div>
                        {/* Display the error message if it exists */}
                        {error && <p className="modal-error-text">{error}</p>}
                        <button type="submit" className="modal-add-btn">Add Subject</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddSubjectModal;

