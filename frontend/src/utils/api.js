const API_BASE_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/v1` : 'http://localhost:5000/api/v1';

export const processBill = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/bills/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'SERVER_ERROR');
  }

  const result = await response.json();
  return result.data;
};

export const getBillHistory = async () => {
  const response = await fetch(`${API_BASE_URL}/bills/history`);
  if (!response.ok) {
    throw new Error('FAILED_TO_FETCH_HISTORY');
  }
  const result = await response.json();
  return result.data;
};

export const getJobStatus = async (jobId) => {
  const response = await fetch(`${API_BASE_URL}/bills/job/${jobId}`);
  if (!response.ok) {
    throw new Error('FAILED_TO_FETCH_JOB');
  }
  const result = await response.json();
  return result.data;
};

export const checkBackend = async () => {
  try {
    const healthUrl = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/health` : 'http://localhost:5000/health';
    const response = await fetch(healthUrl);
    return response.ok;
  } catch (error) {
    return false;
  }
};

export const getSSEUrl = (jobId) => `${API_BASE_URL}/bills/job/${jobId}/stream`;