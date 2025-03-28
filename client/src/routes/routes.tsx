import React from 'react';
import { RouteObject } from 'react-router-dom';
import ProtectedLayout from '../layouts/ProtectedLayout';

// صفحات ماژول مشاوره هوشمند
import AdvisorsListPage from '../modules/advisor/pages/AdvisorsListPage';
import AdvisorPage from '../modules/advisor/pages/AdvisorPage';
import SessionsPage from '../modules/advisor/pages/SessionsPage';
import SessionDetailPage from '../modules/advisor/pages/SessionDetailPage';

const routes: RouteObject[] = [
  // مسیرهای مشاوره هوشمند
  {
    path: '/advisors',
    element: <ProtectedLayout />,
    children: [
      { index: true, element: <AdvisorsListPage /> },
      { path: ':advisorId', element: <AdvisorPage /> },
      { path: 'sessions', element: <SessionsPage /> },
      { path: 'sessions/:sessionId', element: <SessionDetailPage /> },
    ],
  },
];

export default routes; 