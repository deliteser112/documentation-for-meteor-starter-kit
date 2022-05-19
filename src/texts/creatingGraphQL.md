To aid in the process of setting up a GraphQL server and connecting it to your app. 

This package is designed to attach a GraphQL schema to an existing server instance and set up a WebSocket connection for subscriptions

~~~js

  import { ApolloServer } from 'apollo-server-express';
  import { WebApp } from 'meteor/webapp';
  import { getUser } from 'meteor/apollo';
  import schema from './api';

  // -----------------

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => ({
      user: await getUser(req.headers.authorization),
    }),
    uploads: false,
  });

  const app = WebApp.connectHandlers;

  async function startGraphQLServer() {
    await server.start();

    server.applyMiddleware({
      app,
      path: '/graphql',
      cors: true,
    });
  }

  await startGraphQLServer();

  app.use('/graphql', (req, res) => {
    if (req.method === 'GET') {
      res.end();
    }
  });


~~~
* Automatically pass your current user (if one exists) to all of your Query and Mutation resolvers in your GraphQL schema via the context argument (context.user).
* Run a GraphQL server on top of your existing Meteor web server (e.g., if your app runs at http://localhost:3000, the GraphQL server will attach at http://localhost:3000/graphql).
* Starts a GraphQL subscription server on http://localhost:4001 (e.g., it will run your subscription server at ws://localhost:4001/graphql).