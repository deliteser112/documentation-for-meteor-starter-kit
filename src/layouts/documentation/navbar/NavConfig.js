// components
// import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

// const getIcon = (name) => <Iconify icon={name} width={20} height={20} />;

// const ICONS = {
//   document: getIcon('line-md:menu-unfold-right'),
// };

const navConfig = [
  // Introduction
  // ----------------------------------------------------------------------
  {
    subheader: 'Getting Started',
    items: [
      { title: 'Introductation', path: '/documentation/introduction' },
      { title: 'Cloning & Installation', path: '/documentation/clone-install' },
    ],
  },
  // Routing
  // ----------------------------------------------------------------------
  {
    subheader: 'Routing',
    items: [
      { title: 'Defining Routes', path: '/documentation/define-route' },
      { title: 'Guards', path: '/documentation/define-guards' }
    ],
  },
  // React
  // ----------------------------------------------------------------------
  {
    subheader: 'React',
    items: [
      { title: 'Organization', path: '/documentation/organization' },
      { title: 'React Material UI', path: '/documentation/react-material-ui' },
      { title: 'Defining Components', path: '/documentation/defining-components' },
      { title: 'Forms', path: '/documentation/forms' }
    ],
  },
  
  // GraphQL
  // ----------------------------------------------------------------------
  {
    subheader: 'GraphQL',
    items: [
      { title: 'Creating GraphQL Server', path: '/documentation/creating-graphql' },
      { title: 'Defining a Schema', path: '/documentation/defining-schema' },
      { title: 'Performing Queries & Mutations', path: '/documentation/performing-queries' },
      { title: 'GraphQL Playground', path: '/documentation/graphql-playground' },
    ],
  },
  // Styling
  // ----------------------------------------------------------------------
  {
    subheader: 'Styling',
    items: [
      { title: 'Styled Components', path: '/documentation/styled-components' },
      { title: 'Defining Theme', path: '/documentation/defining-theme' }
    ],
  },
  
  // Accounts
  // ----------------------------------------------------------------------
  {
    subheader: 'Accounts',
    items: [
      { title: 'SignUp', path: '/documentation/signup' },
      { title: 'Login', path: '/documentation/login' },
      { title: 'OAuth', path: '/documentation/oauth' },
      { title: 'On Create User', path: '/documentation/on-create-user' },
      { title: 'GDPR', path: '/documentation/gdpr' },
    ],
  },
  
  // Admin
  // ----------------------------------------------------------------------
  {
    subheader: 'Admin',
    items: [
      { title: 'Users', path: '/documentation/users' },
      { title: 'User Settings', path: '/documentation/user-settings' },
    ],
  },
];

export default navConfig;
// { title: 'Forms', path: '/documentation/introduction' },

