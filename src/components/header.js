import React from 'react';
import { use } from '../objects/use';
import { Column } from './column';
import { Row } from './row';

export const Header = () => {
   const getLoggedInAs = () => {
      if (!use.global.isLoggedIn)
         return 'Logged Out';
      const { display_name } = use.meEndpoint.me;
      return `Logged in as: ${display_name}`;
   }
   
   return (
      <Row style={{
         backgroundColor: '#aaaaaa',
         paddingLeft: 2,
         paddingRight: 2,
         paddingTop: 2,
      }}>
         <Column
            xs={12}
            style={{
               backgroundColor: 'darkslateblue',
               borderRadius: 10,
               color: '#eeeeee',
               fontWeight: 'bold',
               height: 50,
               padding: 10,
            }}
         >
            Spotify Toolz
            <div style={{float: 'right'}}>
               {getLoggedInAs()}
            </div>
         </Column>
      </Row>
   );
}