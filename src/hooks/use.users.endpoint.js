import { allow } from '../classes/allow';
import { use } from '../objects/use';
import { useApi } from './use.api';

export const useUsersEndpoint = () => {
   const api = useApi();
   
   const createPlaylist = (name = '') => {
      allow.aPopulatedString(name);
      const { id: userId } = use.meEndpoint.me;
      return api.call('POST', `https://api.spotify.com/v1/users/${userId}/playlists`, {name});
   }
   
   return {
      createPlaylist,
   }
}