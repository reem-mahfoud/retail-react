import { formatAnalyticsPeriodLabel } from 'lib/analyticsRange';
import { apiColorToVariant } from 'lib/rolePermissions';
import { nameAvatarUrl } from 'lib/nameAvatarUrl';

export function mapBranchFromApi(location) {
  return {
    id: String(location.id),
    addressLabel: String(
      location.address || location.name || `Location #${location.id}`,
    ),
    entityCount: 0,
    quotaUsed: 0,
    quotaTotal: 0,
    active: location.is_active ?? true,
    logoUrl: null,
  };
}

export function mapRoomFromApi(auditorium) {
  return {
    id: String(auditorium.id),
    name: String(
      auditorium.name || auditorium.code || `Room #${auditorium.id}`,
    ),
    quotaUsed: Number(auditorium.active_camera_count ?? 0),
    quotaTotal: Number(auditorium.camera_count ?? 0),
    active: true,
    buildingId:
      auditorium.building_id != null ? String(auditorium.building_id) : null,
  };
}

export function mapBuildingFromApi(building) {
  return {
    id: String(building.id),
    name: String(building.name || `Building #${building.id}`),
    entityCount: Number(building.person_count ?? 0),
    quotaUsed: Number(building.active_camera_count ?? 0),
    quotaTotal: Number(building.camera_count ?? 0),
    active: true,
    universityId:
      building.university_id != null ? String(building.university_id) : null,
    logoUrl: null,
  };
}

export function mapUniversityFromApi(uni) {
  return {
    id: String(uni.id),
    name: String(uni.name || `University #${uni.id}`),
    entityCount: Number(uni.building_count ?? 0),
    quotaUsed: Number(uni.active_camera_count ?? 0),
    quotaTotal: Number(uni.camera_count ?? 0),
    active: true,
    region: 'south',
    category: 'services',
    ...(uni.logo ? { logoUrl: String(uni.logo) } : {}),
  };
}

function mapRolesFromProfileType(profileType) {
  const type = String(profileType || '').toUpperCase();

  if (type === 'ADMIN') return [{ key: 'admin', label: 'Admin' }];
  if (type === 'STUDENT') return [{ key: 'student', label: 'Student' }];
  if (type === 'EMPLOYEE') return [{ key: 'teacher', label: 'Teacher' }];
  return [{ key: 'user', label: 'User' }];
}

