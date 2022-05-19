import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/documentation';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/documentation')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to="/documentation/introduction" replace />,
    },
    {
      path: '/documentation',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/documentation/introduction" replace />, index: true },
        { path: 'introduction', element: <Introduction /> },
        { path: 'clone-install', element: <CloneInstall /> },
        { path: 'define-route', element: <DefiningRoutes /> },
        { path: 'define-guards', element: <DefiningGuards /> },
        { path: 'organization', element: <Organization /> },
        { path: 'react-material-ui', element: <ReactMaterialUI /> },
        { path: 'defining-components', element: <DefiningComponents /> },
        { path: 'forms', element: <Forms /> },
        { path: 'creating-graphql', element: <CreatingGraphQL /> },
        { path: 'defining-schema', element: <DefiningSchema /> },
        { path: 'performing-queries', element: <PerformingQueries /> },
        { path: 'graphql-playground', element: <CloneInstall /> },
        { path: 'styled-components', element: <CloneInstall /> },
        { path: 'defining-theme', element: <CloneInstall /> },
        { path: 'signup', element: <CloneInstall /> },
        { path: 'login', element: <CloneInstall /> },
        { path: 'oauth', element: <CloneInstall /> },
        { path: 'on-create-user', element: <CloneInstall /> },
        { path: 'gdpr', element: <CloneInstall /> },
        { path: 'users', element: <CloneInstall /> },
        { path: 'user-setting', element: <CloneInstall /> }
      ],
    },
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// Dashboard
const Introduction = Loadable(lazy(() => import('../pages/1.Introduction')));
const CloneInstall = Loadable(lazy(() => import('../pages/2.CloneInstall')));
const DefiningRoutes = Loadable(lazy(() => import('../pages/3.DefiningRoutes')));
const DefiningGuards = Loadable(lazy(() => import('../pages/4.DefiningGuards')));
const Organization = Loadable(lazy(() => import('../pages/5.Organization')));
const ReactMaterialUI = Loadable(lazy(() => import('../pages/6.ReactMaterialUI')));
const DefiningComponents = Loadable(lazy(() => import('../pages/7.DefiningComponents')));
const Forms = Loadable(lazy(() => import('../pages/8.Forms')));
const CreatingGraphQL = Loadable(lazy(() => import('../pages/9.CreatingGraphQL')));
const DefiningSchema = Loadable(lazy(() => import('../pages/10.DefiningSchema')));
const PerformingQueries = Loadable(lazy(() => import('../pages/11.PerformingQueries')));

// page not found
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
