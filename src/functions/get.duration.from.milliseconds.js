import { allow } from '../classes/allow';
import { is } from '../objects/is';

export const getDurationFromMilliseconds = (duration = 0) => {
   allow.anInteger(duration, is.positive);
   const minutes = Math.floor((duration / 1000) / 60);
   let seconds = Math.floor(duration / 1000) % 60;
   if (seconds < 10)
      seconds = '0' + seconds;
   return `${minutes}:${seconds}`;
}