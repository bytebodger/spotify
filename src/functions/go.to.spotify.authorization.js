import base64url from 'base64url';
import crypto from "crypto";
import { use } from '../objects/use';
import { createGuid } from './create.guid';
import { getRedirectUri } from './get.redirect.uri';

export const goToSpotifyAuthorization = () => {
   const scopes = [
      'playlist-modify-public',
      'playlist-modify-private',
      'user-modify-playback-state',
      'user-read-playback-state',
   ];
   const codeVerifier = createGuid(43);
   use.global.updateCodeVerifier(codeVerifier);
   const newHash = crypto.createHash('sha256').update(codeVerifier).digest();
   const codeChallenge = base64url.encode(newHash);
   window.location.href = 'https://accounts.spotify.com/authorize'
      + `?client_id=${use.global.clientId}`
      + `&code_challenge=${codeChallenge}`
      + '&code_challenge_method=S256'
      + '&response_type=code'
      + `&redirect_uri=${encodeURIComponent(getRedirectUri() + '/home')}`
      + `&scope=${scopes.join(' ')}`
      + `&state=${use.global.state}`
   ;
}