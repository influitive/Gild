import test from 'tape-catch';
import React, { Component } from 'react';
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
import { withJss } from '.';

test('withJss', t => {
  const theme = { primary: 'green' };

  class Comp extends Component {
    render() {
      return <div className={this.props.theme.irish}/>;
    }
  }

  const Child = withJss({ irish: { color: theme.primary }})(Comp);

  const tree = TestUtils.renderIntoDocument(
    <Child pass="through" />
  );

  const child = TestUtils.findRenderedComponentWithType(tree, Comp);
  t.ok(child.props.theme, 'The child should receive some classes');

  t.equal(child.props.pass, 'through', 'The child should still receieve it\'s own props');

  const cssRule = document.styleSheets[0].cssRules[0]; // First Stylesheet, first rule
  t.equal(cssRule.style.color, 'green', 'Should add a css rule where color is green');

  t.doesNotThrow(() => {
    TestUtils.findRenderedDOMComponentWithClass(tree, cssRule.selectorText.slice(1));
  }, 'Components class should match the css rule in the dom');

  t.end();
});

