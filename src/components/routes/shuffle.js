import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useState } from 'react';
import Select from '@material-ui/core/Select';
import { allow } from '../../classes/allow';
import { cloneArray } from '../../functions/clone.array';
import { Column } from '../column';
import { Row } from '../row';
import { use } from '../../objects/use';

export const Shuffle = () => {
   const [lastShuffleResult, setLastShuffleResult] = useState([]);
   const [selectedPlaylistId, setSelectedPlaylistId] = useState('');
   
   const addTracks = (batches = []) => {
      allow.aPopulatedArray(batches);
      const batch = batches.shift();
      use.playlistsApi.addTracks(selectedPlaylistId, batch);
      if (batches.length > 0)
         setTimeout(() => addTracks(batches), use.global.consecutiveApiDelay);
   }
   
   const comparePlaylists = (playlist1 = {}, playlist2 = {}) => {
      allow.aPopulatedObject(playlist1).aPopulatedObject(playlist2);
      if (playlist1.name.toLowerCase() < playlist2.name.toLowerCase())
         return -1;
      else if (playlist1.name.toLowerCase() > playlist2.name.toLowerCase())
         return 1;
      else
         return 0;
   };
   
   const getMenuItems = () => {
      let menuItems = [];
      const filteredPlaylists = use.playlistsApi.playlists.filter(playlist => {
         const { tracks } = playlist;
         return !playlist.name.toLowerCase().includes('shazam')
            && !playlist.name.toLowerCase().includes('rejected')
            && tracks.total > 1;
      });
      filteredPlaylists.sort(comparePlaylists);
      filteredPlaylists.forEach(playlist => menuItems.push(
         <MenuItem
            key={playlist.id}
            selected={playlist.id === selectedPlaylistId}
            value={playlist.id}
         >
            {playlist.name}
         </MenuItem>
      ));
      return menuItems;
   };
   
   const getPlaylistName = () => {
      const playlist = use.playlistsApi.playlists.find(playlist => playlist.id === selectedPlaylistId);
      return playlist ? playlist.name : '';
   }
   
   const getTrackArtists = (artists = []) => {
      allow.aPopulatedArray(artists);
      const displayArtists = artists.map(artist => artist.name);
      return displayArtists.join(' & ');
   }
   
   const getTrackDescription = (track = {}, index = -1) => {
      allow.aPopulatedObject(track).aNonNegativeInteger(index);
      const { artists } = track.track;
      return (
         <div key={track.track.id + index}>
            {index + 1}. {track.track.name} by {getTrackArtists(artists)}
         </div>
      );
   }
   
   const rebuildPlaylist = (batches = []) => {
      allow.aPopulatedArray(batches);
      const firstBatch = batches.shift();
      use.playlistsApi.replaceTracks(selectedPlaylistId, firstBatch)
         .then(() => {
            if (batches.length > 0)
               setTimeout(() => addTracks(batches), use.global.consecutiveApiDelay);
         });
   }
   
   const shuffle = () => {
      let tracks = cloneArray(use.playlistsApi.tracks);
      for (let i = tracks.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * i);
         const temp = tracks[i];
         tracks[i] = tracks[j];
         tracks[j] = temp;
      }
      updateTracks(tracks);
   }
   
   const updateSelectedPlaylist = (event = {}) => {
      allow.aPopulatedObject(event);
      const playlistId = event.target.value;
      setSelectedPlaylistId(playlistId);
      use.global.updatePlaylistTracksLoaded(false);
      if (playlistId !== '')
         use.playlistsApi.getTracks(playlistId);
   }
   
   const updateTracks = (tracks = []) => {
      allow.aPopulatedArray(tracks);
      let currentBatch = [];
      let uriBatches = [];
      let display = [];
      tracks.forEach((track, index) => {
         display.push(getTrackDescription(track, index));
         currentBatch.push(track.track.uri);
         if (index > 0 && ((index % 99) === 0 || index === tracks.length - 1)) {
            uriBatches.push(cloneArray(currentBatch));
            currentBatch = [];
         }
      });
      rebuildPlaylist(uriBatches);
      setLastShuffleResult(display);
   }
   
   return (
      <>
         <h1 style={{marginTop: 0}}>Shuffle That Sucks Less</h1>
         <Row>
            <Column xs={12} sm={10} md={8} lg={6} xl={4}>
               <FormControl
                  style={{width: '100%'}}
                  variant={'outlined'}
               >
                  <InputLabel>Playlist to be Shuffled</InputLabel>
                  <Select
                     label={'Playlist to be Shuffled'}
                     onChange={updateSelectedPlaylist}
                     value={selectedPlaylistId}
                  >
                     <MenuItem value={''}>&nbsp;</MenuItem>
                     {getMenuItems()}
                  </Select>
               </FormControl>
            </Column>
         </Row>
         <Row style={{marginTop: 20}}>
            <Column xs={12}>
               <Button
                  disabled={!use.global.playlistTracksLoaded || selectedPlaylistId === ''}
                  onClick={shuffle}
                  variant={'outlined'}
               >
                  Shuffle
               </Button>
            </Column>
         </Row>
         <Row style={{marginTop: 20}}>
            <Column xs={12}>
               <div style={{display: lastShuffleResult.length ? 'block' : 'none'}}>
                  All the tracks in your <b>{getPlaylistName()}</b> playlist have been shuffled into the order shown below.  If you view the <b>{getPlaylistName()}</b> playlist in your Spotify player, the tracks should be
                  displayed in this same order.  (Be sure to remove any of the column-sorts from the playlist.  Playlists can be sorted by Title, Artist, Album, Added On, or Duration.  If any of these sorts are in place,
                  you will not see the order listed below.)  With the playlist now shuffled, you can simply play the first track, and all subsequent tracks will play in the randomized order shown below.
                  <br/><br/>
                  [NOTE: Ensure that Spotify's native <code>shuffle</code> button is OFF.  This tool was created because Spotify's shuffle functionality sucks.  If you've shuffled your playlist with this tool, and then you
                  start playing the tracks with Spotify's <code>shuffle</code> feature enabled, it defeats the whole purpose of this tool.]
               </div>
               <div style={{
                  fontSize: '0.8em',
                  marginTop: 20,
               }}>
                  {lastShuffleResult}
               </div>
            </Column>
         </Row>
      </>
   );
};