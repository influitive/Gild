import jss from 'jss';
import isEqual from 'is-equal';

import {
  compose,
  lifecycle,
  withProps
} from 'recompose';

export default mapThemeToCss => {
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

  return compose(
    lifecycle({
      componentWillMount() {
        const nextState = mapThemeToCss(this.props.theme);
        ref(nextState);
      },
      componentWillReceiveProps(nextProps) {
        if (!isEqual(this.props.theme, nextProps.theme)) {
          attach(mapThemeToCss(nextProps.theme), true);
        }
      },
      componentWillUnmount() {
        deref();
      }
    }),
    withProps(() => ({
      sheet
    }))
  );
};
