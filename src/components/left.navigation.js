import React from 'react';
import { local } from '../classes/local';
import { goToSpotifyAuthorization } from '../functions/go.to.spotify.authorization';
import { use } from '../objects/use';
import { useHistory, useLocation } from 'react-router-dom';

export const LeftNavigation = () => {
   const history = useHistory();
   const location = useLocation();
   const buttonStyle = {
      border: '1px solid #777777',
      borderRadius: 10,
      fontWeight: 'bold',
      marginBottom: 2,
      padding: 10,
   };
   
   const getLoggedInLinks = () => {
      if (!use.global.isLoggedIn)
         return null;
      return (
         <>
            <div
               onClick={logOut}
               style={{
                  ...buttonStyle,
                  backgroundColor: 'white',
                  color: '#444444',
                  cursor: 'pointer',
               }}
            >
               Log Out
            </div>
            <div
               onClick={location.pathname === '/find-duplicates' ? () => {} : () => history.push('/find-duplicates')}
               style={{
                  ...buttonStyle,
                  backgroundColor: location.pathname === '/find-duplicates' ? '#FB7153' : 'white',
                  color: location.pathname === '/find-duplicates' ? 'white' : '#444444',
                  cursor: location.pathname === '/find-duplicates' ? 'default' : 'pointer',
               }}
            >
               Find Duplicates
            </div>
            <div
               onClick={location.pathname === '/shuffle' ? () => {} : () => history.push('/shuffle')}
               style={{
                  ...buttonStyle,
                  backgroundColor: location.pathname === '/shuffle' ? '#FB7153' : 'white',
                  color: location.pathname === '/shuffle' ? 'white' : '#444444',
                  cursor: location.pathname === '/shuffle' ? 'default' : 'pointer',
               }}
            >
               Shuffle
            </div>
         </>
      );
   }
   
   const getLoggedOutLinks = () => {
      if (use.global.isLoggedIn)
         return null;
      return (
         <div
            onClick={goToSpotifyAuthorization}
            style={{
               ...buttonStyle,
               backgroundColor: 'white',
               color: '#444444',
               cursor: 'pointer',
            }}
         >
            Log Into Spotify
         </div>
      );
   }
   
   const logOut = () => {
      local.clear();
      window.location.href = '/home';
   }
   
   return (
      <>
         <div
            onClick={location.pathname === '/home' ? () => {} : () => history.push('/home')}
            style={{
               ...buttonStyle,
               backgroundColor: location.pathname === '/home' ? '#FB7153' : 'white',
               color: location.pathname === '/home' ? 'white' : '#444444',
               cursor: location.pathname === '/home' ? 'default' : 'pointer',
            }}
         >
            Home
         </div>
         {getLoggedInLinks()}
         {getLoggedOutLinks()}
      </>
   );
}