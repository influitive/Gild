### Usage:

Gild provides a single HOC that converts and attaches any jss to a component.
A new prop `theme` will be attached to the component that contains all the customized
classes created from this jss.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import jss from 'jss';
import nested from 'jss-nested';
jss.use(nested());

import { withJss } from 'gild';

const theme = {
  primary: 'green'
};

// Component we would like the theme
const component = (props) => {
  return <div className={props.styles.primary}>{JSON.stringify(props)}</div>;
};

// Function that maps the themeObject to css
const themedJss = (
  {
    primary: {
      color: 'red',
      width: '100%',
      'background-color': theme.primary,
      '&:hover': {
        color: 'yellow'
      }
    }
  }
);

// Connect the component to the ThemeProvider
const Blah = withJss(themedJss)(component);

ReactDOM.render(
  <Blah />,
  document.getElementById('app')
);
```
