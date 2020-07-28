import { allow } from '../classes/allow';
import { is } from '../objects/is';

export const createGuid = (length = 32) => {
   allow.anInteger(length, is.positive);
   let guid = '';
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