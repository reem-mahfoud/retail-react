import { Routes, Route } from 'react-router-dom';
import RequireAuth from 'components/auth/RequireAuth';
import CradleDashboardShell from 'components/dashboard/CradleDashboardShell';
import CradleLiveRoute from 'components/dashboard/CradleLiveRoute';
import OrganizationsDashboardMain from 'components/dashboard/organizations-dashboard/OrganizationsDashboardMain';
import BranchesDashboardMain from 'components/dashboard/branches-dashboard/BranchesDashboardMain';
import BuildingsDashboardMain from 'components/dashboard/buildings-dashboard/BuildingsDashboardMain';
import UniversityBuildingsMain from 'components/dashboard/university-buildings/UniversityBuildingsMain';
import UniversityRoomsMain from 'components/dashboard/university-rooms/UniversityRoomsMain';
import RoomsDashboardMain from 'components/dashboard/rooms-dashboard/RoomsDashboardMain';
import EdgeDevicesDashboardMain from 'components/dashboard/edge-devices/EdgeDevicesDashboardMain';
import EdgeDeviceDetailRoute from 'components/dashboard/edge-devices/EdgeDeviceDetailRoute';
import AddEdgeDeviceMain from 'components/dashboard/edge-devices/AddEdgeDeviceMain';
import DeviceUpdateDashboardMain from 'components/dashboard/device-update/DeviceUpdateDashboardMain';
import CamerasRoute from 'components/dashboard/cameras/CamerasRoute';
import UsersDashboardMain from 'components/dashboard/users-dashboard/UsersDashboardMain';
import AddUserMain from 'components/dashboard/users-dashboard/AddUserMain';
import NotFoundPage from 'pages/error/NotFoundPage';
import {
  LoginRoute,
  DashboardIndexRoute,
  RoleManagementRoute,
  ResetPasswordRoute,
  ResetPasswordVerifyRoute,
  ResetPasswordNewPasswordRoute,
  RootRedirect,
} from './guards';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginRoute />} />
      <Route path="/reset-password" element={<ResetPasswordRoute />} />
      <Route path="/reset-password/confirm" element={<ResetPasswordVerifyRoute />} />
      <Route
        path="/reset-password/new-password"
        element={<ResetPasswordNewPasswordRoute />}
      />

      <Route element={<RequireAuth />}>
        <Route path="/dashboard" element={<CradleDashboardShell />}>
          <Route index element={<DashboardIndexRoute />} />
          <Route path="live" element={<CradleLiveRoute />} />
          <Route path="organizations" element={<OrganizationsDashboardMain />} />
          <Route path="organizations/branches" element={<BranchesDashboardMain />} />
          <Route
            path="organizations/branches/buildings"
            element={<BuildingsDashboardMain />}
          />
          <Route
            path="organizations/:orgId/buildings"
            element={<UniversityBuildingsMain />}
          />
          <Route
            path="organizations/:orgId/buildings/:buildingId/rooms"
            element={<UniversityRoomsMain />}
          />
          <Route
            path="organizations/branches/buildings/rooms"
            element={<RoomsDashboardMain />}
          />
          <Route path="edge-devices" element={<EdgeDevicesDashboardMain />} />
          <Route path="edge-devices/add" element={<AddEdgeDeviceMain />} />
          <Route path="edge-devices/:deviceId" element={<EdgeDeviceDetailRoute />} />
          <Route path="device-update" element={<DeviceUpdateDashboardMain />} />
          <Route path="cameras" element={<CamerasRoute />} />
          <Route path="users/roles" element={<RoleManagementRoute />} />
          <Route path="users/add" element={<AddUserMain />} />
          <Route path="users" element={<UsersDashboardMain />} />
        </Route>
      </Route>

      <Route path="/" element={<RootRedirect />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
