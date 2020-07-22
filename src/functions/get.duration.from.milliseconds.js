import { allow } from '../classes/allow';

export const getDurationFromMilliseconds = (duration = 0) => {
   allow.aPositiveInteger(duration);
   const minutes = Math.floor((duration / 1000) / 60);
   let seconds = Math.floor(duration / 1000) % 60;
   if (seconds < 10)
      seconds = '0' + seconds;
   return `${minutes}:${seconds}`;
}