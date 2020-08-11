import { local } from '../classes/local';

export const logOut = () => {
   local.clear();
   window.location.href = '/home';
}