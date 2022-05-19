In your application, routes define what will be rendered or displayed on screen when a user visits a certain URL. For example, if you visit <span class="badge">http://myapp.com/signup</span>, you're visiting the login route which renders the login page. In MST, routing is handled using a third-party package called React Router.

React Router is used in MST because all of its user interface components are written using React. As the name suggests, React Router is designed specifically for defining routes in applications where the user interface is built using React.

All of the routes in MST are defined in the application's main layout file at <span class="badge">/ui/routes/index.js</span> . This component is rendered on client-side startup in <span class="badge">/startup/client/index.js</span>.

~~~js
import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
import RoleBasedGuard from '../guards/RoleBasedGuard';

// layouts
import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';

// main pages
import HomePage from '../pages/external_pages/Home';
import ContactPage from '../pages/external_pages/Contact';

// others
import GeneralApp from '../pages/dashboard/GeneralApp';
import NotFound from '../pages/other/Page404';

// documents
import Documents from '../pages/dashboard/document';
import DocumentCreate from '../pages/dashboard/document/DocumentCreate';

// users
import User from '../pages/dashboard/user';
import UserProfile from '../pages/dashboard/user-profile';

// user settings
import UserSettings from '../pages/dashboard/userSettings';

import Profile from '../pages/profile';

// authentications
import Login from '../pages/authentication/Login';
import Register from '../pages/authentication/Register';
import ResetPassword from '../pages/authentication/ResetPassword';
import NewPassword from '../pages/authentication/NewPassword';
import VerifyEmail from '../pages/authentication/VerifyEmail';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { path: '/', element: <Navigate to="/dashboard/analytics" /> },
        { path: 'profile/:userId', element: <Profile /> },
        { path: 'analytics', element: <GeneralApp /> },

        // documents
        { path: 'documents', element: <Documents /> },
        { path: 'documents/create', element: <DocumentCreate /> },
        { path: 'documents/:documentId/edit', element: <DocumentCreate /> },

        // Admin/users
        {
          path: 'users',
          element: (
            <RoleBasedGuard>
              <User />
            </RoleBasedGuard>
          ),
        },
        {
          path: 'users/:userId/edit',
          element: (
            <RoleBasedGuard>
              <UserProfile />
            </RoleBasedGuard>
          ),
        },

        // Admin/user-settings
        {
          path: 'user-settings',
          element: (
            <RoleBasedGuard>
              <UserSettings />
            </RoleBasedGuard>
          ),
        },
      ],
    },
    {
      path: 'auth',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="login" /> },
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
      ],
    },
    { path: '/verify-email/:token', element: <VerifyEmail /> },
    { path: '/reset-password/:token', element: <NewPassword /> },

    // Main RoutesResetPassword
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { element: <HomePage />, index: true },
        { path: 'contact-us', element: <ContactPage /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
~~~

By default, MST ships with a few different routes:

<h6> Miscellaneous routes </h6>
Nondescript routes in MST. These are the routes that don't fit into a specific group/purpose.

* <span class="badge">/</span> Renders the <span class="badge"> < HomePage /></span> component or "home" page of your application.
* <span class="badge">/contact-us</span> Renders the <span class="badge">< ContactUs /></span> component for your application. This is where you can display the "ContactUs" for your application. Relies on the static pages pattern.
* <span class="badge">/dashboard/analytics</span> Renders the <span class="badge">< Analytics /></span> component for your application. This is where you can display the "Analytics" for your application. Relies on the static pages pattern.
* <span class="badge">*</span>no path) Renders the <span class="badge">< NotFound /></span> component for your application. This is displayed whenever a user attempts to access a URL that does not have a matching route defined (e.g., <span class="badge">http://localhost:3000/asdfasdf</span>).

~~~js
  {
    path: '*',
    element: <LogoOnlyLayout />,
    children: [
      { path: '404', element: <NotFound /> },
      { path: '*', element: <Navigate to="/404" replace /> },
    ],
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { element: <HomePage />, index: true },
      { path: 'contact-us', element: <ContactPage /> },
    ],
  },
