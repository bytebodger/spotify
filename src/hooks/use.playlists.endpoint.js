import { allow } from '../classes/allow';
import { is } from '../objects/is';
import { local } from '../classes/local';
import { playlistModel } from '../objects/models/playlist.model';
import { trackModel } from '../objects/models/track.model';
import { the } from '../objects/the';
import { use } from '../objects/use';
import { useApi } from './use.api';
import { useState } from 'react';

export const usePlaylistsEndpoint = () => {
   const [playlists, setPlaylists] = useState(local.getItem('playlists', []));
   const [recommendationPlaylistExists, setRecommendationPlaylistExists] = useState(local.getItem('recommendationPlaylistExists', false));
   const [tracks, setTracks] = useState([]);
   const api = useApi();
   
   const addPlaylist = (playlist = playlistModel) => {
      allow.anInstanceOf(playlist, playlistModel);
      local.setItem('playlists', [...playlists, playlist]);
      setPlaylists([...playlists, playlist]);
   }
   
   const addTracks = (playlistId = '', uris = ['']) => {
      allow.aString(playlistId, is.not.empty).anArrayOfStrings(uris, is.not.empty);
      return api.call(the.method.post, `https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {uris});
   }
   
   const getPlaylists = (offset = 0, allPlaylists = [playlistModel]) => {
      allow.anInteger(offset, is.not.negative).anArrayOfInstances(allPlaylists, playlistModel);
      if (offset === 0) {
         local.setItem('playlists', []);
         setPlaylists([]);
      }
      const limit = 50;
      const parameters = {
         limit,
         offset,
      };
      api.call(the.method.get, 'https://api.spotify.com/v1/me/playlists', parameters)
         .then(response => {
            const aggregatePlaylists = [...allPlaylists, ...response.data.items];
            local.setItem('playlists', aggregatePlaylists);
            setPlaylists(aggregatePlaylists);
            if (response.data.next)
               setTimeout(() => getPlaylists(offset + limit, aggregatePlaylists), use.global.consecutiveApiDelay);
            else {
               const exists = aggregatePlaylists.some(playlist => playlist.name === 'playlist.help Recommendations');
               setRecommendationPlaylistExists(exists);
               local.setItem('recommendationPlaylistExists', exists);
            }
         });
   }
   
   const getTracks = (playlistId = '', offset = 0, allTracks = [trackModel]) => {
      allow.aString(playlistId, is.not.empty).anInteger(offset, is.not.negative).anArrayOfInstances(allTracks, trackModel);
      if (offset === 0) {
         setTracks([]);
         use.global.updatePlaylistTracksLoaded(false);
      }
      const limit = 100;
      const parameters = {
         limit,
         market: 'from_token',
         offset,
      };
      api.call(the.method.get, `https://api.spotify.com/v1/playlists/${playlistId}/tracks`, parameters)
         .then(response => {
            const aggregateTracks = [...allTracks, ...response.data.items.map(item => item.track)];
            setTracks(aggregateTracks);
            if (response.data.next)
               setTimeout(() => getTracks(playlistId, offset + limit, aggregateTracks), use.global.consecutiveApiDelay);
            else
               use.global.updatePlaylistTracksLoaded(true);
         });
   }
   
   const replaceTracks = (playlistId = '', uris = ['']) => {
      allow.aString(playlistId, is.not.empty).anArrayOfStrings(uris, is.not.empty);
      return api.call(the.method.put, `https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {uris});
   }
   
   const updateRecommendationPlaylistExists = (exists = false) => {
      allow.aBoolean(exists);
      local.setItem('recommendationPlaylistExists', exists);
      setRecommendationPlaylistExists(exists);
   }

   return {
      addPlaylist,
      addTracks,
      getPlaylists,
      getTracks,
      playlists: playlists || [],
      recommendationPlaylistExists,
      replaceTracks,
      tracks,
      updateRecommendationPlaylistExists,
   };
}