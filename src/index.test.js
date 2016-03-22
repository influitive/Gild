import test from 'tape-catch';
import React, { PropTypes, Component, Children } from 'react';
import TestUtils from 'react-addons-test-utils';

// DOM SETUP
if (typeof document === 'undefined') {
  const jsdom = require('jsdom').jsdom;

  global.document = jsdom('<html><body></body></html>');
  global.window = document.defaultView;
  global.navigator = {
    userAgent: 'node.js'
  };
}

// Components to test
import { ThemeProvider, connectTheme } from '.';

test('Provider', t => {
  const theme = { primary: 'poop' };

  class Child extends Component {
    static contextTypes = { theme: PropTypes.object.isRequired };
    render = () => <div/>;
  }

  t.doesNotThrow(() => {
    TestUtils.renderIntoDocument(
      <ThemeProvider theme={theme}>
        <div />
      </ThemeProvider>
    );
  }, 'Should render only one child');

  t.throws(() => {
    TestUtils.renderIntoDocument(
      <ThemeProvider theme={theme}>
      </ThemeProvider>
    );
  }, 'Should throw if passed no children');

  t.throws(() => {
    TestUtils.renderIntoDocument(
      <ThemeProvider theme={theme}>
        <div />
        <div />
      </ThemeProvider>
    );
  }, 'Should throw if passed more than one child');

  const tree = TestUtils.renderIntoDocument(
    <ThemeProvider theme={theme}>
      <Child />
    </ThemeProvider>
  );
  const child = TestUtils.findRenderedComponentWithType(tree, Child);
  t.equals(child.context.theme, theme, 'Should pass the theme via context');

  t.end();
});

test('Connect', t => {
  const theme = { primary: 'green' };

  class ProviderMock extends Component {
    static childContextTypes = { theme: PropTypes.object };
    static propTypes = { theme: PropTypes.object.isRequired };
    getChildContext = () => ({ theme: this.props.theme });
    render = () => Children.only(this.props.children);
  }

  class Comp extends Component {
    render() {
      return <div className={this.props.theme.irish}/>;
    }
  }

  const Child = connectTheme(p => ({ irish: { color: p.primary }}))(Comp);

  const tree = TestUtils.renderIntoDocument(
    <ProviderMock theme={theme}>
      <Child pass="through" />
    </ProviderMock>
  );

  const child = TestUtils.findRenderedComponentWithType(tree, Comp);
  t.ok(child.props.theme, 'The child should receive some classes');

  t.equal(child.props.pass, 'through', 'The child should still receieve it\'s own props');

  const cssRule = document._styleSheets[0].cssRules[0]; // First Stylesheet, first rule
  t.equal(cssRule.style.color, 'green', 'Should add a css rule where color is green');

  t.doesNotThrow(() => {
    TestUtils.findRenderedDOMComponentWithClass(tree, cssRule.selectorText.slice(1));
  }, 'Components class should match the css rule in the dom');

  t.end();
});

