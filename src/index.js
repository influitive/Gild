import React, { Component, PropTypes, Children } from 'react';
import omit from 'lodash.omit';

import useSheet from 'react-jss';

// Provide the theme object to context
export class ThemeProvider extends Component {
  static childContextTypes = { theme: PropTypes.object };
  static propTypes = { theme: PropTypes.object.isRequired };
  getChildContext = () => ({ theme: this.props.theme });
  render = () => Children.only(this.props.children);
}

const PluckClasses = Comp => props => {
  const childProps = omit(props, 'sheet');
  return <Comp {...childProps} styles={props.sheet.classes} />;
};

export const connectTheme = mapThemeToCss => Composed => {
  const wrapped = (props, context) => {
    if (!context || !context.theme) return <Composed {...props} />;

    const jssComp = React.createElement(useSheet(PluckClasses(Composed), mapThemeToCss(context.theme)), props);
    return jssComp;
  };

  wrapped.contextTypes = { theme: PropTypes.object };
  wrapped.displayName = `Theme(${Composed.displayName || 'component'})`;

  return wrapped;
};
