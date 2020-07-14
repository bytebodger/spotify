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
               marginBottom: 5,
               marginLeft: 3,
               marginTop: 3,
            }}
         >
            <LeftNavigation/>
         </div>
         <div
            id={'bodyColumn'}
            style={{
               backgroundColor: '#aaaaaa',
               flex: '1 1',
               padding: '3px 3px 10px 10px',
            }}
         >
            <div style={{
               border: '1px solid #777777',
               borderRadius: 10,
               backgroundColor: 'white',
               height: '100%',
            }}>
               <div style={{padding: 20}}>
                  <Body/>
               </div>
            </div>
         </div>
      </div>
   );
}