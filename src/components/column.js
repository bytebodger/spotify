import Grid from '@material-ui/core/Grid';
import React from 'react';

export const Column = (props) => {
   return (
      <Grid
         item={true}
         {...props}
      >
         {props.children}
      </Grid>
   );
};