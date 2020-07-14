import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import React from 'react';

export const Row = (props) => {
   return (
      <Grid
         container={true}
         {...props}
      >
         {props.children}
      </Grid>
   );
};

Row.propTypes = {
   spacing : PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
};
Row.defaultProps = {
   spacing : 0,
};