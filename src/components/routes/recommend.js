import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import { allow } from '../../classes/allow';
import { cloneArray } from '../../functions/clone.array';
import { Column } from '../column';
import { getRandomizedTracks } from '../../functions/get.randomized.tracks';
import { LoadingTracksModal } from '../loading.tracks.modal';
import { PlaylistMenu } from '../playlist.menu';
import { Row } from '../row';
import { use } from '../../objects/use';

export const Recommend = () => {
   const [loadingModalIsOpen, setLoadingModalIsOpen] = useState(false);
   const [recommendations, setRecommendations] = useState([]);
   const [selectedPlaylistId, setSelectedPlaylistId] = useState('');
   
   const getRecommendations = (seedBatches = [], allRecommendations = []) => {
      allow.anArray(seedBatches).anArray(allRecommendations);
      const seedBatch = seedBatches.shift();
      use.recommendationsEndpoint.getRecommendations(seedBatch)
         .then(response => {
            response.data.tracks.forEach(recommendedTrack => {
               if (allRecommendations.length === 100)
                  return;
               const trackIsAlreadyInPlaylist = use.playlistsEndpoint.tracks.some(existingTrack => existingTrack.track.id === recommendedTrack.id);
               if (trackIsAlreadyInPlaylist)
                  return;
               const trackIsAlreadyInRecommendations = allRecommendations.some(previouslyRecommendedTrack => previouslyRecommendedTrack.id === recommendedTrack.id);
               if (trackIsAlreadyInRecommendations)
                  return;
               allRecommendations.push(recommendedTrack);
            });
            if (allRecommendations.length < 100 && seedBatches.length > 0)
               getRecommendations(seedBatches, allRecommendations);
            else
               console.log(allRecommendations);
         });
   }
   
   const recommend = () => {
      let seedBatches = [];
      let seedBatch = [];
      const tracks = getRandomizedTracks();
      tracks.forEach((track, index) => {
         seedBatch.push(track.track.id);
         if (index > 0 && (((index + 1) % 5) === 0 || (index + 1) === tracks.length)) {
            seedBatches.push(cloneArray(seedBatch));
            seedBatch = [];
         }
      });
      getRecommendations(seedBatches, []);
   }
   
   const updateSelectedPlaylist = (event = {}) => {
      allow.aPopulatedObject(event);
      const playlistId = event.target.value;
      if (playlistId !== '')
         use.playlistsEndpoint.getTracks(playlistId);
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
      </>
   );
}