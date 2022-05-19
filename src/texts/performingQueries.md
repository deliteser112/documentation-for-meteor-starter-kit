With our queries and mutations defined in our schema, now we can put them to use on the client.

In MST, we've utilized the <span class="badge">swydo:graphql</span> package to allow us to create .gql files containing our queries and mutations on the client. This is helpful because queries and mutations can be anywhere from a couple to several lines and keeping them separate from components keeps things tidy. Of note, all GraphQL related client code is located in the /ui directory:

* /ui/fragments reusable "chunks" of fields that are used in multiple queries.
* /ui/mutations mutation definitions for the client.
* /ui/queries query definitions for the client.

<blockquote>
  ⚠️Imports of these files change based on their contents

  Each .gql file can have one or more fragments, queries, or mutations. For files with a single definition, a JavaScript default import must be used (no curly braces like import queryName from '../../queries/Type.gql';), while files with multiple definitions must use named imports (with curly braces like import { queryOne, queryTwo } from '../../queries/Type.gql';).
</blockquote>

To put queries and mutations to use in our component code, we recommend using the graphql() component enhancer (a.k.a. as a data container). This is in contrast to the <Query /> and <Mutation /> components that are included in the react-apollo package where the graphql() enhancer is imported from.