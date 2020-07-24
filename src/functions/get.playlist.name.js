import { allow } from '../classes/allow';
import { use } from '../objects/use';

export const getPlaylistName = (playlistId = '') => {
   allow.aString(playlistId);
   const playlist = use.playlistsEndpoint.playlists.find(playlist => playlist.id === playlistId);
   return playlist ? playlist.name : '';
}