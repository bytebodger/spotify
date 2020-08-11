import React from 'react';
import { goToSpotifyAuthorization } from '../functions/go.to.spotify.authorization';
import { logOut } from '../functions/log.out';
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
               onClick={location.pathname === '/duplicates' ? () => {} : () => history.push('/duplicates')}
               style={{
                  ...buttonStyle,
                  backgroundColor: location.pathname === '/duplicates' ? '#FB7153' : 'white',
                  color: location.pathname === '/duplicates' ? 'white' : '#444444',
                  cursor: location.pathname === '/duplicates' ? 'default' : 'pointer',
               }}
            >
               Duplicates
            </div>
            <div
               onClick={location.pathname === '/recommend' ? () => {} : () => history.push('/recommend')}
               style={{
                  ...buttonStyle,
                  backgroundColor: location.pathname === '/recommend' ? '#FB7153' : 'white',
                  color: location.pathname === '/recommend' ? 'white' : '#444444',
                  cursor: location.pathname === '/recommend' ? 'default' : 'pointer',
               }}
            >
               Recommend
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
         <div
            onClick={location.pathname === '/about' ? () => {} : () => history.push('/about')}
            style={{
               ...buttonStyle,
               backgroundColor: location.pathname === '/about' ? '#FB7153' : 'white',
               color: location.pathname === '/about' ? 'white' : '#444444',
               cursor: location.pathname === '/about' ? 'default' : 'pointer',
            }}
         >
            About
         </div>
      </>
   );
}