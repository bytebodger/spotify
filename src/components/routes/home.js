import Button from '@material-ui/core/Button';
import React from 'react';
import { goToSpotifyAuthorization } from '../../functions/go.to.spotify.authorization';
import { use } from '../../objects/use';

export const Home = () => {
   const getLoginButton = () => {
      if (use.global.isLoggedIn)
         return null;
      return (
         <Button
            onClick={goToSpotifyAuthorization}
            variant={'outlined'}
         >
            Log In
         </Button>
      );
   }
   
   return (
      <>
         <h1 style={{marginTop: 0}}>Better Toolz For Spotify</h1>
         <p>
            Spotify is an amazing service.  Its music player is... not always so amazing.  Spotify's customer support is... unsupportive.  Luckily, they publish an API that allows developers like me
            to make up for some of their shortcomings.  These are some utilities that allow you to extend its (at times, frustrating) functionality.
         </p>
         {getLoginButton()}
      </>
   );
}