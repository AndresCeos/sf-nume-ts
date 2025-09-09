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
import SynastryPinnaclePage from '@/pages/sinastry/SynastryPinnaclePage';

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
      { path: '/personal/life_path', element: <LifePathPage /> },
      { path: '/personal/name', element: <NamePage /> },
      { path: '/personal/create-name', element: <CreateNamePage /> },
      { path: '/personal/destiny_table', element: <DestinyTablePage /> },
      { path: '/personal/time_vibration', element: <VibrationTimePage /> },
      { path: '/personal/annual_returns', element: <AnnualReturnsPage /> },
      { path: '/personal/time_circle', element: <TimeCirclePage /> },
      { path: '/personal/annual_calendar', element: <AnnualCalendar /> },
      { path: '/personal/monthly_calendar', element: <MonthCalendarPage /> },
      // Sinastry Pages
      { path: '/partner/synastry_pinnacle', element: <SynastryPinnaclePage /> },
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
