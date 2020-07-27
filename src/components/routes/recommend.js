import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import { allow } from '../../classes/allow';
import { eventModel } from '../../objects/models/event.model';
import { Column } from '../column';
import { getRandomizedTracks } from '../../functions/get.randomized.tracks';
import { getTrackArtistNames } from '../../functions/get.track.artists';
import { is } from '../../objects/is';
import { LoadingTracksModal } from '../loading.tracks.modal';
import { local } from '../../classes/local';
import { PlaylistMenu } from '../playlist.menu';
import { Row } from '../row';
import { trackModel } from '../../objects/models/track.model';
import { tracksAreLikelyDuplicates } from '../../functions/tracks.are.likely.duplicates';
import { use } from '../../objects/use';

export const Recommend = () => {
   const [loadingModalIsOpen, setLoadingModalIsOpen] = useState(false);
   const [displayedRecommendations, setDisplayedRecommendations] = useState([]);
   const [selectedPlaylistId, setSelectedPlaylistId] = useState('');
   
   const checkRecommendationPlaylist = (recommendations = [trackModel]) => {
      allow.anArrayOfInstances(recommendations, trackModel);
      if (!use.playlistsEndpoint.recommendationPlaylistExists)
         use.usersEndpoint.createPlaylist('Spotify Toolz Recommendations')
            .then(response => {
               use.playlistsEndpoint.addPlaylist(response.data);
               use.playlistsEndpoint.updateRecommendationPlaylistExists(true);
               saveRecommendations(response.data.id, recommendations);
            });
      else {
         const playlists = local.getItem('playlists', []);
         const recommendationPlaylist = playlists.find(playlist => playlist.name === 'Spotify Toolz Recommendations');
         saveRecommendations(recommendationPlaylist.id, recommendations);
      }
   }
   
   const getRecommendations = (seedBatches = [[]], allRecommendations = [trackModel]) => {
      allow.anArrayOfArrays(seedBatches).anArrayOfInstances(allRecommendations, trackModel);
      const seedBatch = seedBatches.shift();
      use.recommendationsEndpoint.getRecommendations(seedBatch)
         .then(response => {
            response.data.tracks.forEach(recommendedTrack => {
               if (
                  allRecommendations.length === 100
                  || trackExistsInList(recommendedTrack, use.playlistsEndpoint.tracks)
                  || trackExistsInList(recommendedTrack, allRecommendations)
               )
                  return;
               allRecommendations.push(recommendedTrack);
            });
            if (allRecommendations.length < 100 && seedBatches.length > 0)
               getRecommendations(seedBatches, allRecommendations);
            else {
               setDisplayedRecommendations(allRecommendations);
               checkRecommendationPlaylist(allRecommendations);
            }
         });
   }
   
   const trackExistsInList = (track = trackModel, list = [trackModel]) => {
      allow.anInstanceOf(track, trackModel).anArrayOfInstances(list, trackModel);
      return list.some(item => item.id === track.id || tracksAreLikelyDuplicates(item, track));
   }
   
   const getRecommendationsDisplay = () => {
      if (displayedRecommendations.length === 0)
         return null;
      let numberedRecommendations = [];
      displayedRecommendations.forEach((recommendation, index) => {
         numberedRecommendations.push(
            <div key={recommendation.id}>
               {index + 1}. {recommendation.name} by {getTrackArtistNames(recommendation)}
            </div>
         );
      });
      return (
         <Row style={{marginTop: 20}}>
            <Column xs={12}>
               <div style={{display: displayedRecommendations.length ? 'block' : 'none'}}>
                  You should now have a playlist called <b>Spotify Toolz Recommendations</b>.  The playlist will have the tracks listed below.<br/><br/>
                  [NOTE: It's possible that <i>some</i> of the tracks seen below will not be in your <b>Spotify Toolz Recommendations</b> playlist.  Certain tracks are only available in specific countries.]
               </div>
               <div style={{
                  fontSize: '0.8em',
                  marginTop: 20,
               }}>
                  {numberedRecommendations}
               </div>
            </Column>
         </Row>
      );
   }
   
   const recommend = () => {
      let seedBatches = [];
      let seedBatch = [];
      const tracks = getRandomizedTracks();
      tracks.forEach((track, index) => {
         seedBatch.push(track.id);
         if (index > 0 && (((index + 1) % 5) === 0 || (index + 1) === tracks.length)) {
            seedBatches.push(seedBatch);
            seedBatch = [];
         }
      });
      getRecommendations(seedBatches, []);
   }
   
   const saveRecommendations = (playlistId = '', recommendations = [trackModel]) => {
      allow.aString(playlistId, is.not.empty).anArrayOfInstances(recommendations, trackModel);
      if (recommendations.length === 0)
         return;
      const uris = recommendations.map(recommendation => recommendation.uri);
      use.playlistsEndpoint.replaceTracks(playlistId, uris);
   }
   
   const updateSelectedPlaylist = (event = eventModel) => {
      allow.anInstanceOf(event, eventModel);
      setDisplayedRecommendations([]);
      const playlistId = event.target.value;
      if (playlistId !== '')
         use.playlistsEndpoint.getTracks(playlistId, 0, []);
      setLoadingModalIsOpen(playlistId !== '');
      setSelectedPlaylistId(playlistId);
      use.global.updatePlaylistTracksLoaded(false);
   }

   return (
      <>
         <LoadingTracksModal open={loadingModalIsOpen && !use.global.playlistTracksLoaded}/>
         <h1 style={{marginTop: 0}}>Get Recommendations For New Music</h1>
         <Row>
            <Column xs={12} sm={10} md={8} lg={6} xl={4}>
               <PlaylistMenu
                  label={'Find Music Similar to This Playlist'}
                  onChange={updateSelectedPlaylist}
                  value={selectedPlaylistId}
               />
            </Column>
         </Row>
         <Row style={{marginTop: 20}}>
            <Column xs={12}>
               <Button
                  disabled={!use.global.playlistTracksLoaded || selectedPlaylistId === ''}
                  onClick={recommend}
                  variant={'outlined'}
               >
                  Recommend
               </Button>
            </Column>
         </Row>
         {getRecommendationsDisplay()}
      </>
   );
}