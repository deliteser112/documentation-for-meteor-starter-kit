When we talk about implementing GraphQL in our application, there are three core parts involved:

* A server that receives requests.
* A GraphQL schema that's attached to the server.
* A client-side mechanism for communicating with a GraphQL schema, via a server.

In MST, all three of these are provided for you, ready to use out-of-the-box. In order to start customizing MST for your application, it's important to understand what "schema" refers to in GraphQL as that is where you will define what data is available in your application and how to access it.

In GraphQL, your schema is used to define:

* All of the available Types of data in your application.
* All of the Queries that can be performed in your application.
* All of the Mutations that can be performed in your application.

In addition to these core conventions, your GraphQL schema can also be used to define "helper" types of data like Fragments and Enums.

~~~js

  import gql from 'graphql-tag';

  const schema = {
    typeDefs: gql`
      type Document {
        _id: String
        title: String
        body: String
      }

      type Query {
        document(_id: String!): Document
      }

      type Mutation {
        insertDocument(title: String, body: String): Document
      }

      type Subscription {
        documentUpdated: Document
      }
    `,
    resolvers: {
      Query: {
        document: (parent, args) => {
          // Assuming args equals an object like { _id: '123' };
          return Documents.findOne(args);
        },
      },
      Mutation: {
        insertDocument: (parent, args) => {
          // Assuming args equals an object like { title: 'My document title', body: 'My document body.' };
          const documentId = Documents.insert(args);
          return { _id: documentId };
        },
      },
      Subscription: {
        documentUpdated: (root, args, context) => context.pubsub.asyncIterator('documentUpdated'), 
      },
    },
  };

~~~

***

<h6>How data flows in GraphQL</h6>

Your schema is best thought of as the "registration" mechanism that defines all of the possible ways to consume data in your application. When a request is made to your GraphQL server, it's passed to your schema and then your schema decides how to respond or resolve that request.

When we think about the traditional CRUD (create, read, update, delete) pattern for an application, your queries handle the "R" or "read" part and your mutations handle the "CUD" or "create, update, delete" part.

When a query request is made from the client of our application, it's done so by specifying a query field which maps to a resolver. A resolver is a function that—like the name implies—resolves the request (i.e., it returns the requested data).

Whenever a resolver function—query or mutation—returns some data, it's passed or filtered through a Type before being returned to the client/request.

<img src="/assets/graphql-query-flow.png" style="object-fit: contain" />

Types are used to define and enforce the "shape" of the data returned by your queries and mutations. For example, if we have an object like this in a collection called Documents in our database:

~~~js
  {
    _id: '123', 
    title: 'My document.',
    body: 'Just an example, friend.',
  }
~~~

we'd define a corresponding Type that looks like this:

~~~js
  {
    type Document {
      _id: String
      title: String
      body: String
    }
  }
~~~

So that's clear, here's an example GraphQL query that would be performed on the client:

~~~js
  {
    document(_id: "123") {
      _id
      title
    }
  }
~~~

Here, our query is asking for a document with the <span class="badge">_id</span> <span class="badge">123</span> and specifies that when that document is returned, it should only include the <span class="badge">_id</span> and <span class="badge">title</span> fields. This is unique to GraphQL, even though our <span class="badge">Document</span> type defines three possible fields that can be returned, from the client, we can request only the specific fields we need for our UI.

Mapping this query to our schema, the flow would be:

* Schema sees a query for the document field defined under the type Query block (expecting it to return some data matching a required _id argument as a String that itself matches the Document type).
* Schema locates the matching resolver function with the same name under the resolvers.Query object and calls the corresponding function.
* Resolver returns some data.
* Data is passed through the type for validation/filtering.
* Data is returned to client.

***

<h6>Types</h6>
Types are the essential building block of your schema. Types define the shape of the data that's coming in and out of your schema. Though the <span class="badge">type</span> keyword is most common, there are several other types of...types like <span class="badge">input</span> and <span class="badge">enum</span>.

~~~js
  type Document {
    _id: String
    isPublic: Boolean
    title: String
    createdAt: String
    updatedAt: String
    body: String
    owner: String
    comments: [Comment]
  }
~~~

In your schema, there are three "root" types <span class="badge">type Query</span>, <span class="badge">type Mutation</span>, and <span class="badge">type Subscription</span> along with your custom types. These three root types can be seen in the example above and are responsible for defining the query, mutation, and subscription fields that can be accessed from the client along with their expected return values.


The idea here is that when you define a field (e.g., documents: [Document]), you're telling GraphQL "I want users to be able to type in a query that looks like this and call to a resolver function with the same name:"

~~~js
  {
    documents {
      _id
      title
    }
  }
~~~

That resolver function, then, is defined in the resolvers.Query object on your schema.

<h6>Defining Types</h6>

An example of a basic type is displayed on the right. This represents the Document type in MST. Types are simple. They define the fields that a piece of data can have and the scalar types those fields are expected to contain.

~~~js

  input UserInput {
    _id: String,
    email: String,
    password: String,
    profile: ProfileInput,
    roles: [String],
    settings: [UserSettingInput] # From /api/UserSettings/types.js
  }

~~~

<h6>Additional Types</h6>

As suggested above, there are a few other data types supported by GraphQL:

* <span class="badge">inputs</span> define the shape of input data or arguments passed to queries and mutations. Instead of specifying argument fields individually when defining a query or mutation, you can pass them as an object, defining its type as an input.
* <span class="badge">enums</span> are pre-defined lists of values that are allowed by a given field on a type.

***

<h6>Queries</h6>

In order to successfully perform a query with GraphQL, there are three things that need to be added to your schema:

