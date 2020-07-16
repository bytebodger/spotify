import axios from 'axios';
import qs from 'qs';
import { allow } from '../classes/allow';
import { local } from '../classes/local';
import { use } from '../objects/use';

export const useApi = () => {
   const call = async (method = 'GET', url = '', data = {}, verifyAccessToken = true) => {
      allow.aPopulatedString(method).aPopulatedString(url).anObject(data).aBoolean(verifyAccessToken);
      if (verifyAccessToken) {
         await checkAccessToken(verifyAccessToken);
      }
      const contentType = url.includes('/token') ? 'urlFormEncoded' : 'json';
      if (method === 'GET') {
         return axios({
            headers: {
               authorization: use.global.isLoggedIn ? 'Bearer ' + local.getItem('accessToken') : '',
            },
            method: 'get',
            params: data,
            url,
         }).catch(error => console.error(error));
      } else if (method === 'POST') {
         return axios({
            data: contentType === 'urlFormEncoded' ? qs.stringify(data) : data,
            headers: {
               authorization: use.global.isLoggedIn ? 'Bearer ' + local.getItem('accessToken') : '',
               'content-type': contentType === 'urlFormEncoded' ? 'application/x-www-form-urlencoded' : 'application/json',
            },
            method: 'post',
            url,
         }).catch(error => console.error(error));
      } else if (method === 'PUT') {
         return axios({
            data,
            headers: {
               authorization: 'Bearer ' + local.getItem('accessToken'),
               'content-type': 'application/json',
            },
            method: 'put',
            url,
         }).catch(error => console.error(error));
      }
   };
   
   const checkAccessToken = async (verifyAccessToken = true) => {
      allow.aBoolean(verifyAccessToken);
      if (!verifyAccessToken)
         return;
      const now = Math.floor(Date.now() / 1000);
      if (now > use.global.accessTokenExpiresOn) {
         window.location.href = '/home';
         return;
      }
      const thirtyMinutesAgo = Math.floor(Date.now() / 1000) - (60 * 30);
      const remainingSeconds = use.global.accessTokenExpiresOn - thirtyMinutesAgo;
      if (remainingSeconds > 0)
         return;
      await use.tokenApi.refreshAccessToken();
   }
   
   return {
      call,
   };
};