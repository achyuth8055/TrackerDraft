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
        const res = await authAxios.get('/');
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


  // --- THIS IS THE UPDATED FUNCTION ---
  // It now correctly handles the object with `name` and `deadline`.
  const handleAddNewSubject = async (subjectData) => {
    try {
      // Create the payload with both name and the formatted deadline
      const payload = {
        name: subjectData.name,
        deadline: subjectData.deadline.toISOString()
      };

      // Make the API call with the new payload
      const res = await authAxios.post('/', payload);
      const newSubject = res.data.data;
      
      setSubjects(prevSubjects => [...prevSubjects, newSubject]);
      setActiveSubjectId(newSubject._id); // Select the new subject
    } catch (error) {
      console.error("Error adding new subject:", error.response?.data || error.message);
    }
  };

  const handleDeleteSubject = async (subjectId) => {
    try {
      await authAxios.delete(`/${subjectId}`);
      const updatedSubjects = subjects.filter(subject => subject._id !== subjectId);
      setSubjects(updatedSubjects);
      // If the deleted subject was active, select the first remaining subject
      if (activeSubjectId === subjectId) {
        setActiveSubjectId(updatedSubjects.length > 0 ? updatedSubjects[0]._id : null);
      }
    } catch (error) {
      console.error("Error deleting subject:", error);
    }
  };

  // --- All other handler functions remain unchanged ---
  const handleAddNewTopic = async (subjectId, topicName) => {
    try {
      const res = await authAxios.post(`/${subjectId}/topics`, { name: topicName });
      setSubjects(subjects.map(subject => subject._id === subjectId ? res.data.data : subject));
    } catch (error) {
      console.error("Error adding new topic:", error);
    }
  };

  const handleDeleteTopic = async (subjectId, topicId) => {
    try {
      const res = await authAxios.delete(`/${subjectId}/topics/${topicId}`);
      setSubjects(subjects.map(subject => subject._id === subjectId ? res.data.data : subject));
    } catch (error) {
      console.error("Error deleting topic:", error);
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

  const handleDeleteSubtopic = async (subjectId, topicId, subtopicId) => {
    try {
      const res = await authAxios.delete(`/${subjectId}/topics/${topicId}/subtopics/${subtopicId}`);
      setSubjects(subjects.map(subject => subject._id === subjectId ? res.data.data : subject));
    } catch (error) {
      console.error("Error deleting subtopic:", error);
    }
  };
  
  const handleAddToTasks = async (taskText) => {
    try {
        const taskAxios = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/api/tasks`,
            headers: { Authorization: `Bearer ${token}` }
        });
        await taskAxios.post('/', { text: taskText });
        alert('Successfully added to daily tasks!');
    } catch (error) {
        console.error("Error adding to tasks:", error);
        alert('Failed to add to daily tasks. Please try again.');
    }
  };

  const handleUpdateSubject = async (subjectId, updatedData) => {
    try {
        const originalSubject = subjects.find(s => s._id === subjectId);
        if(!originalSubject) return;

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
          onDeleteSubject={handleDeleteSubject}
        />
        <TopicPane 
          subject={activeSubject}
          onUpdateSubject={handleUpdateSubject}
          onAddNewTopic={handleAddNewTopic}
          onDeleteTopic={handleDeleteTopic}
          onAddSubtopic={handleAddSubtopic}
          onDeleteSubtopic={handleDeleteSubtopic}
          onAddToTasks={handleAddToTasks}
        />
      </div>
    </div>
  );
};

export default StudyPlan;

