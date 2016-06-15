import { PropTypes, Children } from 'react';
import omit from 'lodash.omit';
import {
  compose,
  mapProps,
  getContext,
  setDisplayName,
  wrapDisplayName,
  withContext,
  branch
} from 'recompose';

import withSheet from './with-sheet';

const omitProp = propName => mapProps(props => omit(props, propName));

export const ThemeProvider = withContext(
  { theme: PropTypes.object },
  props => ({ theme: props.theme })
)(props => Children.only(props.children));

export const connectTheme = mapThemeToCss =>
  compose(
    comp => setDisplayName(wrapDisplayName(comp, 'gild'))(comp),
    getContext({ theme: PropTypes.object }),
    branch(props => props.theme,
      compose(
        withSheet(mapThemeToCss),
        mapProps(props => ({ ...props, theme: props.sheet.classes })),
        omitProp('sheet')
      ),
      c => c
    )
  );

