import React, { Component, PropTypes, Children } from 'react';
import omit from 'lodash.omit';
import jss from 'jss';
import isEqual from 'is-equal';

import {
  compose,
  mapProps,
  getContext,
  setDisplayName,
  wrapDisplayName,
  withContext,
  branch
} from 'recompose';

const omitProp = propName => mapProps(props => omit(props, propName));

export const ThemeProvider = withContext(
  { theme: PropTypes.object },
  props => ({ theme: props.theme })
)(props => Children.only(props.children));


const withSheet = mapThemeToCss => {
  let refs = 0;
  let sheet = null;
  let cache = null;

  const attach = (nextState, force = false) => {
    if (isEqual(nextState, cache)) return;

    cache = nextState;
    if (force || !sheet) sheet = jss.createStyleSheet(nextState);
    sheet.attach();
  };

  const ref = (nextState) => {
    if (refs === 0) attach(nextState);
    refs++;
    return sheet;
  };

  const deref = () => {
    refs--;
    if (refs === 0) {
      sheet.detach();
      cache = null;
    }
  };

  return BaseComponent => class withSheet extends Component {
    componentWillMount() {
      const nextState = mapThemeToCss(this.props.theme);
      ref(nextState);
    }
    componentWillReceiveProps(nextProps) {
      if (!isEqual(this.props.theme, nextProps.theme)) {
        attach(mapThemeToCss(nextProps.theme), true);
      }
    }
    componentWillUnmount() {
      deref();
    }
    render() {
      return <BaseComponent {...this.props} sheet={sheet} />;
    }
  };
};

export const connectTheme = mapThemeToCss => BaseComponent => {
  return compose(
    setDisplayName(wrapDisplayName(BaseComponent, 'gild')),
    getContext({ theme: PropTypes.object }),
    branch(props => props.theme,
      compose(
        withSheet(mapThemeToCss),
        mapProps(props => ({ ...props, theme: props.sheet.classes })),
        omitProp('sheet')
      ),
      c => c
    ),
  )(BaseComponent);
};

