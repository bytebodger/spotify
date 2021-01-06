import React from 'react';
import { Body } from './body';
import { css } from '../objects/css';
import { LeftNavigation } from './left.navigation';

export const FlexShell = () => {
   return (
      <div
         id={'row'}
         style={{
            backgroundColor: '#aaaaaa',
            display: css.display.flex,
            flex: 2,
            minWidth: 600,
         }}
      >
         <div
            id={'navColumn'}
            style={{
               borderRadius: 10,
               flex: '0 0 150px',
               marginBottom: 20,
               marginLeft: 'calc(10%)',
               marginTop: 5,
            }}
         >
            <LeftNavigation/>
         </div>
         <div
            id={'bodyColumn'}
            style={{
               backgroundColor: '#aaaaaa',
               flex: '1 1',
               padding: '5px calc(10%) 20px 10px',
            }}
         >
            <div style={{
               border: '1px solid #777777',
               borderRadius: 10,
               backgroundColor: 'white',
               height: '100%',
            }}>
               <Body/>
            </div>
         </div>
      </div>
   );
}