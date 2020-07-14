import axios from 'axios';
import qs from 'qs';
import { allow } from '../classes/allow';
import { local } from '../classes/local';
import { use } from '../objects/use';

export const useApi = () => {
   const instance = axios.create({});
   
   const call = async (method = 'GET', path = '', parameters = {}, verifyAccessToken = true) => {
      allow.aPopulatedString(method).aPopulatedString(path).anObject(parameters).aBoolean(verifyAccessToken);
      if (verifyAccessToken) {
         await checkAccessToken(verifyAccessToken);
      }
      if (method === 'GET') {
         const config = {
            headers: {
               authorization: 'Bearer ' + local.getItem('accessToken'),
            },
            params: parameters,
         };
         return instance.get(path, config)
            .catch(error => {
               console.log(error);
               return {offline: true};
            });
      } else if (method === 'POST') {
         const config = {
            headers: {
               'content-type': 'application/x-www-form-urlencoded',
            },
         };
         if (use.global.isLoggedIn)
            config.headers.authorization = 'Bearer ' + local.getItem('accessToken');
         return instance.post(path, qs.stringify(parameters), config)
            .catch(() => ({offline: true}));
      } else if (method === 'PUT') {
         const config = {headers: {}};
         if (use.global.isLoggedIn)
            config.headers.authorization = 'Bearer ' + local.getItem('accessToken');
         return instance.put(path + '?' + qs.stringify(parameters), qs.stringify(parameters), config)
            .catch(() => ({offline: true}));
      }
   };
   
   const checkAccessToken = async (verifyAccessToken = true) => {
      allow.aBoolean(verifyAccessToken);
      if (!verifyAccessToken)
         return;
      const fifteenMinutesAgo = Math.floor(Date.now() / 1000) - (60 * 15);
      const remainingSeconds = use.global.accessTokenExpiresOn - fifteenMinutesAgo;
      if (remainingSeconds > 0)
         return;
      await use.tokenApi.refreshAccessToken();
   }
   
   return {
      call,
   };
};