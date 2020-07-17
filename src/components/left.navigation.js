import base64url from 'base64url';
import crypto from 'crypto';
import React from 'react';
import { createGuid } from '../functions/create.guid';
import { getRedirectUri } from '../functions/get.redirect.uri';
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
   const scopes = [
      'playlist-modify-public',
      'playlist-modify-private',
      'user-modify-playback-state',
      'user-read-playback-state',
   ];
   
   const getLoggedInLinks = () => {
      if (!use.global.isLoggedIn)
         return null;
      return (
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
   
   const goToSpotifyAuthorization = () => {
      const codeVerifier = createGuid(43);
      use.global.updateCodeVerifier(codeVerifier);
      const newHash = crypto.createHash('sha256').update(codeVerifier).digest();
      const codeChallenge = base64url.encode(newHash);
      window.location.href = 'https://accounts.spotify.com/authorize'
         + `?client_id=${use.global.clientId}`
         + `&code_challenge=${codeChallenge}`
         + '&code_challenge_method=S256'
         + '&response_type=code'
         + `&redirect_uri=${encodeURIComponent(getRedirectUri() + '/home')}`
         + `&scope=${scopes.join(' ')}`
         + `&state=${use.global.state}`
      ;
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