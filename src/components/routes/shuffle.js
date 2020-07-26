import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import { allow } from '../../classes/allow';
import { eventModel } from '../../objects/models/event.model';
import { Column } from '../column';
import { getRandomizedTracks } from '../../functions/get.randomized.tracks';
import { getTrackArtistNames } from '../../functions/get.track.artists';
import { is } from '../../objects/is';
import { LoadingTracksModal } from '../loading.tracks.modal';
import { PlaylistMenu } from '../playlist.menu';
import { Row } from '../row';
import { trackModel } from '../../objects/models/track.model';
import { use } from '../../objects/use';

export const Shuffle = () => {
   const [lastShuffleResult, setLastShuffleResult] = useState([]);
   const [loadingModalIsOpen, setLoadingModalIsOpen] = useState(false);
   const [selectedPlaylistId, setSelectedPlaylistId] = useState('');
   
   const addTracks = (batches = []) => {
      allow.anArrayOfArrays(batches, is.not.empty);
      const batch = batches.shift();
      use.playlistsEndpoint.addTracks(selectedPlaylistId, batch);
      if (batches.length > 0)
         setTimeout(() => addTracks(batches), use.global.consecutiveApiDelay);
   }
   
   const getPlaylistName = () => {
      const playlist = use.playlistsEndpoint.playlists.find(playlist => playlist.id === selectedPlaylistId);
      return playlist ? playlist.name : '';
   }
   
   const getTrackDescription = (track = trackModel, index = -1) => {
      allow.anInstanceOf(track, trackModel).anInteger(index, is.not.negative);
      return (
         <div key={track.id + index}>
            {index + 1}. {track.name} by {getTrackArtistNames(track)}
         </div>
      );
   }
   
   const rebuildPlaylist = (batches = []) => {
      allow.anArrayOfArrays(batches, is.not.empty);
      const firstBatch = batches.shift();
      use.playlistsEndpoint.replaceTracks(selectedPlaylistId, firstBatch)
         .then(() => {
            if (batches.length > 0)
               setTimeout(() => addTracks(batches), use.global.consecutiveApiDelay);
         });
   }

   const updateSelectedPlaylist = (event = eventModel) => {
      allow.anInstanceOf(event, eventModel);
      const playlistId = event.target.value;
      if (playlistId !== '')
         use.playlistsEndpoint.getTracks(playlistId);
      setLoadingModalIsOpen(playlistId !== '');
      setSelectedPlaylistId(playlistId);
      setLastShuffleResult([]);
      use.global.updatePlaylistTracksLoaded(false);
   }
   
   const updateTracks = (tracks = []) => {
      allow.anArrayOfObjects(tracks, is.not.empty);
      let currentBatch = [];
      let uriBatches = [];
      let display = [];
      tracks.forEach((track, index) => {
         display.push(getTrackDescription(track, index));
         currentBatch.push(track.uri);
         if (index > 0 && (((index + 1) % 100) === 0 || (index + 1) === tracks.length)) {
            uriBatches.push(currentBatch);
            currentBatch = [];
         }
      });
      rebuildPlaylist(uriBatches);
      setLastShuffleResult(display);
   }

   return (
      <>
         <LoadingTracksModal open={loadingModalIsOpen && !use.global.playlistTracksLoaded}/>
         <h1 style={{marginTop: 0}}>Shuffle The Tracks In A Playlist</h1>
         <Row>
            <Column xs={12} sm={10} md={8} lg={6} xl={4}>
               <PlaylistMenu
                  label={'Playlist to be Shuffled'}
                  onChange={updateSelectedPlaylist}
                  value={selectedPlaylistId}
               />
            </Column>
         </Row>
         <Row style={{marginTop: 20}}>
            <Column xs={12}>
               <Button
                  disabled={!use.global.playlistTracksLoaded || selectedPlaylistId === ''}
                  onClick={() => updateTracks(getRandomizedTracks())}
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