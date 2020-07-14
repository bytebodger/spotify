import { allow } from '../classes/allow';
import { local } from '../classes/local';
import { useApi } from './use.api';
import { useState } from 'react';

export const usePlaylistsApi = () => {
   const [playlists, setPlaylists] = useState(local.getItem('playlists', []));
   const [tracks, setTracks] = useState([]);
   const api = useApi();
   
   const getPlaylists = (offset = 0) => {
      allow.aNonNegativeInteger(offset);
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
            const aggregatePlaylists = [...playlists, ...response.data.items];
            local.setItem('playlists', aggregatePlaylists);
            setPlaylists(aggregatePlaylists);
            if (response.data.next)
               getPlaylists(offset + limit);
         });
   }
   
   const getTracks = (playlistId = '', offset = 0) => {
      allow.aPopulatedString(playlistId).aNonNegativeInteger(offset);
      if (offset === 0)
         setTracks([]);
      const limit = 100;
      const parameters = {
         limit,
         offset,
      };
      api.call('GET', `https://api.spotify.com/v1/playlists/${playlistId}/tracks`, parameters)
         .then(response => {
            const aggregateTracks = [...tracks, ...response.data.items];
            setTracks(aggregateTracks);
            if (response.data.next)
               getTracks(playlistId, offset + limit);
            else
               return aggregateTracks;
         });
   }
   
   const replaceTracks = (playlistId = '', uris = []) => {
      allow.aPopulatedString(playlistId).aPopulatedArray(uris);
      const parameters = {
         playlistId,
         uris: uris.join(','),
      };
      api.call('PUT', `https://api.spotify.com/v1/playlists/${playlistId}/tracks`, parameters);
   }

   return {
      getPlaylists,
      getTracks,
      playlists: playlists || [],
      replaceTracks,
      tracks,
   };
}