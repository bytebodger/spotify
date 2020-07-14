import { allow } from '../classes/allow';

export const createGuid = (length = 32) => {
   allow.aPositiveInteger(length);
   let guid = '';
   if (length < 1)
      length = 32;
   const alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'W', 'X', 'Y', 'Z'];
   const alphanumeric = alpha.concat(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
   for (let i = 0; i < length; i++) {
      if (i === 0) {
         let randomNumber = Math.floor(Math.random() * 25);
         guid += alpha[randomNumber];
      } else {
         let randomNumber = Math.floor(Math.random() * 35);
         guid += alphanumeric[randomNumber];
      }
   }
   return guid;
}