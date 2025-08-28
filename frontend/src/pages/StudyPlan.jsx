import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

import Sidebar from '../components/dashboard/Sidebar';
import SubjectList from '../components/studyplan/SubjectList';
import TopicPane from '../components/studyplan/TopicPane';

const StudyPlan = () => {
  const [subjects, setSubjects] = useState([]);
  const [activeSubjectId, setActiveSubjectId] = useState(null);
  const { token } = useContext(AuthContext);

  // --- Create a secure Axios instance ---
  const authAxios = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api/studyplan`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // --- Fetch all subjects on component load ---
  useEffect(() => {
    const getSubjects = async () => {
      if (!token) {
        console.log("No token available for fetching subjects");
        return;
      }
      try {
        console.log("Fetching subjects with token:", token.substring(0, 20) + "...");
        const res = await authAxios.get('/');
        console.log("Subjects fetched successfully:", res.data);
        const subjects = res.data.data || [];
        setSubjects(subjects);
        // Set the first subject as active if it exists
        if (subjects.length > 0) {
          setActiveSubjectId(subjects[0]._id);
        }
      } catch (error) {
        console.error("Error fetching subjects:", error.response?.data || error.message);
        setSubjects([]); // Set empty array on error
      }
    };
    getSubjects();
  }, [token]);


  // --- Handler Functions for API Calls ---

  const handleAddNewSubject = async (subjectName) => {
    try {
      const res = await authAxios.post('/', { name: subjectName });
      const newSubject = res.data.data;
      setSubjects([...subjects, newSubject]);
      setActiveSubjectId(newSubject._id); // Select the new subject
    } catch (error) {
      console.error("Error adding new subject:", error);
    }
  };

  const handleAddNewTopic = async (subjectId, topicName) => {
    try {
      const res = await authAxios.post(`/${subjectId}/topics`, { name: topicName });
      setSubjects(subjects.map(subject => subject._id === subjectId ? res.data.data : subject));
    } catch (error) {
      console.error("Error adding new topic:", error);
    }
  };

  const handleAddSubtopic = async (subjectId, topicId, subtopicName) => {
    try {
      const res = await authAxios.post(`/${subjectId}/topics/${topicId}/subtopics`, { name: subtopicName });
      setSubjects(subjects.map(subject => subject._id === subjectId ? res.data.data : subject));
    } catch (error) {
      console.error("Error adding subtopic:", error);
    }
  };

  const handleUpdateSubject = async (subjectId, updatedData) => {
    // This function is now more generic, but we'll use it for subtopic toggling
    // A more complex app might have a dedicated subtopic update function
    try {
        // Find the specific change to send to the backend
        const originalSubject = subjects.find(s => s._id === subjectId);
        let changedSubtopic;
        let changedTopicId;

        for (const topic of updatedData.topics) {
            const originalTopic = originalSubject.topics.find(t => t._id === topic._id);
            if (originalTopic) {
                for (const subtopic of topic.subtopics) {
                    const originalSubtopic = originalTopic.subtopics.find(st => st._id === subtopic._id);
                    if (originalSubtopic && originalSubtopic.completed !== subtopic.completed) {
                        changedSubtopic = subtopic;
                        changedTopicId = topic._id;
                        break;
                    }
                }
            }
            if(changedSubtopic) break;
        }

        if (changedSubtopic) {
            const res = await authAxios.put(`/${subjectId}/topics/${changedTopicId}/subtopics/${changedSubtopic._id}`, {
                completed: changedSubtopic.completed
            });
            setSubjects(subjects.map(subject => subject._id === subjectId ? res.data.data : subject));
        }
    } catch (error) {
        console.error("Error updating subtopic:", error);
    }
  };


  const activeSubject = subjects.find(s => s._id === activeSubjectId);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="study-plan-layout">
        <SubjectList 
          subjects={subjects} 
          activeSubjectId={activeSubjectId}
          setActiveSubjectId={setActiveSubjectId}
          onAddNewSubject={handleAddNewSubject}
        />
        <TopicPane 
          subject={activeSubject}
          onUpdateSubject={handleUpdateSubject}
          onAddNewTopic={handleAddNewTopic}
          onAddSubtopic={handleAddSubtopic}
        />
      </div>
    </div>
  );
};

export default StudyPlan;
