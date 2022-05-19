MUI offers a comprehensive suite of UI tools to help you ship new features faster. You can start with Material UI, our fully-loaded component library, or bring your own design system to our production-ready components.

<h6>Your first component</h6>
The following code snippet demonstrates a basic Material UI app that features a < Button> component:

~~~js
import * as React from 'react';
  import ReactDOM from 'react-dom';
  import Button from '@mui/material/Button';

  function App() {
    return (
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    );
  }
~~~

In the interactive demo below, try changing the code and see how it affects the output. (Hint: change variant to "outlined" and color to "secondary". For more options, see [the Button component page](https://mui.com/material-ui/react-button/).)