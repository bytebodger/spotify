import React from 'react';
import { allow } from '../classes/allow';
import { cloneObject } from './clone.object';

export const cloneArray = (array = []) => {
   allow.anArray(array);
   return array.map(element => {
      if (React.isValidElement(element))
         return element;
      if (Array.isArray(element))
         return cloneArray(element);
      if (typeof element === 'object' && element !== null)
         return cloneObject(element);
      return element;
   });
}