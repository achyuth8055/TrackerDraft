import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

// --- SVG Icons ---
const CloseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const FindGroupsModal = ({ authAxios, onGroupJoined, onClose }) => {
    const [discoverableGroups, setDiscoverableGroups] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [newGroupName, setNewGroupName] = useState('');
    const [newGroupDesc, setNewGroupDesc] = useState('');

    useEffect(() => {
        const fetchDiscoverableGroups = async () => {
            try {
                const res = await authAxios.get('/find');
                setDiscoverableGroups(res.data.data);
            } catch (error) {
                console.error("Failed to find groups:", error);
            }
        };
        fetchDiscoverableGroups();
    }, [authAxios]);

    const handleJoinGroup = async (groupId) => {
        try {
            const res = await authAxios.post(`/${groupId}/join`);
            onGroupJoined(res.data.data);
        } catch (error) {
            console.error("Failed to join group:", error);
        }
    };
    
    const handleCreateGroup = async (e) => {
        e.preventDefault();
        if (newGroupName.trim() === '' || newGroupDesc.trim() === '') return;
        try {
            const res = await authAxios.post('/', { name: newGroupName, description: newGroupDesc });
            onGroupJoined(res.data.data);
            setNewGroupName('');
            setNewGroupDesc('');
        } catch (error) {
            console.error("Failed to create group:", error);
        }
    };

    const filteredGroups = useMemo(() => 
        discoverableGroups.filter(group => 
            group.name.toLowerCase().includes(searchTerm.toLowerCase())
        ), [discoverableGroups, searchTerm]
    );

    return (
        <motion.div className="modal-backdrop" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal-content find-groups-modal" onClick={(e) => e.stopPropagation()} initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}>
                <div className="modal-header">
                    <h3 className="modal-title">Find or Create a Group</h3>
                    <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
                        <CloseIcon />
                    </button>
                </div>
                <div className="modal-section">
                    <input 
                        type="text" 
                        placeholder="Search for existing groups..." 
                        className="modal-search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <ul className="discover-groups-list">
                        {filteredGroups.length > 0 ? filteredGroups.map(group => (
                            <li key={group._id}>
                                <div className="group-info">
                                    <span className="group-name">{group.name}</span>
                                    <span className="group-desc">{group.description}</span>
                                </div>
                                <button className="join-group-btn" onClick={() => handleJoinGroup(group._id)}>Join</button>
                            </li>
                        )) : (
                            <p className="modal-empty-text">No groups match your search. Why not create one?</p>
                        )}
                    </ul>
                </div>
                <div className="modal-divider"></div>
                <h3 className="modal-title create-title" style={{ margin: '20px' }}>Create a New Group</h3>
                 <div className="modal-divider" ></div>
                <div className="modal-section">
                
                    <form onSubmit={handleCreateGroup} className="create-group-form">
                        <input type="text" placeholder="Group Name" value={newGroupName} onChange={(e) => setNewGroupName(e.target.value)} required />
                        <input type="text" placeholder="A short description" value={newGroupDesc} onChange={(e) => setNewGroupDesc(e.target.value)} required />
                        <button type="submit">Create & Join Group</button>
                    </form>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default FindGroupsModal;