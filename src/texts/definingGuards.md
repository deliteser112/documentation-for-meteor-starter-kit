<h6> Authenticated Routes </h6>
As the name implies, routes created using the <span class="badge">< AuthGuard /></span>(ui/guards/AuthGuard.js) component are only intended to be accessed by authenticated or logged-in users. To handle the authentication of a user, the component takes in two special props loggingIn and authenticated which are passed to the component via MST's <span class="badge">< App /></span> (ui/App.js) component.

~~~js
  import React, { useState } from 'react';
  import { Navigate, useLocation } from 'react-router-dom';
  import PropTypes from 'prop-types';

  // pages
  import Login from '../pages/authentication/Login';

  // hooks
  import useAuth from '../hooks/useAuth';

  // ----------------------------------------------------------------------

  export default function AuthGuard({ children }) {
    const { isAuthenticated } = useAuth();
    const { pathname } = useLocation();
    const [requestedLocation, setRequestedLocation] = useState(null);

    if (!isAuthenticated) {
      if (pathname !== requestedLocation) {
        setRequestedLocation(pathname);
      }
      return <Login />;
    }

    if (requestedLocation && pathname !== requestedLocation) {
      setRequestedLocation(null);
      return <Navigate to={requestedLocation} />;
    }

    return <>{children}</>;
  }

  AuthGuard.propTypes = {
    children: PropTypes.node,
  };
~~~

MST has used React Context for authentication. [Here is explaination](https://reactjs.org/docs/context.html) .
The <span class="badge">< App /></span> component is wrapped by AuthContext which get the value of <span class="badge">"Meteor.userId"</span> in localStorage, and authenticated as a combination of checking if Meteor is logging in and if a user exists <span class="badge">!handler.ready() || !isUser</span>.

~~~js
    if (accessToken) {
      dispatch({
        type: 'INITIALIZE',
        payload: {
          isAuthenticated: true,
          user,
        },
      });
    } else {
      dispatch({
        type: 'INITIALIZE',
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }

    ...

  <AuthContext.Provider
    value={{
      ...state,
      method: 'jwt',
    }}
  >
    {children}
  </AuthContext.Provider>
~~~


And also, MST is tracking user status using GraphQL subscription.

~~~js
const { isLoading, user } = useTracker(() => {
  const handler = Meteor.subscribe('app');

  let user = {};

  const userInfo = Meteor.user();

  const isUser = userInfo && userInfo.profile && userInfo.profile.name;

  if (!handler.ready() || !isUser) {
    return { isLoading: true };
  }

  if (isUser) user = userInfo;

  return { isLoading: false, user };
});
~~~

If we do not have a user and we're not logging in, we consider this user to be "unauthenticated" and redirect them away from the page they're accessing. By default this redirect is to the <span class="badge">/login</span> route in the application but can be customized to any page you'd like.

Notice that what we're returning from our <span class="badge">< AuthGuard /></span> component is just the <span class="badge">< Router /></span> component from the react-router-dom package. What's ultimately happening here is that the <span class="badge">< Router /></span> component is returned and then rendered within our routes list, at which point React Router takes over.


<h6> Authorized Routes </h6>

As the name implies, routes created using the <span class="badge">< RoleBasedGuard/></span> component are only intended to be accessed by authorized or users in a specific role (like admin). To handle the authorization of a user, the component takes in a special prop allowedRoles which expects an array of roles to be passed (e.g., ['admin', 'manager']) specifying the roles the current user must have in order to access that route.

~~~js
const [isAdmin, setAdmin] = useState(true);
  useEffect(() => {
    if (user) {
      if (Roles.userIsInRole(user._id, 'admin')) setAdmin(true);
      else setAdmin(false);
    }
  }, [user]);

  if (!isAdmin) {
    return (
      <Container>
        <Alert severity="error">
          <AlertTitle>Permission Denied</AlertTitle>
          You do not have permission to access this page. Make sure you are an admin.
        </Alert>
      </Container>
    );
  }

  return <>{children}</>;
~~~

<h6> Guest Routes </h6>

The <span class="badge">< GuestGuard /></span> component is designed as a wrapper component around pages that are intended for the public only. By wrapping a component in the <span class="badge">< GuestGuard></span> component, the intent is to redirect an authenticated or logged-in user away from this page (e.g., a logged in user has no purpose accessing the /signup page). If we look at the code for the <span class="badge">< GuestGuard /></span> component, it follows the exact same pattern as the <span class="badge">< AuthGuard /></span> component described above, however, running its authentication check in reverse.

~~~js
const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to={PATH_DASHBOARD.root} />;
  }

  return <>{children}</>;
~~~