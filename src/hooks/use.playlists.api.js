import { allow } from '../classes/allow';
import { local } from '../classes/local';
import { useApi } from './use.api';
import { useState } from 'react';

export const usePlaylistsApi = () => {
   const [playlists, setPlaylists] = useState(local.getItem('playlists', []));
   const [tracks, setTracks] = useState([]);
   const api = useApi();
   
   const addTracks = (playlistId = '', uris = []) => {
      allow.aPopulatedString(playlistId).aPopulatedArray(uris);
      api.call('POST', `https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {uris});
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
               getPlaylists(offset + limit, aggregatePlaylists);
         });
   }
   
   const getTracks = (playlistId = '', offset = 0, allTracks = []) => {
      allow.aPopulatedString(playlistId).aNonNegativeInteger(offset).anArray(allTracks);
      if (offset === 0)
         setTracks([]);
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
               getTracks(playlistId, offset + limit, aggregateTracks);
            else
               return aggregateTracks;
         });
   }
   
   const replaceTracks = (playlistId = '', uris = []) => {
      allow.aPopulatedString(playlistId).aPopulatedArray(uris);
      api.call('PUT', `https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {uris});
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