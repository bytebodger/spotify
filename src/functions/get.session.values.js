import { local } from '../classes/local';

export const getSessionValues = () => {
   const session = {
      accessToken: local.getItem('accessToken', ''),
      accessTokenExpiresOn: local.getItem('accessTokenExpiresOn', 0),
      code: local.getItem('code', ''),
      codeVerifier: local.getItem('codeVerifier', ''),
      isLoggedIn: true,
      refreshToken: local.getItem('refreshToken', ''),
   };
   const remainingSecondsInSession = session.accessTokenExpiresOn - Math.floor(Date.now() / 1000);
   if (remainingSecondsInSession < 0) {
      session.accessToken = '';
      session.accessTokenExpiresOn = 0;
      session.code = '';
      session.codeVerifier = '';
      session.isLoggedIn = false;
      session.refreshToken = '';
   }
   return session;
}