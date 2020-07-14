import React from 'react';
import { UI } from './components/ui';
import { useLoadSharedHooks } from './hooks/use.load.shared.hooks';

export const App = () => {
   useLoadSharedHooks();

   return <UI/>;
}
