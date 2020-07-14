import React from 'react';
import { use } from '../../objects/use';

export const Error = () => {
   return (
      <>
         The following error was returned from Spotify:<br/><br/>
         {use.global.error}
      </>
   );
}