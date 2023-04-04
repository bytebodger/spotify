import React from 'react';
import { goToSpotifyAuthorization } from '../functions/go.to.spotify.authorization';
import { logOut } from '../functions/log.out';
import { css } from '../objects/css';
import { use } from '../objects/use';
import { useHistory, useLocation } from 'react-router-dom';
import { the } from '../objects/the';

export const LeftNavigation = () => {
   const history = useHistory();
   const location = useLocation();
   const buttonStyle = {
      border: '1px solid #777777',
      borderRadius: 10,
      fontWeight: css.fontWeight.bold,
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
                  cursor: css.cursor.pointer,
                  fontSize: '0.9em',
               }}
            >
               Log Out
            </div>
            <div
               onClick={location.pathname === '/duplicates' ? the.empty.function : () => history.push('/duplicates')}
               style={{
                  ...buttonStyle,
                  backgroundColor: location.pathname === '/duplicates' ? '#FB7153' : 'white',
                  color: location.pathname === '/duplicates' ? 'white' : '#444444',
                  cursor: location.pathname === '/duplicates' ? css.cursor.default : css.cursor.pointer,
                  fontSize: '0.9em',
               }}
            >
               Duplicates
            </div>
            <div
               onClick={location.pathname === '/recommend' ? the.empty.function : () => history.push('/recommend')}
               style={{
                  ...buttonStyle,
                  backgroundColor: location.pathname === '/recommend' ? '#FB7153' : 'white',
                  color: location.pathname === '/recommend' ? 'white' : '#444444',
                  cursor: location.pathname === '/recommend' ? css.cursor.default : css.cursor.pointer,
                  fontSize: '0.9em',
               }}
            >
               Recommend
            </div>
            <div
               onClick={location.pathname === '/shuffle' ? the.empty.function : () => history.push('/shuffle')}
               style={{
                  ...buttonStyle,
                  backgroundColor: location.pathname === '/shuffle' ? '#FB7153' : 'white',
                  color: location.pathname === '/shuffle' ? 'white' : '#444444',
                  cursor: location.pathname === '/shuffle' ? css.cursor.default : css.cursor.pointer,
                  fontSize: '0.9em',
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
               cursor: css.cursor.pointer,
               fontSize: '0.9em',
            }}
         >
            Login to Spotify
         </div>
      );
   }
   
   return (
      <>
         <div
            onClick={location.pathname === '/home' ? the.empty.function : () => history.push('/home')}
            style={{
               ...buttonStyle,
               backgroundColor: location.pathname === '/home' ? '#FB7153' : 'white',
               color: location.pathname === '/home' ? 'white' : '#444444',
               cursor: location.pathname === '/home' ? css.cursor.default : css.cursor.pointer,
               fontSize: '0.9em',
            }}
         >
            Home
         </div>
         {getLoggedInLinks()}
         {getLoggedOutLinks()}
         <div
            onClick={location.pathname === '/about' ? the.empty.function : () => history.push('/about')}
            style={{
               ...buttonStyle,
               backgroundColor: location.pathname === '/about' ? '#FB7153' : 'white',
               color: location.pathname === '/about' ? 'white' : '#444444',
               cursor: location.pathname === '/about' ? css.cursor.default : css.cursor.pointer,
               fontSize: '0.9em',
            }}
         >
            About
         </div>
      </>
   );
}