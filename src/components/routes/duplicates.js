import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import { allow } from '../../classes/allow';
import { getDurationFromMilliseconds } from '../../functions/get.duration.from.milliseconds';
import { getPlaylistName } from '../../functions/get.playlist.name';
import { getTrackArtistNames } from '../../functions/get.track.artists';
import { Column } from '../column';
import { LoadingTracksModal } from '../loading.tracks.modal';
import { PlaylistMenu } from '../playlist.menu';
import { Row } from '../row';
import { use } from '../../objects/use';

export const Duplicates = () => {
   const [exactDuplicates, setExactDuplicates] = useState(null);
   const [likelyDuplicates, setLikelyDuplicates] = useState(null);
   const [loadingModalIsOpen, setLoadingModalIsOpen] = useState(false);
   const [noDuplicates, setNoDuplicates] = useState(null);
   const [selectedPlaylistId, setSelectedPlaylistId] = useState('');
   
   const durationTolerance = 8;
   const tdStyle = {padding: '3px 10px 3px 0px'};
   const thStyle = {textAlign: 'left'};
   
   const dedup = () => {
      let exactDuplicatesFound = [];
      let likelyDuplicatesFound = [];
      const tracks = use.playlistsEndpoint.tracks.map(track => track);
      for (let i = 0; i < tracks.length; i++) {
         let originalTrackPushed = false;
         for (let j = i + 1; j < tracks.length; j++) {
            const track1 = tracks[i].track;
            const track2 = tracks[j].track;
            if (track1.id === track2.id) {
               if (!originalTrackPushed) {
                  exactDuplicatesFound.push(track1);
                  originalTrackPushed = true;
               }
               exactDuplicatesFound.push(track2);
               continue;
            }
            if (track1.name.toLowerCase() === track2.name.toLowerCase() && tracksHaveSomeMatchingArtists(track1, track2) && tracksHaveMatchingDuration(track1, track2))
               likelyDuplicatesFound.push([track1, track2]);
         }
      }
      populateExactDuplicates(exactDuplicatesFound);
      populateLikelyDuplicates(likelyDuplicatesFound);
      if (exactDuplicatesFound.length || likelyDuplicatesFound.length)
         setNoDuplicates(null);
      else
         setNoDuplicates(
            <Row style={{marginTop: 20}}>
               <Column xs={12}>
                  <div>
                     These were no potential duplicates found in the <b>{getPlaylistName(selectedPlaylistId)}</b> playlist.
                  </div>
               </Column>
            </Row>
         );
   }
   
   const populateExactDuplicates = (tracks = []) => {
      allow.anArray(tracks);
      if (tracks.length === 0) {
         setExactDuplicates(null);
         return;
      }
      const displayDuplicates = tracks.map((track, index) => {
         const { album, duration_ms } = track;
         return (
            <tr key={track.uri + index}>
               <td style={tdStyle}>{track.name}</td>
               <td style={tdStyle}>{getTrackArtistNames(track)}</td>
               <td style={tdStyle}>{album.name}</td>
               <td style={tdStyle}>{getDurationFromMilliseconds(duration_ms)}</td>
            </tr>
         );
      });
      setExactDuplicates(
         <Row style={{marginTop: 20}}>
            <Column xs={12}>
               <h3>Exact Duplicates</h3>
               <div>
                  These are copies <i>of the exact same track</i> repeated in the <b>{getPlaylistName(selectedPlaylistId)}</b> playlist:
               </div>
               <table style={{marginTop: 20}}>
                  <thead>
                     <tr>
                        <th style={thStyle}>Title</th>
                        <th style={thStyle}>Artist</th>
                        <th style={thStyle}>Album</th>
                        <th style={thStyle}>Time</th>
                     </tr>
                  </thead>
                  <tbody>
                     {displayDuplicates}
                  </tbody>
               </table>
            </Column>
         </Row>
      );
   }
   
   const populateLikelyDuplicates = (pairs = []) => {
      allow.anArray(pairs);
      if (pairs.length === 0) {
         setLikelyDuplicates(null);
         return;
      }
      const duplicateRows = pairs.map(pair => {
         const [track1, track2] = pair;
         const { album: track1Album, duration_ms: track1Duration } = track1;
         const { album: track2Album, duration_ms: track2Duration } = track2;
         return (
            <React.Fragment key={track1.uri + track2.uri}>
               <tr>
                  <td style={tdStyle}>{track1.name}</td>
                  <td style={tdStyle}>{getTrackArtistNames(track1)}</td>
                  <td style={tdStyle}>{track1Album.name}</td>
                  <td style={tdStyle}>{getDurationFromMilliseconds(track1Duration)}</td>
               </tr>
               <tr>
                  <td style={tdStyle}>{track2.name}</td>
                  <td style={tdStyle}>{getTrackArtistNames(track2)}</td>
                  <td style={tdStyle}>{track2Album.name}</td>
                  <td style={tdStyle}>{getDurationFromMilliseconds(track2Duration)}</td>
               </tr>
            </React.Fragment>
         );
      });
      setLikelyDuplicates(
         <Row style={{marginTop: 20}}>
            <Column xs={12}>
               <h3>Likely Duplicates</h3>
               <div>
                  These tracks <i>appear</i> to be the same in the <b>{getPlaylistName(selectedPlaylistId)}</b> playlist:
               </div>
               <table style={{marginTop: 20}}>
                  <thead>
                     <tr>
                        <th style={thStyle}>Title</th>
                        <th style={thStyle}>Artist</th>
                        <th style={thStyle}>Album</th>
                        <th style={thStyle}>Time</th>
                     </tr>
                  </thead>
                  <tbody>
                     {duplicateRows}
                  </tbody>
               </table>
            </Column>
         </Row>
      );
   }
   
   const tracksHaveMatchingDuration = (track1 = {}, track2 = {}) => {
      allow.aPopulatedObject(track1).aPopulatedObject(track2);
      const { duration_ms: track1Duration } = track1;
      const { duration_ms: track2Duration } = track2;
      const track1Seconds = Math.floor(track1Duration / 1000);
      const track2Seconds = Math.floor(track2Duration / 1000);
      return track2Seconds <= track1Seconds + durationTolerance && track2Seconds >= track1Seconds - durationTolerance;
   }
   
   const tracksHaveSomeMatchingArtists = (track1 = {}, track2 = {}) => {
      allow.aPopulatedObject(track1).aPopulatedObject(track2);
      const { artists: artists1 } = track1;
      const { artists: artists2 } = track2;
      let matchFound = false;
      artists1.forEach(artist1 => {
         artists2.forEach(artist2 => {
            if (artist1.id === artist2.id || artist1.name.toLowerCase() === artist2.name.toLowerCase())
               matchFound = true;
         });
      });
      return matchFound;
   }
   
   const updateSelectedPlaylist = (event = {}) => {
      allow.aPopulatedObject(event);
      const playlistId = event.target.value;
      if (playlistId !== '')
         use.playlistsEndpoint.getTracks(playlistId);
      setLoadingModalIsOpen(playlistId !== '');
      setSelectedPlaylistId(playlistId);
      setExactDuplicates(null);
      setLikelyDuplicates(null);
      setNoDuplicates(null);
      use.global.updatePlaylistTracksLoaded(false);
   }
   
   return (
      <>
         <LoadingTracksModal open={loadingModalIsOpen && !use.global.playlistTracksLoaded}/>
         <h1 style={{marginTop: 0}}>Find Duplicate Tracks In A Playlist</h1>
         <Row>
            <Column xs={12} sm={10} md={8} lg={6} xl={4}>
               <PlaylistMenu
                  label={'Find Duplicates in This Playlist'}
                  onChange={updateSelectedPlaylist}
                  value={selectedPlaylistId}
               />
            </Column>
         </Row>
         <Row style={{marginTop: 20}}>
            <Column xs={12}>
               <Button
                  disabled={!use.global.playlistTracksLoaded || selectedPlaylistId === ''}
                  onClick={dedup}
                  variant={'outlined'}
               >
                  Find
               </Button>
            </Column>
         </Row>
         {exactDuplicates}
         {likelyDuplicates}
         {noDuplicates}
      </>
   );
}