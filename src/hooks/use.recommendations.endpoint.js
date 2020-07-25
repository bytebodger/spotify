import { allow } from '../classes/allow';
import { the } from '../objects/the';
import { useApi } from './use.api';

export const useRecommendationsEndpoint = () => {
   const api = useApi();
   
   const getRecommendations = (seedTrackIds = []) => {
      allow.anArrayOfStrings(seedTrackIds);
      const parameters = {
         seed_tracks: seedTrackIds.join(','),
      };
      return api.call(the.method.get, 'https://api.spotify.com/v1/recommendations', parameters);
   }
   
   return {
      getRecommendations,
   };
}