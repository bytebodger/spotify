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
      <div style={{
         paddingLeft: 2,
         paddingRight: 2,
      }}>
         <Row style={{
            minWidth: 600,
            paddingLeft: 'calc(15% - 50px)',
            paddingRight: 'calc(15% - 50px)',
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
               <span style={{fontSize: '1.3em'}}>playlist.help</span>
               <div style={{
                  float: css.float.right,
                  fontSize: '0.9em',
                  paddingTop: 4,
               }}>
                  {getLoggedInAs()}
               </div>
            </Column>
         </Row>
      </div>
   );
}