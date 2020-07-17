import { allow } from '../classes/allow';
import { createGuid } from '../functions/create.guid';
import { getSessionValues } from '../functions/get.session.values';
import { local } from '../classes/local';
import { useState } from 'react';

export const useGlobal = () => {
   const session = getSessionValues();
   const [accessToken, setAccessToken] = useState(session.accessToken);
   const [accessTokenExpiresOn, setAccessTokenExpiresOn] = useState(session.accessTokenExpiresOn);
   const [code, setCode] = useState(session.code);
   const [codeVerifier, setCodeVerifier] = useState(session.codeVerifier);
   const [error, setError] = useState('');
   const [isLoggedIn, setIsLoggedIn] = useState(session.isLoggedIn);
   const [playlistTracksLoaded, setPlaylistTracksLoaded] = useState(false);
   const [refreshToken, setRefreshToken] = useState(session.refreshToken);
   
   const updateAccessToken = (token = '') => {
      allow.aString(token);
      local.setItem('accessToken', token);
      setAccessToken(token);
   }
   
   const updateAccessTokenExpiresOn = (timestamp = 0) => {
      allow.aPositiveInteger(timestamp);
      local.setItem('accessTokenExpiresOn', timestamp);
      setAccessTokenExpiresOn(timestamp);
   }
   
   const updateCode = (token = '') => {
      allow.aString(token);
      local.setItem('code', token);
      setCode(token);
   }
   
   const updateCodeVerifier = (verifier = '') => {
      allow.aString(verifier);
      local.setItem('codeVerifier', verifier);
      setCodeVerifier(verifier);
   }
   
   const updateError = (message = '') => {
      allow.aString(message);
      setError(message);
   }
   
   const updateIsLoggedIn = (loggedIn = false) => {
      allow.aBoolean(loggedIn);
      setIsLoggedIn(loggedIn);
   }
   
   const updatePlaylistTracksLoaded = (loaded = false) => {
      allow.aBoolean(loaded);
      setPlaylistTracksLoaded(loaded);
   }
   
   const updateRefreshToken = (token = '') => {
      allow.aString(token);
      local.setItem('refreshToken', token);
      setRefreshToken(token);
   }
   
   return {
      accessToken,
      accessTokenExpiresOn,
      clientId: '88008c88d1eb42b18856e03882160007',
      code,
      codeVerifier,
      consecutiveApiDelay: 250,
      error,
      isLoggedIn,
      playlistTracksLoaded,
      refreshToken,
      state: local.getItem('state', createGuid()),
      updateAccessToken,
      updateAccessTokenExpiresOn,
      updateCode,
      updateCodeVerifier,
      updateError,
      updateIsLoggedIn,
      updatePlaylistTracksLoaded,
      updateRefreshToken,
   };
}