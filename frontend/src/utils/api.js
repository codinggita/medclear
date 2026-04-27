const getBaseUrl = () => {
  let envUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  if (envUrl.endsWith('/')) envUrl = envUrl.slice(0, -1);
  return envUrl.endsWith('/api/v1') ? envUrl : `${envUrl}/api/v1`;
};

const API_BASE_URL = getBaseUrl();
export { API_BASE_URL };

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
    let baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    if (baseUrl.endsWith('/api/v1')) baseUrl = baseUrl.replace('/api/v1', '');
    if (baseUrl.endsWith('/')) baseUrl = baseUrl.slice(0, -1);
    
    const healthUrl = `${baseUrl}/health`;
    const response = await fetch(healthUrl);
    return response.ok;
  } catch (error) {
    return false;
  }
};

export const getSSEUrl = (jobId) => `${API_BASE_URL}/bills/job/${jobId}/stream`;