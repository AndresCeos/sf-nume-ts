import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import MainLayout from '@/components/Layout/MainLayout';
import Spinner from '@/components/Spinner';
import StatusBar from '@/components/StatusBar';
import ConsultProvider from '@/context/ConsultProvider';
import ConsultantPage from '@/pages/dashboard/ConsultantPage';
import HomePage from '@/pages/dashboard/HomePage';
import SettingsPage from '@/pages/dashboard/SettingsPage';
import GroupAnnualCalendar from '@/pages/group/GroupAnnualCalendar';
import GroupAnnualReturnsPage from '@/pages/group/GroupAnnualReturnsPage';
import GroupMonthCalendarPage from '@/pages/group/GroupMonthCalendar';
import GroupPinnaclePage from '@/pages/group/GroupPinnaclePage';
import GroupTimeCirclePage from '@/pages/group/GroupTimeCirclePage';
import AnnualCalendar from '@/pages/personal/AnnualCalendar';
import AnnualReturnsPage from '@/pages/personal/AnnualReturnsPage';
import CreateNamePage from '@/pages/personal/CreateNamePage';
import DestinyTablePage from '@/pages/personal/DestinyTablePage';
import LifePathPage from '@/pages/personal/LifePathPage';
import MonthCalendarPage from '@/pages/personal/MonthCalendarPage';
import NamePage from '@/pages/personal/NamePage';
import PinnaclePage from '@/pages/personal/PinnaclePage';
import TimeCirclePage from '@/pages/personal/TimeCirclePage';
import VibrationTimePage from '@/pages/personal/VibrationTimePage';

import SinastryAnnualReturnsPage from '@/pages/sinastry/SinastryAnnualReturnsPage';
import SinastryDestinyTablePage from '@/pages/sinastry/SinastryDestinyTablePage';
import SynastryAnnualCalendar from '@/pages/sinastry/SynastryAnnualCalendar';
import SynastryCompatibilityTablePage from '@/pages/sinastry/SynastryCompatibilityTablePage';
import SynastryMonthCalendarPage from '@/pages/sinastry/SynastryMonthCalendar';
import SynastryPinnaclePage from '@/pages/sinastry/SynastryPinnaclePage';
import SynastryTimeCirclePage from '@/pages/sinastry/SynastryTimeCirclePage';

function App() {
  return (
    <ConsultProvider>
      <MainLayout>
        <Suspense
          fallback={(
            <div className="h-full w-full flex items-center justify-center">
              <Spinner size="xl" />
            </div>
          )}
        >
          <StatusBar />
          <Outlet />
        </Suspense>
      </MainLayout>
    </ConsultProvider>
  );
}

const protectedRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/personal/pinnacle', element: <PinnaclePage /> },
      { path: '/personal/life-path', element: <LifePathPage /> },
      { path: '/personal/name', element: <NamePage /> },
      { path: '/personal/create-name', element: <CreateNamePage /> },
      { path: '/personal/destiny-table', element: <DestinyTablePage /> },
      { path: '/personal/time-vibration', element: <VibrationTimePage /> },
      { path: '/personal/annual-returns', element: <AnnualReturnsPage /> },
      { path: '/personal/time-circle', element: <TimeCirclePage /> },
      { path: '/personal/annual-calendar', element: <AnnualCalendar /> },
      { path: '/personal/monthly-calendar', element: <MonthCalendarPage /> },
      // Sinastry Pages
      { path: '/partner/pinnacle', element: <SynastryPinnaclePage /> },
      { path: '/partner/annual-returns', element: <SinastryAnnualReturnsPage /> },
      { path: '/partner/destiny-table', element: <SinastryDestinyTablePage /> },
      { path: '/partner/compatibility-table', element: <SynastryCompatibilityTablePage /> },
      { path: '/partner/time-circle', element: <SynastryTimeCirclePage /> },
      { path: '/partner/monthly-calendar', element: <SynastryMonthCalendarPage /> },
      { path: '/partner/annual-calendar', element: <SynastryAnnualCalendar /> },
      // Group Pages
      { path: '/group/pinnacle', element: <GroupPinnaclePage /> },
      { path: '/group/annual-returns', element: <GroupAnnualReturnsPage /> },
      { path: '/group/time-circle', element: <GroupTimeCirclePage /> },
      { path: '/group/annual-calendar', element: <GroupAnnualCalendar /> },
      { path: '/group/monthly-calendar', element: <GroupMonthCalendarPage /> },
      // Dashboard Pages
      { path: '/consultant', element: <ConsultantPage /> },
      { path: '/config', element: <SettingsPage /> },
      // Home Page
      { path: '/', element: <HomePage /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];

export default protectedRoutes;
