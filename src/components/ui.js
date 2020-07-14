import React, { useEffect } from 'react';
import { FlexShell } from './flex.shell';
import { getUrlParameters } from '../functions/get.url.parameters';
import { Header } from './header';
import { use } from '../objects/use';
import { useHistory, useLocation } from 'react-router';

export const UI = () => {
   const history = useHistory();
   const location = useLocation();
   
   useEffect(() => {
      const urlParameters = getUrlParameters();
      if (urlParameters.error) {
         use.global.updateError(urlParameters.error);
         history.push('/error');
      } else if (urlParameters.code && urlParameters.state === use.global.state) {
         use.global.updateIsLoggedIn(true);
         use.global.updateCode(urlParameters.code);
         history.push(location.pathname);
         use.tokenApi.getAccessToken();
      }
   }, [history, location.pathname]);

   return (
      <>
         <Header/>
         <FlexShell/>
      </>
   );
};