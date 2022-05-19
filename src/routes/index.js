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
        { path: 'styled-components', element: <CloneInstall /> },
        { path: 'defining-theme', element: <DefiningTheme /> },
        { path: 'signup', element: <SignUp /> },
        { path: 'login', element: <Login /> },
        { path: 'oauth', element: <OAuth /> },
        { path: 'on-create-user', element: <OnCreateUser /> },
        { path: 'gdpr', element: <GDPR /> },
        { path: 'users', element: <Users /> },
        { path: 'user-settings', element: <UserSettings /> },
        { path: 'eslint', element: <Users /> },
        { path: 'package-json', element: <Users /> },
        { path: 'settings-env-json', element: <Users /> },
        { path: 'gitignore', element: <Users /> }
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
const DefiningTheme = Loadable(lazy(() => import('../pages/12.DefiningTheme')));
const SignUp = Loadable(lazy(() => import('../pages/13.SignUp')));
const Login = Loadable(lazy(() => import('../pages/14.Login')));
const OAuth = Loadable(lazy(() => import('../pages/15.OAuth')));
const OnCreateUser = Loadable(lazy(() => import('../pages/16.OnCreateUser')));
const GDPR = Loadable(lazy(() => import('../pages/17.GDPR')));
const Users = Loadable(lazy(() => import('../pages/18.Users')));
const UserSettings = Loadable(lazy(() => import('../pages/19.UserSettings')));

// page not found
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
