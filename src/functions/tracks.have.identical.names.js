import { allow } from '../classes/allow';
import { is } from '../objects/is';

export const tracksHaveIdenticalNames = (track1 = {}, track2 = {}) => {
   allow.anObject(track1, is.not.empty).anObject(track2, is.not.empty);
   return track1.name.toLowerCase() === track2.name.toLowerCase();
}