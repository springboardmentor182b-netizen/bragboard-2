const mockShoutouts = [
  {
    id: 'S001',
    sender: 'Naveen',
    receiver: 'Raghu',
    message: 'Great work on the All designs.',
    category: 'Achievement',
    status: 'approved',
    date: '12-11-2025'
  },
  {
    id: 'S002',
    sender: 'Sai',
    receiver: 'Lokesh',
    message: 'Sai has been an incredible mentor to lokesh',
    category: 'Leadership',
    status: 'pending',
    date: '12-11-2025'
  },
  {
    id: 'S003',
    sender: 'Madhu',
    receiver: 'Sham',
    message: 'Madhu handled a difficult customers',
    category: 'Customer Service',
    status: 'rejected',
    date: '12-11-2025'
  },
  {
    id: 'S004',
    sender: 'John',
    receiver: 'Alice',
    message: 'Excellent team coordination on the project',
    category: 'Teamwork',
    status: 'approved',
    date: '12-10-2025'
  },
  {
    id: 'S005',
    sender: 'Emma',
    receiver: 'David',
    message: 'Great client presentation skills',
    category: 'Communication',
    status: 'pending',
    date: '12-10-2025'
  }
];

const API_BASE_URL = 'http://localhost:8000/api';

export const fetchShoutouts = async () => {
  try {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockShoutouts);
      }, 500);
    });
  } catch (error) {
    console.error('Error fetching shoutouts:', error);
    throw error;
  }
};


export const deleteShoutout = async (shoutoutId) => {
  try {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ 
          success: true, 
          message: 'Shoutout deleted successfully' 
        });
      }, 500);
    });
  } catch (error) {
    console.error('Error deleting shoutout:', error);
    throw error;
  }
};


export const updateShoutoutStatus = async (shoutoutId, status) => {
  try {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ 
          success: true, 
          message: `Shoutout ${shoutoutId} status updated to ${status}` 
        });
      }, 500);
    });
  } catch (error) {
    console.error('Error updating shoutout status:', error);
    throw error;
  }
};

export const getShoutoutStats = async () => {
  try {
    const shoutouts = await fetchShoutouts();
    const total = shoutouts.length;
    const approved = shoutouts.filter(s => s.status === 'approved').length;
    const pending = shoutouts.filter(s => s.status === 'pending').length;
    const rejected = shoutouts.filter(s => s.status === 'rejected').length;
    
    return { total, approved, pending, rejected };
  } catch (error) {
    console.error('Error getting shoutout stats:', error);
    throw error;
  }
};