* A type for the data being returned needs to be added to the typeDefs object.
* A field needs to be defined on the root Query type.
* A resolver function needs to be defined on the <span class="badge">resolvers.Query</span> object.

We covered types above, but need to discuss defining a field on the root Query type along with a resolver function. On the right, we can see the schema from MST displayed, simplified to show the code for querying a list of documents.

~~~js
  import gql from 'graphql-tag';
  import Documents from '../../api/Documents/Documents';

  const schema = {
    typeDefs: gql`
      type Document {
        _id: String
        isPublic: Boolean
        title: String
        createdAt: String
        updatedAt: String
        body: String
        owner: String
      }

      type Query {
        documents: [Document]
      }
    `,
    resolvers: {
      Query: {
        documents: (parent, args, context) =>
          context.user && context.user._id ? Documents.find({ owner: context.user._id }).fetch() : [],
      }
    },
  };

  export default schema;
~~~

<blockquote>
  <h6>MST uses imports to keep things tidy</h6>

  The example here is purposefully simplified to remove imports so that you can see how things wire together. Keep in mind that in MST, parts of the schema like types and resolvers are stored in their own files and imported into <span class="badge">/startup/server/api.js</span>.
</blockquote>

Here, we've defined all three parts outlined above. Pay close attention to the structure and where things are being placed.

The important thing to note here is the connection between the documents nested inside of type Query and the documents nested inside of resolvers.Query. The former defines that field as something we can query against and the resolver function is how we resolve that query.

Though it may seem like we're doing work twice here, one part is typing our query and one part is actually handling it. It is a bit more work than some data systems, but it gives us 100% clarity over what is and isn't happening.

In the resolvers.Query part, the function passed to documents—again, known as a resolver function—takes in three arguments:

* <span class="badge">parent</span> the parent query, if one exists.
* <span class="badge">args</span> any arguments passed to the query.
* <span class="badge">context</span> a miscellaneous context object. In MST, this contains a <span class="badge">context.user</span> property containing the logged in user if one exists.

Here, in response to our documents resolver function, we're saying "if there's a user with an _id, find all of the documents owned by that user and <span class="badge">.fetch()</span> them as an array. If there's not a user, return an empty array."

It's important to note that "the GraphQL part" stops once we're inside of our function. At that point, we can run whatever code we'd like to resolve the query—that's up to us. Here, we're using the Documents collection that's built-in to MST and uses Meteor's MongoDB implementation.

Just the same, we could make an API call to a third-party service here and GraphQL could care less. It's only concern is that the data returned matches the type specified for the field on the type Query. In this case, an array of objects resembling the Document type.

***

<h6>Mutations</h6>

As we mentioned earlier, mutations are the CUD or "create, update, delete" part of GraphQL. While there's technically no limit on what code you can call with a mutation (at their core, mutations are known as RPCs or remote procedure calls which are just a means for invoking code on the server from a client), traditionally they're used for these purposes.

Like we saw above with queries, a similar process is followed for mutations. In order to fully implement a mutation, we need to have 3-4 things: a type of data being returned from the mutation, a field on the root Mutation type, and a resolver function for the mutation. Optionally, if your mutation accepts arguments, you may also need to define an input type.

~~~js

  import gql from 'graphql-tag';
  import Documents from '../../api/Documents/Documents';

  const schema = {
    typeDefs: gql`
      type Document {
        _id: String
        isPublic: Boolean
        title: String
        createdAt: String
        updatedAt: String
        body: String
        owner: String
        comments: [Comment]
      }

      type Mutation {
        addDocument(title: String, body: String): Document
      }
    `,
    resolvers: {
      Mutation: {
        addDocument: (root, args, context) => {
          if (!context.user) throw new Error('Sorry, you must be logged in to add a new document.');
          const date = new Date().toISOString();
          const documentId = Documents.insert({
            isPublic: args.isPublic || false,
            title: args.title || `Untitled Document #${Documents.find({ owner: context.user._id }).count() + 1}`,
            body: args.body ? sanitizeHtml(args.body) : 'This is my document. There are many like it, but this one is mine.',
            owner: context.user._id,
            createdAt: date,
            updatedAt: date,
          });
          const doc = Documents.findOne(documentId);
          return doc;
        }
      },
    },
  };

  export default schema;

~~~

Again, on the above, we've defined a simplified example of the schema in MST. This time, we're focusing on the <span class="badge">addDocument</span> mutation.

This should look familiar. In fact, mutations are nearly identical in terms of the "parts" involved. The big difference here is the way we've defined our field on our root Mutation: <span class="badge">addDocument(title: String, body: String): Document</span>.

Notice that we define a mutation with a set of parentheses after its name which contains a set of arguments. Here, we expect title and body to be passed as String values from the client. Notice, too, that instead of expecting an array of documents to be returned from our resolver, we expect a single document.

This needs some clarification. Even though our intent with a mutation is to mutate or change some data, it's still good practice to return some value back to the client once that mutation is finished. The why of this depends on your product, but primarily, it's helpful for updating the client side cache with the new or changed data resulting from the mutation.

If we look at our resolvers.Mutation resolver function, we can see a similar idea being implemented to our query resolver function. Inside, we write the code—again, whatever we'd like—to resolve our mutation. In this case, our intent is to add a new document, so we call to the Documents.insert() method to create a new document in our MongoDB collection. Notice, too, that we put our .insert() call into a variable and expect back the _id of the new document.

This is important. Remember, we want to return our new document from our mutation, so at the bottom of our resolver function, we retrieve that new document using documentId and then return it from our Mutation's resolver function.

That's it! We've added a mutation to our schema and are ready to add new documents.