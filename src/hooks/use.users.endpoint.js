import { allow } from '../classes/allow';
import { is } from '../objects/is';
import { the } from '../objects/the';
import { use } from '../objects/use';
import { useApi } from './use.api';

export const useUsersEndpoint = () => {
   const api = useApi();
   
   const createPlaylist = (name = '') => {
      allow.aString(name, is.not.empty);
      const { id: userId } = use.meEndpoint.me;
      return api.call(the.method.post, `https://api.spotify.com/v1/users/${userId}/playlists`, {name});
   }
   
   return {
      createPlaylist,
   }
}