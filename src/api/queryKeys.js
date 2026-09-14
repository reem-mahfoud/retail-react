export const queryKeys = {
  auditoriums: {
    all: ['auditoriums'],
    list: ({
      buildingId = null,
      search = '',
      isActive = null,
      page = 1,
      pageSize = 10,
    } = {}) => ['auditoriums', { buildingId, search, isActive, page, pageSize }],
  },
  buildings: {
    all: ['buildings'],
    list: ({
      universityId = null,
      search = '',
      isActive = null,
      page = 1,
      pageSize = 10,
    } = {}) => ['buildings', { universityId, search, isActive, page, pageSize }],
  },
  locations: {
    all: ['locations'],
    list: ({
      search = '',
      isActive = null,
      page = 1,
      pageSize = 10,
    } = {}) => ['locations', { search, isActive, page, pageSize }],
  },
  universities: {
    all: ['universities'],
    list: ({
      search = '',
      isActive = null,
      page = 1,
      pageSize = 10,
    } = {}) => ['universities', { search, isActive, page, pageSize }],
  },
  users: {
    all: ['users'],
    list: ({
      page = 1,
      pageSize = 10,
      scope = 'all',
      search = '',
      branchId = null,
      departmentId = null,
      profileType = null,
    } = {}) => [
      'users',
      { page, pageSize, scope, search, branchId, departmentId, profileType },
    ],
  },
  cameras: {
    all: ['cameras'],
    list: ({
      search = '',
      isActive = null,
      branchId = null,
      page = 1,
      pageSize = 10,
    } = {}) => ['cameras', { search, isActive, branchId, page, pageSize }],
  },
  roles: {
    all: ['roles'],
    list: ({ search = '', page = 1, pageSize = 10 } = {}) => [
      'roles',
      { search, page, pageSize },
    ],
  },
  smartCameras: {
    all: ['smart-cameras'],
    list: ({
      auditoriumId = null,
      search = '',
      page = 1,
      pageSize = 10,
    } = {}) => ['smart-cameras', { auditoriumId, search, page, pageSize }],
  },
  analytics: {
    attendanceDynamics: (userType, range, params) => [
      'analytics',
      'attendance-dynamics',
      userType,
      range,
      params,
    ],
    dashboardSummary: (params = {}) => ['analytics', 'dashboard-summary', params],
  },
};