~~~
<h6> Accounts-related routes </h6>
These routes make up the accounts workflows in MST. Together, these routes allow users to create and manage their accounts.

* <span class="badge">/signup</span> Renders the <span class="badge">< Signup /></span> component for your application. This is where users can create a new account.
* <span class="badge">/login</span> Renders the <span class="badge">< Login /></span> component for your application. This is where existing users can login to their account.
* <span class="badge">/profile</span> Renders the <span class="badge">< Profile /></span> component for your application. This is where logged-in users can change their first name, last name, email address, and password for their account.
* <span class="badge">/recover-password</span> Renders the <span class="badge">< RecoverPassword /></span> component for your application. This is where users can request a password reset if they've forgotten their password.
* <span class="badge">/reset-password/:token</span> Renders the <span class="badge">< ResetPassword /></span> component for your application. This is where users can reset their password, using a unique token that's emailed to them when they request the reset.
* <span class="badge">/logout</span> Renders the <span class="badge">< Logout /></span> component for your application. This is displayed after a user logs out and is useful for promoting your product on social media or new features you've just released.

~~~js
  {
    path: 'auth',
    element: <LogoOnlyLayout />,
    children: [
      { path: '/', element: <Navigate to="login" /> },
      {
        path: 'login',
        element: (
          <GuestGuard>
            <Login />
          </GuestGuard>
        ),
      },
      {
        path: 'register',
        element: (
          <GuestGuard>
            <Register />
          </GuestGuard>
        ),
      },
      { path: 'login-unprotected', element: <Login /> },
      { path: 'register-unprotected', element: <Register /> },
      { path: 'reset-password', element: <ResetPassword /> },
    ],
  },
  { path: '/verify-email/:token', element: <VerifyEmail /> },
  { path: '/reset-password/:token', element: <NewPassword /> },
~~~
<h6> Example Routes </h6>

The following routes are added to MST to showcase creating a "CRUD" (create, read, update, delete) feature in your application. Feel free to use these as a template for your own features.

* <span class="badge">/documents</span> Renders the <span class="badge">< Documents /></span> component for your application. For logged-in users, displays that user's list of documents that they've created.
* <span class="badge">/documents/:documentId</span> Renders the <span class="badge">< ViewDocument /></span> component for your application. For logged-in users, displays a single document corresponding to the :_id parameter in the route. :_id refers to the literal _id value of the document in the Documents collection.
* <span class="badge">/documents/:documentId/edit</span> Renders the <span class="badge">< EditDocument /></span> component for your application. For logged-in users, displays a form for making changes to an * existing document, corresponding to the :_id parameter in the route. :_id refers to the literal _id value of the document in the Documents collection.

~~~js
  // documents
  { path: 'documents', element: <Documents /> },
  { path: 'documents/create', element: <DocumentCreate /> },
  { path: 'documents/:documentId/edit', element: <DocumentCreate /> },
~~~

<h6> Authenticated, Authorized, and Guest Routes </h6>

You may have noticed that in the list of routes above, a few different components are in use for rendering routes:  <span class="badge">useRoutes</span>, <span class="badge">< AuthGuard /></span>, <span class="badge">< RoleBasedGuard /></span>, and <span class="badge">< GuestGuard /></span>. The first,  <span class="badge">useRoutes</span>, is a component imported directly from the react-router-dom package. This simply creates a route in the application at the URL specified in the path prop and renders the component specified in the component prop.

The other three components, <span class="badge">< AuthGuard /></span>, <span class="badge">< RoleBasedGuard /></span>, and <span class="badge">< GuestGuard /></span>, are MST-specific components used to create special types of routes that render the specified component prop depending on the user's authentication (logged-in/logged-out) status.

We can learn more detail about guards in next chapter.