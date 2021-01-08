import React from 'react';
import { Body } from './body';
import { css } from '../objects/css';
import { LeftNavigation } from './left.navigation';

export const FlexShell = () => {
   return (
      <div
         id={'row'}
         style={{
            display: css.display.flex,
            flex: 2,
            minWidth: 600,
            paddingLeft: 'calc(15% - 50px)',
            paddingRight: 'calc(15% - 50px)',
         }}
      >
         <div
            id={'navColumn'}
            style={{
               borderRadius: 10,
               flex: '0 0 150px',
               marginBottom: 20,
               marginTop: 5,
            }}
         >
            <LeftNavigation/>
         </div>
         <div
            id={'bodyColumn'}
            style={{
               flex: '1 1',
               padding: '5px 0px 20px 10px',
            }}
         >
            <div style={{
               backgroundColor: 'white',
               border: '1px solid #777777',
               borderRadius: 10,
               height: '100%',
            }}>
               <Body/>
            </div>
         </div>
      </div>
   );
}