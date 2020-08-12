import React from 'react';
import { css } from '../objects/css';
import { Column } from './column';
import { Row } from './row';
import { use } from '../objects/use';

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
         paddingLeft: 50,
         paddingRight: 50,
         paddingTop: 10,
      }}>
         <Column
            xs={12}
            style={{
               backgroundColor: 'darkslateblue',
               borderRadius: 10,
               color: '#eeeeee',
               fontWeight: css.fontWeight.bold,
               height: 50,
               padding: 10,
            }}
         >
            Spotify Toolz
            <div style={{float: css.float.right}}>
               {getLoggedInAs()}
            </div>
         </Column>
      </Row>
   );
}