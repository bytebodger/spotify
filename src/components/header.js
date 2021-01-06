import React from 'react';
import { css } from '../objects/css';
import { Column } from './column';
import { Row } from './row';
import { use } from '../objects/use';
import { translate } from '../functions/translate';

export const Header = () => {
   const getLoggedInAs = () => {
      if (!use.global.isLoggedIn)
         return translate('Logged Out');
      const { display_name } = use.meEndpoint.me;
      return `Logged in as: ${display_name}`;
   }
   
   return (
      <Row style={{
         backgroundColor: '#aaaaaa',
         minWidth: 600,
         paddingLeft: 'calc(10%)',
         paddingRight: 'calc(10%)',
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
            <span style={{fontSize: '1.3em'}}>Spotify Toolz</span>
            <div style={{
               float: css.float.right,
               fontSize: '0.9em',
               paddingTop: 4,
            }}>
               {getLoggedInAs()}
            </div>
         </Column>
      </Row>
   );
}