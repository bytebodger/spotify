import { allow } from '../classes/allow';

export const callFunctionRepeatedly = (callBack = () => {}, delayInSeconds = 60) => {
   allow.aFunction(callBack).anInteger(delayInSeconds, 1);
   const delayInMilliseconds = delayInSeconds * 1000;
   setTimeout(() => {
      callBack();
      callFunctionRepeatedly(callBack, delayInSeconds);
   }, delayInMilliseconds);
}