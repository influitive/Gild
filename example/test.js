import React from 'react';
import ReactDOM from 'react-dom';

import jss from 'jss';
import nested from 'jss-nested';
jss.use(nested());

import { ThemeProvider, connectTheme } from '../src';

const theme = {
  primary: 'green',
};

const component = (props) => {
  return <div className={props.styles.primary}>{JSON.stringify(props)}</div>;
}

const mapPropsToCSS = ({ primary }) => (
  {
    primary: {
      color: 'red',
      width: '100%',
      "background-color": primary,
      '&:hover': {
        color: 'yellow'
      }
    }
  }
);

const Blah = connectTheme(mapPropsToCSS)(component);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Blah />
  </ThemeProvider>,
  document.getElementById('app')
);
