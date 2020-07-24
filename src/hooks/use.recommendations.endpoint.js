import { allow } from '../classes/allow';
import { useApi } from './use.api';

export const useRecommendationsEndpoint = () => {
   const api = useApi();
   
   const getRecommendations = (seedTrackIds = []) => {
      allow.anArray(seedTrackIds);
      const parameters = {
         seed_tracks: seedTrackIds.join(','),
      };
      return api.call('get', 'https://api.spotify.com/v1/recommendations', parameters);
   }
   
   return {
      getRecommendations,
   };
}