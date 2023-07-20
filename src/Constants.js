// Constants.js

// API URLs
export const API_BASE_URL = 'http://20.151.210.84:8080';
export const API_LEASES_PATH = `/api/leases`;
export const API_USERS_PATH = '/api/accounts';
export const API_EVENTS_PATH = '/api/events';
export const API_UNITS_PATH = '/api/units';
export const API_LOGIN_PATH = `${API_BASE_URL}/api/accounts/login`;
export const API_NOTIFICATIONS_CREATE = `${API_BASE_URL}/api/notifications/create`;

// API Endpoints
export const API_LEASES_ALL = `${API_BASE_URL}${API_LEASES_PATH}/all`;
export const API_LEASES_CREATE = `${API_BASE_URL}${API_LEASES_PATH}/create`;
export const API_LEASES_UPDATE = (leaseId) => `${API_BASE_URL}${API_LEASES_PATH}/${leaseId}`;
export const API_LEASES_DELETE = (leaseId) => `${API_BASE_URL}${API_LEASES_PATH}/${leaseId}`;

export const API_USERS_ALL = `${API_BASE_URL}${API_USERS_PATH}/all`;
export const API_USERS_CREATE = `${API_BASE_URL}${API_USERS_PATH}/create`;
export const API_USERS_UPDATE = (userId) => `${API_BASE_URL}${API_USERS_PATH}/${userId}`;
export const API_USERS_DELETE = (userId) => `${API_BASE_URL}${API_USERS_PATH}/${userId}`;

//apis for events
export const API_EVENTS_ALL = `${API_BASE_URL}${API_EVENTS_PATH}`;
export const API_EVENTS_CREATE = `${API_BASE_URL}${API_EVENTS_PATH}/create`;
export const API_EVENTS_UPDATE = (eventId) => `${API_BASE_URL}${API_EVENTS_PATH}/${eventId}`;
export const API_EVENTS_DELETE = `${API_BASE_URL}${API_EVENTS_PATH}/delete`;

//apis for units
export const API_UNITS_ALL = `${API_BASE_URL}${API_UNITS_PATH}/all`;
export const API_UNITS_CREATE = `${API_BASE_URL}${API_UNITS_PATH}/create`;
export const API_UNITS_UPDATE = (unitId) => `${API_BASE_URL}/api/units/${unitId}`;
export const API_UNITS_DELETE = (unitId) => `${API_BASE_URL}/api/units/${unitId}`;


// Other Constants
export const MAX_RESULTS_PER_PAGE = 10;
export const DEFAULT_PAGE_NUMBER = 1;
export const DEFAULT_SORT_FIELD = 'createdAt';
export const DEFAULT_SORT_ORDER = 'desc';

// Additional Variables
export const MY_VARIABLE = 'some value';