function formatLastSession(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function mapUserFromApi(user) {
  const student = user.student;
  const employee = user.employee;
  const profileType = String(user.profile_type || 'USER');

  let name = String(user.username || '');
  if (profileType === 'ADMIN') {
    name = String(user.username || name);
  } else if (student && typeof student === 'object') {
    name = String(student.short_name || student.full_name || name);
  } else if (employee && typeof employee === 'object') {
    name = String(employee.short_name || employee.full_name || name);
  }

  const avatar =
    (student && typeof student === 'object' && student.image) ||
    (employee && typeof employee === 'object' && employee.image) ||
    nameAvatarUrl(user.username || name);

  return {
    id: String(user.id),
    name,
    handle: String(user.username || ''),
    avatar: String(avatar),
    roles: mapRolesFromProfileType(profileType),
    profileType:
      profileType.charAt(0) + profileType.slice(1).toLowerCase(),
    phone:
      (employee && typeof employee === 'object' && String(employee.phone || '')) ||
      '—',
    lastSession: formatLastSession(user.last_login),
    lastLogin: user.last_login ?? null,
    apiProfileType: profileType,
    isActive: Boolean(user.is_active),
  };
}

export function mapCameraFromApi(camera, { enableRoi = false } = {}) {
  const auditorium = Array.isArray(camera.auditoriums)
    ? camera.auditoriums[0]
    : null;
  const building =
    auditorium && typeof auditorium === 'object' ? auditorium.building : null;
  const university =
    building && typeof building === 'object' ? building.university : null;

  const row = {
    id: String(camera.id),
    name: String(camera.name || `Camera #${camera.id}`),
    university:
      (university && typeof university === 'object' && university.name) || '—',
    building:
      (building && typeof building === 'object' && building.name) || '—',
    room:
      (auditorium && typeof auditorium === 'object' &&
        (auditorium.name || auditorium.code)) ||
      '—',
    edgeDevice: String(camera.ip_address || camera.hls_url || '—'),
    status: camera.is_active ? 'active' : 'inactive',
    isNew: false,
    ipCameras: String(camera.ip_address || ''),
    userName: String(camera.username || ''),
    password: String(camera.password || ''),
    rtspUrl: String(camera.rtsp_ddns_url || ''),
    streamUrl: String(camera.hls_url || ''),
  };

  if (enableRoi) {
    row.roiEnabled = true;
  }

  return row;
}

export function mapAnalyticsLocationFromApi(location, smartCamera = null) {
  const auditorium =
    smartCamera && typeof smartCamera.auditorium === 'object'
      ? smartCamera.auditorium
      : null;
  const building =
    auditorium && typeof auditorium.building === 'object' ? auditorium.building : null;
  const university =
    building && typeof building.university === 'object' ? building.university : null;

  return {
    id: String(location.id),
    locationLabel: String(location.name || '—'),
    branchLabel: String(location.address || location.description || '—'),
    orgLabel: (university && university.name) || '—',
    deviceLabel: String(
      (smartCamera && (smartCamera.device_name || smartCamera.name)) || '—',
    ),
    raw: location,
  };
}

export function mapSmartCameraToDeviceCard(camera, summary = null) {
  const auditorium =
    camera.auditorium && typeof camera.auditorium === 'object' ? camera.auditorium : null;
  const building =
    auditorium && typeof auditorium.building === 'object' ? auditorium.building : null;
  const university =
    building && typeof building.university === 'object' ? building.university : null;
  const cameras = summary?.cameras;

  return {
    id: String(camera.id),
    name: String(camera.device_name || camera.name || `Device #${camera.id}`),
    activeCount: Number(cameras?.active ?? 0),
    totalCount: Number(cameras?.total ?? 0),
    chips: [
      String(camera.device_ip || camera.device_id || '—'),
      (university && university.name) || 'Organization',
      (building && building.name) || 'Branch',
      (auditorium && auditorium.name) || 'Building',
      (auditorium && auditorium.code) || 'Room',
    ],
  };
}

function attendanceRate(row) {
  const expected = Number(row.expected) || 0;
  const present = Number(row.present) || 0;
  if (!expected) return 0;
  return Math.min(100, Math.round((present / expected) * 100));
}

export function mapAttendanceDynamicsToTemperatureChart(results, range) {
  const items = Array.isArray(results) ? results : [];
  if (!items.length) return null;

  return {
    categories: items.map((row) => formatAnalyticsPeriodLabel(String(row.period || ''), range)),
    temperatureLine: items.map(attendanceRate),
    peakBars: items.map((row) => Number(row.absent) || 0),
  };
}

export function mapAttendanceAndCamerasToFailuresChart(
  attendanceResults,
  cameraStatus,
  range,
) {
  const items = Array.isArray(attendanceResults) ? attendanceResults : [];
  const inactiveCameras = Math.max(
    (Number(cameraStatus?.total) || 0) - (Number(cameraStatus?.active) || 0),
    0,
  );

  if (!items.length) return null;

  return {
    categories: items.map((row) => formatAnalyticsPeriodLabel(String(row.period || ''), range)),
    bars: items.map((row) => (Number(row.absent) || 0) + inactiveCameras),
    trend: items.map(attendanceRate),
  };
}

export function mapRoleFromApi(role) {
  const permissions = Array.isArray(role.permissions) ? role.permissions : [];

  return {
    id: String(role.id),
    name: String(role.name || `Role #${role.id}`),
    created: '—',
    modified: '—',
    variant: apiColorToVariant(role.color),
    permissionIds: permissions.map((p) => Number(p.id)).filter((id) => !Number.isNaN(id)),
  };
}
