import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import AuthContext from '../context/AuthContext';
import Sidebar from '../components/dashboard/Sidebar';
import GroupList from '../components/studygroups/GroupList';
import ChatPane from '../components/studygroups/ChatPane';
import FindGroupsModal from '../components/studygroups/FindGroupsModal';

const StudyGroups = () => {
  const [myGroups, setMyGroups] = useState([]);
  const [activeGroupId, setActiveGroupId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = useContext(AuthContext);

  // Create a reusable axios instance with the auth token
  const authAxios = axios.create({
    baseURL: 'http://localhost:5001/api/groups',
    headers: { Authorization: `Bearer ${token}` },
  });

  const fetchMyGroups = useCallback(async () => {
    if (!token) return;
    try {
      const res = await authAxios.get('/');
      const groups = res.data.data;
      setMyGroups(groups);

      // Set active group to "GrowTogether" or the first group by default
      if (groups.length > 0 && !activeGroupId) {
        const defaultGroup = groups.find(g => g.name === 'GrowTogether') || groups[0];
        setActiveGroupId(defaultGroup._id);
      }
    } catch (error) {
      console.error("Failed to fetch user's groups:", error);
    }
  }, [token, activeGroupId]); // Dependency on activeGroupId ensures we can refetch if needed

  useEffect(() => {
    fetchMyGroups();
  }, [fetchMyGroups]);

  const handleGroupJoined = (newGroup) => {
    // Add the new group to the list and make it active
    setMyGroups(prevGroups => [...prevGroups, newGroup]);
    setActiveGroupId(newGroup._id);
    setIsModalOpen(false);
  };

  const activeGroup = myGroups.find(g => g._id === activeGroupId);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="study-groups-layout">
        <GroupList
          groups={myGroups}
          activeGroupId={activeGroupId}
          setActiveGroupId={setActiveGroupId}
          onFindGroupsClick={() => setIsModalOpen(true)}
        />
        <ChatPane
          key={activeGroupId} // Add key to force re-render on group change
          group={activeGroup}
          authAxios={authAxios}
        />
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <FindGroupsModal
            authAxios={authAxios}
            onGroupJoined={handleGroupJoined}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudyGroups;