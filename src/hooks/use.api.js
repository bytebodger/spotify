import axios from 'axios';
import qs from 'qs';
import { allow } from '../classes/allow';
import { getCurrentTimeInSeconds } from '../functions/get.current.time.in.seconds';
import { is } from '../objects/is';
import { local } from '../classes/local';
import { the } from '../objects/the';
import { use } from '../objects/use';

export const useApi = () => {
   const call = async (method = the.method.get, url = '', data = {}, verifyAccessToken = true) => {
      allow.oneOf(method, the.method).aString(url, is.not.empty).anObject(data).aBoolean(verifyAccessToken);
      if (verifyAccessToken) {
         await checkAccessToken(verifyAccessToken);
      }
      const contentType = url.includes('/token') ? 'urlFormEncoded' : 'json';
      if (method === the.method.get) {
         return axios({
            headers: {
               authorization: use.global.isLoggedIn ? 'Bearer ' + local.getItem('accessToken') : '',
            },
            method,
            params: data,
            url,
         }).catch(error => console.error(error));
      } else if (method === the.method.post) {
         return axios({
            data: contentType === 'urlFormEncoded' ? qs.stringify(data) : data,
            headers: {
               authorization: use.global.isLoggedIn && data.grant_type !== 'refresh_token' ? 'Bearer ' + local.getItem('accessToken') : '',
               'content-type': contentType === 'urlFormEncoded' ? 'application/x-www-form-urlencoded' : 'application/json',
            },
            method,
            url,
         }).catch(error => console.error(error));
      } else if (method === the.method.put) {
         return axios({
            data,
            headers: {
               authorization: 'Bearer ' + local.getItem('accessToken'),
               'content-type': 'application/json',
            },
            method,
            url,
         }).catch(error => console.error(error));
      }
   };
   
   const checkAccessToken = async (verifyAccessToken = true) => {
      allow.aBoolean(verifyAccessToken);
      if (!verifyAccessToken)
         return;
      const now = getCurrentTimeInSeconds();
      const remainingSeconds = use.global.accessTokenExpiresOn - now;
      if (remainingSeconds > (60 * 30))
         return;
      await use.tokenEndpoint.refreshAccessToken();
   }
   
   return {
      call,
   };
};