import { getCurrentTimeInSeconds } from './get.current.time.in.seconds';
import { logOut } from './log.out';
import { use } from '../objects/use';

export const checkLoginStatus = () => {
   if (!use.global.isLoggedIn)
      return;
   const now = getCurrentTimeInSeconds();
   if (now > use.global.accessTokenExpiresOn)
      logOut();
}