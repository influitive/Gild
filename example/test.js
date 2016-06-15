import React from 'react';
import ReactDOM from 'react-dom';

import jss from 'jss';
import nested from 'jss-nested';
jss.use(nested());

import { ThemeProvider, connectTheme } from '../src';

const theme = {
  primary: 'green'
};

const component = (props) => {
  return <div className={props.theme.primary}>{JSON.stringify(props)}</div>;
};

const mapPropsToCSS = ({ primary }) => (
  {
    primary: {
      color: 'red',
      width: '100%',
      'background-color': primary,
      '&:hover': {
        color: 'yellow'
      }
    }
  }
);

const Blah = connectTheme(mapPropsToCSS)(component);

class App extends React.Component {
  state = {
    color: 'green'
  };
  render() {
    return <div>
      <input type="text"
        value={this.state.color}
        onChange={e => this.setState({ color: e.target.value })} />
      <ThemeProvider theme={{ primary: this.state.color }}>
        <div>
          <Blah />
          <Blah />
          <Blah />
          <Blah />
          <Blah />
          <Blah />
        </div>
      </ThemeProvider>
    </div>;
  }
}

ReactDOM.render(
  <App/> ,
  document.getElementById('app')
);
