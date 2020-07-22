import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import { allow } from '../../classes/allow';
import { use } from '../../objects/use';
import { Column } from '../column';
import { PlaylistMenu } from '../playlist.menu';
import { Row } from '../row';

export const Recommend = () => {
   const [selectedPlaylistId, setSelectedPlaylistId] = useState('');
   
   const getRecommendations = () => {
   
   }
   
   const updateSelectedPlaylist = (event = {}) => {
      allow.aPopulatedObject(event);
      const playlistId = event.target.value;
      setSelectedPlaylistId(playlistId);
      use.global.updatePlaylistTracksLoaded(false);
      if (playlistId !== '')
         use.playlistsApi.getTracks(playlistId);
   }

   return (
      <>
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
                  onClick={getRecommendations}
                  variant={'outlined'}
               >
                  Recommend
               </Button>
            </Column>
         </Row>
      </>
   );
}