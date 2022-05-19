<h6> Functional Components </h6>

***

It is generally believed that functional components are faster than class components, and the React team has been promising optimizations to functional components

Function components are React components implemented using a plain JavaScript function. A function component receives a single props argument and is expected to return some markup for React to render.

For example, the <span class="badge">< Page404 /></span> component in MST is a great example of (and use case) for a function component.

Here, <span class="badge">< Page404 /></span> is intend to render a message to the user when the URL they type in doesn't match a route in the application—that's it.

Because there's nothing interactive about it—meaning, it doesn't need state or lifecycle methods—we use a function component definition to avoid loading unnecessary functionality.

~~~js
export default function Page404() {
  return (
    <Page title="404 Page Not Found">
      <Container>
        <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            Sorry, page not found!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
            sure to check your spelling.
          </Typography>

          <Box
            component="img"
            src="/static/illustrations/illustration_404.svg"
            sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />

          <Button to="/" size="large" variant="contained" component={RouterLink}>
            Go to Home
          </Button>
        </ContentStyle>
      </Container>
    </Page>
  );
}
~~~


The below example on the right showcases a function component taking in props to render along with the markup. Here, we use JavaScript destructuring to "pluck off" the name prop passed to the component.

In this example, our usage may look like this:

~~~js
    <UserName name={{ first: 'Andy', last: 'Warhol' }} />
~~~

~~~js
    import React from 'react';

    const UserName = ({ name }) => (
    <div className="UserName">
        <p>Howdy, {name.first} {name.last}!</p>
    </div>
    );
~~~

<h6> Prop Types </h6>

***

~~~js
    import React from 'react';
    import PropTypes from 'prop-types';

    const UserName = ({ name }) => (
    <div className="UserName">
        <p>Howdy, {name.first} {name.last}!</p>
    </div>
    );

    UserName.propTypes = {
    name: PropTypes.object.isRequired,
    };
~~~

Prop Types are a convention in React designed to help developers better understand the API of their own components and those they use from third-party developers.

In the simplest sense, Prop Types help us to answer "what props can I pass to this component, and for each prop, what type of data must I pass?"

Consider the example on the right. Here, we take our <span class="badge">< UserName /></span> example from above, adding Prop Types to define the type of data we expect for our name prop.

Here, by defining UserName.propTypes, any property we add to that object is specifying a prop we expect. Here, name is set to the PropTypes.object.isRequired which says "we expect name to be passed as an object and it's required."

Notice, too, that PropTypes is imported as a value from the prop-types packaged (maintained by the React team, separated from React for the sake of purity/convenience).