import { allow } from '../classes/allow';
import { local } from '../classes/local';
import { use } from '../objects/use';
import { useApi } from './use.api';
import { useState } from 'react';

export const usePlaylistsApi = () => {
   const [playlists, setPlaylists] = useState(local.getItem('playlists', []));
   const [tracks, setTracks] = useState([]);
   const api = useApi();
   
   const addTracks = (playlistId = '', uris = []) => {
      allow.aPopulatedString(playlistId).aPopulatedArray(uris);
      return api.call('POST', `https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {uris});
   }
   
   const getPlaylists = (offset = 0, allPlaylists = []) => {
      allow.aNonNegativeInteger(offset).anArray(allPlaylists);
      if (offset === 0) {
         local.setItem('playlists', []);
         setPlaylists([]);
      }
      const limit = 50;
      const parameters = {
         limit,
         offset,
      };
      api.call('GET', 'https://api.spotify.com/v1/me/playlists', parameters)
         .then(response => {
            const aggregatePlaylists = [...allPlaylists, ...response.data.items];
            local.setItem('playlists', aggregatePlaylists);
            setPlaylists(aggregatePlaylists);
            if (response.data.next)
               setTimeout(() => getPlaylists(offset + limit, aggregatePlaylists), use.global.consecutiveApiDelay);
         });
   }
   
   const getTracks = (playlistId = '', offset = 0, allTracks = []) => {
      allow.aPopulatedString(playlistId).aNonNegativeInteger(offset).anArray(allTracks);
      if (offset === 0) {
         setTracks([]);
         use.global.updatePlaylistTracksLoaded(false);
      }
      const limit = 100;
      const parameters = {
         limit,
         offset,
      };
      api.call('GET', `https://api.spotify.com/v1/playlists/${playlistId}/tracks`, parameters)
         .then(response => {
            const aggregateTracks = [...allTracks, ...response.data.items];
            setTracks(aggregateTracks);
            if (response.data.next)
               setTimeout(() => getTracks(playlistId, offset + limit, aggregateTracks), use.global.consecutiveApiDelay);
            else
               use.global.updatePlaylistTracksLoaded(true);
         });
   }
   
   const replaceTracks = (playlistId = '', uris = []) => {
      allow.aPopulatedString(playlistId).aPopulatedArray(uris);
      return api.call('PUT', `https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {uris});
   }

   return {
      addTracks,
      getPlaylists,
      getTracks,
      playlists: playlists || [],
      replaceTracks,
      tracks,
   };
}