import * as PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal';
import React from 'react';
import { css } from '../objects/css';

export const LoadingTracksModal = props => {
   return (
      <Modal
         disableAutoFocus={true}
         disableEnforceFocus={true}
         open={props.open}
      >
         <div autoFocus={false} style={{
            marginLeft: css.marginLeft.auto,
            marginRight: css.marginRight.auto,
            marginTop: '10%',
            textAlign: css.textAlign.center,
            width: '50%',
         }}>
            <div style={{
               backgroundColor: 'white',
               border: '1px solid black',
               borderRadius: 10,
               paddingBottom: 30,
               paddingTop: 30,
            }}>
               <CircularProgress style={{
                  display: css.display.inlineBlock,
                  marginRight: 20,
                  position: css.position.relative,
                  top: 15,
               }}/>
            
               <h3 style={{display: css.display.inlineBlock}}>Loading tracks from playlist...</h3>
               <CircularProgress style={{
                  display: css.display.inlineBlock,
                  marginLeft: 20,
                  position: css.position.relative,
                  top: 15,
               }}/>
            </div>
         </div>
      </Modal>
   );
}

LoadingTracksModal.propTypes = {
   open: PropTypes.bool.isRequired,
}