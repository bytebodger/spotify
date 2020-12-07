import Button from '@material-ui/core/Button';
import React from 'react';
import { goToSpotifyAuthorization } from '../../functions/go.to.spotify.authorization';
import { use } from '../../objects/use';
import { Column } from '../column';
import { Row } from '../row';

export const Home = () => {
   const getLoginButton = () => {
      if (use.global.isLoggedIn)
         return null;
      return (
         <Button
            onClick={goToSpotifyAuthorization}
            style={{marginTop: 20}}
            variant={'outlined'}
         >
            Log In
         </Button>
      );
   }
   
   return (
      <>
         <h1 style={{marginTop: 0}}>Better Toolz For Spotify</h1>
         <Row>
            <Column xs={12} sm={10} md={8} lg={6} xl={4}>
               <p>
                  Spotify is an amazing service.  Its music player is... not always so amazing.  And Spotify's customer support is often... unsupportive.  Luckily, they publish an API that allows developers like me
                  to make up for some of their shortcomings.  Spotify Toolz has some utilities that allow you to extend Spotify's (at times, frustrating) functionality.  Once you've logged in, you'll be able to use
                  the following features:
               </p>
               <ol>
                  <li><b>Playlist Shuffling:</b> This is not Spotify's <i>faux-random</i>, heavily-weighted shuffle.  This is <i>true</i> shuffling.  <i>Randomized</i> shuffling.</li>
                  <br/>
                  <li><b>De-dup'ing of Playlists:</b> Do you find yourself accidentally repeating tracks in a playlist?  This tool will highlight the exact duplicates, and the <i>probable</i> duplicates, that are
                  lurking in your playlists.</li>
                  <br/>
                  <li><b>Advanced Music Discovery:</b> Spotify's "Recommended Songs" feature has a disturbing tendency to keep regurgiting the same, tired recommendations that you've already rejected.  This tool
                  will provide a much richer set of recommended tracks.</li>
               </ol>
               
            </Column>
         </Row>
         {getLoginButton()}
         <br/><br/>adam.davis@hashverify.com
      </>
   );
}