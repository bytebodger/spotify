import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import { allow } from '../../classes/allow';
import { css } from '../../objects/css';
import { Column } from '../column';
import { eventModel } from '../../objects/models/event.model';
import { getDurationFromMilliseconds } from '../../functions/get.duration.from.milliseconds';
import { getPlaylistName } from '../../functions/get.playlist.name';
import { getTrackArtistNames } from '../../functions/get.track.artists';
import { LoadingTracksModal } from '../loading.tracks.modal';
import { PlaylistMenu } from '../playlist.menu';
import { Row } from '../row';
import { trackModel } from '../../objects/models/track.model';
import { tracksAreLikelyDuplicates } from '../../functions/tracks.are.likely.duplicates';
import { use } from '../../objects/use';
import { useConstructor } from '../../hooks/use.constructor';
import { logGooglePageHit } from '../../functions/log.google.page.hit';
import spotifyIcon from '../../images/spotify-icon.svg';

export const Duplicates = () => {
   const [exactDuplicates, setExactDuplicates] = useState(null);
   const [likelyDuplicates, setLikelyDuplicates] = useState(null);
   const [loadingModalIsOpen, setLoadingModalIsOpen] = useState(false);
   const [noDuplicates, setNoDuplicates] = useState(null);
   const [selectedPlaylistId, setSelectedPlaylistId] = useState('');
   
   const tdStyle = {padding: '3px 10px 3px 0px'};
   const thStyle = {textAlign: css.textAlign.left};
   
   useConstructor(() => logGooglePageHit('Duplicates'));
   
   const dedup = () => {
      let exactDuplicatesFound = [];
      let likelyDuplicatesFound = [];
      const tracks = [...use.playlistsEndpoint.tracks];
      for (let i = 0; i < tracks.length; i++) {
         let originalTrackPushed = false;
         for (let j = i + 1; j < tracks.length; j++) {
            const track1 = tracks[i];
            const track2 = tracks[j];
            if (track1.id === track2.id) {
               if (!originalTrackPushed) {
                  exactDuplicatesFound.push(track1);
                  originalTrackPushed = true;
               }
               exactDuplicatesFound.push(track2);
               continue;
            }
            if (tracksAreLikelyDuplicates(track1, track2))
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
   
   const getTableHead = () => {
      return (
         <thead>
            <tr>
               <th/>
               <th style={thStyle}>Title</th>
               <th style={thStyle}>Artist</th>
               <th style={thStyle}>Album</th>
               <th style={thStyle}>Time</th>
            </tr>
         </thead>
      );
   }
   
   const populateExactDuplicates = (tracks = [trackModel]) => {
      allow.anArrayOfInstances(tracks, trackModel);
      if (tracks.length === 0) {
         setExactDuplicates(null);
         return;
      }
      const displayDuplicates = tracks.map((track, index) => {
         return (
            <tr key={track.uri + index}>
                  <td>
                     <img
                        alt={'Spotify Icon'}
                        height={21}
                        src={spotifyIcon}
                        width={21}
                     />
                  </td>
                  <td style={tdStyle}>
                     <a
                        href={track.external_urls.spotify}
                        rel={'noopener noreferrer'}
                        target={'_blank'}
                     >
                        {track.name}
                     </a>
                  </td>
                  <td style={tdStyle}>
                     <a
                        href={track.external_urls.spotify}
                        rel={'noopener noreferrer'}
                        target={'_blank'}
                     >
                        {getTrackArtistNames(track)}
                     </a>
                  </td>
                  <td style={tdStyle}>
                     <a
                        href={track.external_urls.spotify}
                        rel={'noopener noreferrer'}
                        target={'_blank'}
                     >
                        {track.album.name}
                     </a>
                  </td>
                  <td style={tdStyle}>
                     <a
                        href={track.external_urls.spotify}
                        rel={'noopener noreferrer'}
                        target={'_blank'}
                     >
                        {getDurationFromMilliseconds(track.duration_ms)}
                     </a>
                  </td>
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
                  {getTableHead()}
                  <tbody>
                     {displayDuplicates}
                  </tbody>
               </table>
            </Column>
         </Row>
      );
   }
   
   const populateLikelyDuplicates = (pairs = [[]]) => {
      allow.anArrayOfArrays(pairs);
      if (pairs.length === 0) {
         setLikelyDuplicates(null);
         return;
      }
      const duplicateRows = pairs.map(pair => {
         const [track1, track2] = pair;
         return (
            <React.Fragment key={track1.uri + track2.uri}>
               <tr>
                  <td>
                     <img
                        alt={'Spotify Icon'}
                        height={21}
                        src={spotifyIcon}
                        width={21}
                     />
                  </td>
                  <td style={tdStyle}>
                     <a
                        href={track1.external_urls.spotify}
                        rel={'noopener noreferrer'}
                        target={'_blank'}
                     >
                        {track1.name}
                     </a>
                  </td>
                  <td style={tdStyle}>
                     <a
                        href={track1.external_urls.spotify}
                        rel={'noopener noreferrer'}
                        target={'_blank'}
                     >
                        {getTrackArtistNames(track1)}
                     </a>
                  </td>
                  <td style={tdStyle}>
                     <a
                        href={track1.external_urls.spotify}
                        rel={'noopener noreferrer'}
                        target={'_blank'}
                     >
                        {track1.album.name}
                     </a>
                  </td>
                  <td style={tdStyle}>
                     <a
                        href={track1.external_urls.spotify}
                        rel={'noopener noreferrer'}
                        target={'_blank'}
                     >
                        {getDurationFromMilliseconds(track1.duration_ms)}
                     </a>
                  </td>
               </tr>
               <tr>
                  <td>
                     <img
                        alt={'Spotify Icon'}
                        height={21}
                        src={spotifyIcon}
                        width={21}
                     />
                  </td>
                  <td style={tdStyle}>
                     <a
                        href={track2.external_urls.spotify}
                        rel={'noopener noreferrer'}
                        target={'_blank'}
                     >
                        {track2.name}
                     </a>
                  </td>
                  <td style={tdStyle}>
                     <a
                        href={track2.external_urls.spotify}
                        rel={'noopener noreferrer'}
                        target={'_blank'}
                     >
                        {getTrackArtistNames(track2)}
                     </a>
                  </td>
                  <td style={tdStyle}>
                     <a
                        href={track2.external_urls.spotify}
                        rel={'noopener noreferrer'}
                        target={'_blank'}
                     >
                        {track2.album.name}
                     </a>
                  </td>
                  <td style={tdStyle}>
                     <a
                        href={track2.external_urls.spotify}
                        rel={'noopener noreferrer'}
                        target={'_blank'}
                     >
                        {getDurationFromMilliseconds(track2.duration_ms)}
                     </a>
                  </td>
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
                  {getTableHead()}
                  <tbody>
                     {duplicateRows}
                  </tbody>
               </table>
            </Column>
         </Row>
      );
   }

   const updateSelectedPlaylist = (event = eventModel) => {
      allow.anInstanceOf(event, eventModel);
      const playlistId = event.target.value;
      if (playlistId !== '')
         use.playlistsEndpoint.getTracks(playlistId, 0, []);
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