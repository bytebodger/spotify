import { allow } from '../classes/allow';
import { the } from '../objects/the';

export const callFunctionRepeatedly = (callBack = the.empty.function, delayInSeconds = 60) => {
   allow.aFunction(callBack).anInteger(delayInSeconds, 1);
   const delayInMilliseconds = delayInSeconds * 1000;
   setTimeout(() => {
      callBack();
      callFunctionRepeatedly(callBack, delayInSeconds);
   }, delayInMilliseconds);
};