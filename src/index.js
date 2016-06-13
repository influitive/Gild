import omit from 'lodash.omit';
import useSheet from 'react-jss';
import { compose, mapProps } from 'recompose';

// Pull the theme off of context and pass it to a 'PluckClasses' wrapped component
export const withJss = jss => {
  return compose(
    useSheet(jss),
    mapProps(props => (
      {
        ...omit(props, 'sheet'),
        theme: props.sheet.classes
      }
    )),
  );
};