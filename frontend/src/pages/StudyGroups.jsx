import React, { useState } from 'react';

import Sidebar from '../components/dashboard/Sidebar';
import GroupList from '../components/studygroups/GroupList';
import ChatPane from '../components/studygroups/ChatPane';

// --- Mock Data for the Chat ---
const mockGroups = [
  {
    id: 1,
    name: 'DSA-Wizards',
    description: 'Discussing algorithms and data structures.',
    messages: [
      { id: 101, user: { name: 'Bob Johnson', avatar: 'B' }, text: 'Has anyone started on the graph problems yet?', timestamp: '10:30 AM' },
      { id: 102, user: { name: 'Charlie Davis', avatar: 'C' }, text: 'Yeah, I am stuck on the Dijkstra algorithm implementation.', timestamp: '10:32 AM' },
    ],
  },
  {
    id: 2,
    name: 'System-Design-Pros',
    description: 'All about scalable architecture.',
    messages: [
      { id: 201, user: { name: 'Diana Prince', avatar: 'D' }, text: 'Let\'s talk about database sharding strategies.', timestamp: '11:00 AM' },
    ],
  },
  {
    id: 3,
    name: 'React-Rangers',
    description: 'Hooks, components, and state management.',
    messages: [
      { id: 301, user: { name: 'Alex Turner', avatar: 'A' }, text: 'I am loving the new server components feature!', timestamp: '11:15 AM' },
      { id: 302, user: { name: 'Eva Green', avatar: 'E' }, text: 'Me too! It simplifies so much.', timestamp: '11:17 AM' },
    ],
  },
];
// --- End of Mock Data ---


const StudyGroups = () => {
  const [activeGroupId, setActiveGroupId] = useState(mockGroups[0].id);
  const activeGroup = mockGroups.find(g => g.id === activeGroupId);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="study-groups-layout">
        <GroupList 
          groups={mockGroups} 
          activeGroupId={activeGroupId} 
          setActiveGroupId={setActiveGroupId} 
        />
        <ChatPane group={activeGroup} />
      </div>
    </div>
  );
};

export default StudyGroups;