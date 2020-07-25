import { cloneObject } from '../clone.object';

export const eventModel = {
   target: {
      value: '',
      foo: '',
   },
};

export const getEventModel = () => cloneObject(eventModel);