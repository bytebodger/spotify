import React from 'react';
import { Body } from './body';
import { LeftNavigation } from './left.navigation';

export const FlexShell = () => {
   return (
      <div
         id={'row'}
         style={{
            backgroundColor: '#aaaaaa',
            display: 'flex',
            flex: 2,
         }}
      >
         <div
            id={'navColumn'}
            style={{
               borderRadius: 10,
               flex: '0 0 200px',
               marginBottom: 20,
               marginLeft: 70,
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
               padding: '5px 50px 20px 10px',
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