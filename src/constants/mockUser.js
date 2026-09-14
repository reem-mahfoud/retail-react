/** Demo user — same shape as retail for dashboard + sidebar */
export const MOCK_USER = {
  id: 1,
  username: 'demo',
  email: 'demo@example.com',
  first_name: 'Demo',
  last_name: 'User',
  role_info: { name: 'store_owner' },
  role: 'store_owner',
  permission_actions: [
    'view_analytics',
    'view_visitor_analytics',
    'view_camera',
    'view_comparison_by_branch',
  ],
  is_superuser: false,
  company_id: 1,
  companies: [],
};
