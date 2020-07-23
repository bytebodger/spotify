import { use } from '../objects/use';
import { useGlobal } from './use.global';
import { useMeEndpoint } from './use.me.endpoint';
import { usePlaylistsEndpoint } from './use.playlists.endpoint';
import { useRecommendationsEndpoint } from './use.recommendations.endpoint';
import { useTokenEndpoint } from './use.token.endpoint';

export const useLoadSharedHooks = () => {
   use.global = useGlobal();
   use.meEndpoint = useMeEndpoint();
   use.playlistsEndpoint = usePlaylistsEndpoint();
   use.recommendationsEndpoint = useRecommendationsEndpoint();
   use.tokenEndpoint = useTokenEndpoint();
}