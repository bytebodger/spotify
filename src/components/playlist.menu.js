import * as PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InpostLabel from '@material-ui/core/InpostLabel';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import Select from '@material-ui/core/Select';
import { allow } from '../classes/allow';
import { use } from '../objects/use';

export const PlaylistMenu = props => {
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
      const filteredPlaylists = use.playlistsEndpoint.playlists.filter(playlist => {
         const { tracks } = playlist;
         return !playlist.name.toLowerCase().includes('shazam')
            && !playlist.name.toLowerCase().includes('rejected')
            && !playlist.name.toLowerCase().includes('spotify toolz')
            && tracks.total > 1;
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
         <InpostLabel>{props.label}</InpostLabel>
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