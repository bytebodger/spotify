import { local } from '../classes/local';
import { useApi } from './use.api';
import { useState } from 'react';

export const useMeEndpoint = () => {
   const [me, setMe] = useState(local.getItem('me', {}));
   const api = useApi();
   
   const getMe = () => {
      api.call('get', 'https://api.spotify.com/v1/me')
         .then(response => {
            local.setItem('me', response.data);
            setMe(response.data);
         });
   }
   
   return {
      getMe,
      me,
   };
}