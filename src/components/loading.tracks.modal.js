import * as PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal';
import React from 'react';

export const LoadingTracksModal = props => {
   return (
      <Modal
         disableAutoFocus={true}
         disableEnforceFocus={true}
         open={props.open}
      >
         <div autoFocus={false} style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '10%',
            textAlign: 'center',
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
                  display: 'inline-block',
                  marginRight: 20,
                  position: 'relative',
                  top: 15,
               }}/>
            
               <h3 style={{display: 'inline-block'}}>Loading tracks from playlist...</h3>
               <CircularProgress style={{
                  display: 'inline-block',
                  marginLeft: 20,
                  position: 'relative',
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