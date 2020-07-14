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
   const [selectedPlaylistId, setSelectedPlaylistId] = useState('');
   
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
            && tracks.total > 1
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
   
   const shuffle = () => {
      let tracks =  cloneArray(use.playlistsApi.tracks);
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
      if (playlistId !== '')
         use.playlistsApi.getTracks(playlistId);
   }
   
   const updateTracks = (tracks = []) => {
      allow.aPopulatedArray(tracks);
      let currentBatch = [];
      for (let i = 0; i < tracks.length; i++) {
         if ((i % 100) === 0)
            currentBatch = [];
         currentBatch.push(tracks[i].track.uri);
         if (i === 99 || (i < 99 && i === tracks.length - 1))
            use.playlistsApi.replaceTracks(selectedPlaylistId, currentBatch);
      }
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
                  disabled={selectedPlaylistId === ''}
                  onClick={shuffle}
                  variant={'outlined'}
               >
                  Shuffle
               </Button>
            </Column>
         </Row>
      </>
   );
};