import React from 'react';
import { allow } from '../classes/allow';
import { cloneArray } from './clone.array';

export const cloneObject = (object = {}) => {
   allow.anObject(object);
   let clonedObject = {};
   Object.keys(object).forEach(key => {
      const currentValue = object[key];
      if (React.isValidElement(currentValue))
         clonedObject[key] = currentValue;
      else if (Array.isArray(currentValue))
         clonedObject[key] = cloneArray(currentValue);
      else if (typeof currentValue === 'object' && currentValue !== null)
         clonedObject[key] = cloneObject(currentValue);
      else
         clonedObject[key] = currentValue;
   });
   return clonedObject;
}