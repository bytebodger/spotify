import { use } from '../objects/use';
import { useGlobal } from './use.global';
import { useMeApi } from './use.me.api';
import { usePlaylistsApi } from './use.playlists.api';
import { useTokenApi } from './use.token.api';

export const useLoadSharedHooks = () => {
   use.global = useGlobal();
   use.meApi = useMeApi();
   use.playlistsApi = usePlaylistsApi();
   use.tokenApi = useTokenApi();
}