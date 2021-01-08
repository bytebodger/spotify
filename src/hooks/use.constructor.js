import { allow } from '../classes/allow';
import { useState } from 'react';
import { the } from '../objects/the';

export const useConstructor = (callBack = the.empty.function) => {
   allow.aFunction(callBack);
   const [hasBeenCalled, setHasBeenCalled] = useState(false);
   if (hasBeenCalled)
      return;
   callBack();
   setHasBeenCalled(true);
};