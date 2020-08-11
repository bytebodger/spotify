import { allow } from '../classes/allow';
import { useState } from 'react';

export const useConstructor = (callBack = () => {}) => {
   allow.aFunction(callBack);
   const [hasBeenCalled, setHasBeenCalled] = useState(false);
   if (hasBeenCalled)
      return;
   callBack();
   setHasBeenCalled(true);
}