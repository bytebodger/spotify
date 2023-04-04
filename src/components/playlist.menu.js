import * as PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import Select from '@material-ui/core/Select';
import { allow } from '../classes/allow';
import { playlistModel } from '../objects/models/playlist.model';
import { use } from '../objects/use';

export const PlaylistMenu = props => {
   const comparePlaylists = (playlist1 = playlistModel, playlist2 = playlistModel) => {
      allow.anInstanceOf(playlist1, playlistModel).anInstanceOf(playlist2, playlistModel);
      if (playlist1.name.toLowerCase() < playlist2.name.toLowerCase())
         return -1;
      else if (playlist1.name.toLowerCase() > playlist2.name.toLowerCase())
         return 1;
      else
         return 0;
   };
   
   const getMenuItems = () => {
      let menuItems = [];
      const filteredPlaylists = use.playlistsEndpoint.playlists.filter(playlist => {
         return !playlist.name.toLowerCase().includes('shazam')
            && !playlist.name.toLowerCase().includes('rejected')
            && !playlist.name.toLowerCase().includes('playlist help')
            && playlist.tracks.total > 1;
      });
      filteredPlaylists.sort(comparePlaylists);
      filteredPlaylists.forEach(playlist => menuItems.push(
         <MenuItem
            key={playlist.id}
            selected={playlist.id === props.value}
            value={playlist.id}
         >
            {playlist.name}
         </MenuItem>
      ));
      return menuItems;
   };
   
   return (
      <FormControl
         style={{width: '100%'}}
         variant={'outlined'}
      >
         <InputLabel>{props.label}</InputLabel>
         <Select
            label={props.label}
            onChange={props.onChange}
            value={props.value}
         >
            <MenuItem value={''}>&nbsp;</MenuItem>
            {getMenuItems()}
         </Select>
      </FormControl>
   );
}

PlaylistMenu.propTypes = {
   label: PropTypes.string.isRequired,
   onChange: PropTypes.func.isRequired,
   value: PropTypes.any.isRequired,
}