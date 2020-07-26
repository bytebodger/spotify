import { getCurrentTimeInSeconds } from '../functions/get.current.time.in.seconds';
import { getRedirectUri } from '../functions/get.redirect.uri';
import { local } from '../classes/local';
import { the } from '../objects/the';
import { use } from '../objects/use';
import { useApi } from './use.api';
import { useLocation } from 'react-router';

export const useTokenEndpoint = () => {
   const api = useApi();
   const location = useLocation();
   
   const getAccessToken = () => {
      const parameters = {
         client_id: use.global.clientId,
         grant_type: 'authorization_code',
         code: local.getItem('code'),
         redirect_uri: getRedirectUri() + location.pathname,
         code_verifier: local.getItem('codeVerifier'),
      };
      return api.call(the.method.post, 'https://accounts.spotify.com/api/token', parameters, false)
         .then(response => {
            const {access_token = '', error = '', expires_in = 0, refresh_token = ''} = response.data;
            if (error) {
               use.global.updateError(error);
               return;
            }
            if (access_token)
               use.global.updateAccessToken(access_token);
            if (expires_in)
               use.global.updateAccessTokenExpiresOn(getCurrentTimeInSeconds() + expires_in);
            if (refresh_token)
               use.global.updateRefreshToken(refresh_token);
            use.meEndpoint.getMe();
            use.playlistsEndpoint.getPlaylists();
         });
   }
   
   const refreshAccessToken = () => {
      const parameters = {
         client_id: use.global.clientId,
         grant_type: 'refresh_token',
         refresh_token: use.global.refreshToken,
      };
      return api.call(the.method.post, 'https://accounts.spotify.com/api/token', parameters, false)
         .then(response => {
            const {access_token = '', expires_in = 0, refresh_token = ''} = response.data;
            if (access_token)
               use.global.updateAccessToken(access_token);
            if (expires_in)
               use.global.updateAccessTokenExpiresOn(getCurrentTimeInSeconds() + expires_in);
            if (refresh_token)
               use.global.updateRefreshToken(refresh_token);
         });
   }
   
   return {
      getAccessToken,
      refreshAccessToken,
   };
}