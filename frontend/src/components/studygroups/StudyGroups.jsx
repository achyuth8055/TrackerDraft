import React, { useState, useEffect, useContext } from 'react';
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

  const authAxios = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/api/groups`, headers: { Authorization: `Bearer ${token}` } });

  useEffect(() => {
    const fetchMyGroups = async () => {
      if (!token) return;
      try {
        const res = await authAxios.get('/');
        setMyGroups(res.data.data);
        if (res.data.data.length > 0 && !activeGroupId) {
          setActiveGroupId(res.data.data[0]._id);
        }
      } catch (error) {
        console.error("Failed to fetch user's groups:", error);
      }
    };
    fetchMyGroups();
  }, [token, activeGroupId]);

  const handleGroupJoined = (newGroup) => {
    setMyGroups([...myGroups, newGroup]);
    setActiveGroupId(newGroup._id);
    setIsModalOpen(false);
  };

  const activeGroup = myGroups.find(g => g._id === activeGroupId);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="study-groups-layout">
        <GroupList groups={myGroups} activeGroupId={activeGroupId} setActiveGroupId={setActiveGroupId} onFindGroupsClick={() => setIsModalOpen(true)} />
        <ChatPane group={activeGroup} authAxios={authAxios} />
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <FindGroupsModal authAxios={authAxios} onGroupJoined={handleGroupJoined} onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudyGroups;
