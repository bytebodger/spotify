import { allow } from '../classes/allow';
import { is } from '../objects/is';

export const tracksHaveSimilarNames = (track1 = {}, track2 = {}) => {
   allow.anObject(track1, is.not.empty).anObject(track2, is.not.empty);
   const track1Name = track1.name.toLowerCase();
   const track2Name = track2.name.toLowerCase();
   return track1Name.indexOf(track2Name) === 0 || track2Name.indexOf(track1Name) === 0;
}