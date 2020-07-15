import { getRedirectUri } from '../functions/get.redirect.uri';
import { local } from '../classes/local';
import { use } from '../objects/use';
import { useApi } from './use.api';
import { useLocation } from 'react-router';

export const useTokenApi = () => {
   const api = useApi();
   const location = useLocation();
   
   const getAccessToken = () => {
      const parameters = {
         client_id: process.env.REACT_APP_CLIENT_ID,
         grant_type: 'authorization_code',
         code: local.getItem('code'),
         redirect_uri: getRedirectUri() + location.pathname,
         code_verifier: local.getItem('codeVerifier'),
      };
      return api.call('POST', 'https://accounts.spotify.com/api/token', parameters, false)
         .then(response => {
            const {access_token = '', error = '', expires_in = 0, refresh_token = ''} = response.data;
            if (error) {
               use.global.updateError(error);
               return;
            }
            if (access_token)
               use.global.updateAccessToken(access_token);
            if (expires_in)
               use.global.updateAccessTokenExpiresOn((Math.floor(Date.now() / 1000)) + expires_in);
            if (refresh_token)
               use.global.updateRefreshToken(refresh_token);
            use.meApi.getMe();
            use.playlistsApi.getPlaylists();
         });
   }
   
   const refreshAccessToken = () => {
      const parameters = {
         client_id: process.env.REACT_APP_CLIENT_ID,
         grant_type: 'refresh_token',
         refresh_token: use.global.refreshToken,
      };
      return api.call('POST', 'https://accounts.spotify.com/api/token', parameters, false)
         .then(response => {
            const {access_token = '', expires_in = 0, refresh_token = ''} = response.data;
            if (access_token)
               use.global.updateAccessToken(access_token);
            if (expires_in)
               use.global.updateAccessTokenExpiresOn((Math.floor(Date.now() / 1000)) + expires_in);
            if (refresh_token)
               use.global.updateRefreshToken(refresh_token);
         });
   }
   
   return {
      getAccessToken,
      refreshAccessToken,
   };
}