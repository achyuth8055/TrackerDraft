import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

const CreateGroupForm = ({ onGroupCreated, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isPublic: true,
    maxMembers: 50,
    tags: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { token } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return;

    setIsLoading(true);
    setError('');

    try {
      const tagsArray = formData.tags
        ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        : [];

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/groups`,
        {
          ...formData,
          tags: tagsArray,
          maxMembers: parseInt(formData.maxMembers)
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        onGroupCreated(response.data.data);
        setFormData({
          name: '',
          description: '',
          isPublic: true,
          maxMembers: 50,
          tags: ''
        });
      }
    } catch (error) {
      console.error('Error creating group:', error);
      setError(error.response?.data?.error || 'Failed to create group');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes slideIn {
            0% { transform: translateY(-20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          
          @keyframes buttonPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
        `}
      </style>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(10px)',
      }}>
        <div style={{
          width: '90%',
          maxWidth: '500px',
          background: 'linear-gradient(135deg, rgba(22, 27, 34, 0.95), rgba(13, 17, 23, 0.9))',
          borderRadius: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
          animation: 'slideIn 0.3s ease-out',
          backdropFilter: 'blur(20px)',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
          }}>
            <h2 style={{
              margin: 0,
              fontSize: '1.75rem',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #00BFFF, #FF69B4)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}>
              Create Study Group
            </h2>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: '#8B949E',
                fontSize: '1.5rem',
                cursor: 'pointer',
                padding: '0.5rem',
                borderRadius: '50%',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#FF69B4';
                e.target.style.background = 'rgba(255, 105, 180, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#8B949E';
                e.target.style.background = 'none';
              }}
            >
              ×
            </button>
          </div>

          {error && (
            <div style={{
              background: 'rgba(255, 105, 180, 0.1)',
              border: '1px solid #FF69B4',
              color: '#FF69B4',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              marginBottom: '1.5rem',
              fontSize: '0.9rem',
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#C9D1D9',
                fontSize: '0.9rem',
              }}>
                Group Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                maxLength={50}
                placeholder="Enter group name..."
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: 'rgba(13, 17, 23, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '0.5rem',
                  color: '#C9D1D9',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#00BFFF';
                  e.target.style.boxShadow = '0 0 0 3px rgba(0, 191, 255, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#C9D1D9',
                fontSize: '0.9rem',
              }}>
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                maxLength={200}
                rows={3}
                placeholder="Describe your group's purpose..."
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: 'rgba(13, 17, 23, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '0.5rem',
                  color: '#C9D1D9',
                  fontSize: '1rem',
                  resize: 'vertical',
                  transition: 'all 0.3s ease',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#00BFFF';
                  e.target.style.boxShadow = '0 0 0 3px rgba(0, 191, 255, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                  color: '#C9D1D9',
                  fontSize: '0.9rem',
                }}>
                  Max Members
                </label>
                <input
                  type="number"
                  name="maxMembers"
                  value={formData.maxMembers}
                  onChange={handleChange}
                  min={2}
                  max={100}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(13, 17, 23, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '0.5rem',
                    color: '#C9D1D9',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                  }}
                />
              </div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#C9D1D9',
                  cursor: 'pointer',
                  padding: '0.75rem 0',
                }}>
                  <input
                    type="checkbox"
                    name="isPublic"
                    checked={formData.isPublic}
                    onChange={handleChange}
                    style={{
                      width: '16px',
                      height: '16px',
                      accentColor: '#00BFFF',
                    }}
                  />
                  <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                    Public Group
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#C9D1D9',
                fontSize: '0.9rem',
              }}>
                Tags (comma-separated)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="e.g. programming, javascript, react"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: 'rgba(13, 17, 23, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '0.5rem',
                  color: '#C9D1D9',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#00BFFF';
                  e.target.style.boxShadow = '0 0 0 3px rgba(0, 191, 255, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '1rem',
            }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: '0.75rem 1.5rem',
                  background: 'rgba(139, 148, 158, 0.1)',
                  border: '1px solid rgba(139, 148, 158, 0.3)',
                  borderRadius: '0.5rem',
                  color: '#8B949E',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(139, 148, 158, 0.2)';
                  e.target.style.color = '#C9D1D9';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(139, 148, 158, 0.1)';
                  e.target.style.color = '#8B949E';
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || !formData.name.trim() || !formData.description.trim()}
                style={{
                  flex: 2,
                  padding: '0.75rem 1.5rem',
                  background: isLoading 
                    ? 'rgba(0, 191, 255, 0.5)' 
                    : 'linear-gradient(135deg, #00BFFF, #8A2BE2)',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: '700',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  opacity: isLoading || !formData.name.trim() || !formData.description.trim() ? 0.7 : 1,
                  animation: isLoading ? 'buttonPulse 1s ease-in-out infinite' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isLoading && formData.name.trim() && formData.description.trim()) {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 10px 20px rgba(0, 191, 255, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0px)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                {isLoading ? '🚀 Creating...' : '✨ Create Group'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateGroupForm;
