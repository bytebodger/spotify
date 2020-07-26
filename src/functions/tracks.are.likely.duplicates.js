import { allow } from '../classes/allow';
import { trackModel } from '../objects/models/track.model';
import { tracksAreSimilarLength } from './tracks.are.similar.length';
import { tracksHaveIdenticalNames } from './tracks.have.identical.names';
import { tracksHaveSimilarNames } from './tracks.have.similar.names';
import { tracksShareAnArtist } from './tracks.share.an.artist';

export const tracksAreLikelyDuplicates = (track1 = trackModel, track2 = trackModel) => {
   allow.anInstanceOf(track1, trackModel).anInstanceOf(track2, trackModel);
   return tracksShareAnArtist(track1, track2)
      && (
         (tracksHaveIdenticalNames(track1, track2) && tracksAreSimilarLength(track1, track2, 8))
         || (tracksHaveSimilarNames(track1, track2) && tracksAreSimilarLength(track1, track2, 1))
      );
}