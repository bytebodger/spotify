import '../css/fade.css';
import CSSTransition from 'react-transition-group/CSSTransition';
import React  from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { About } from './routes/about';
import { allow } from '../classes/allow';
import { callFunctionRepeatedly } from '../functions/call.function.repeatedly';
import { checkLoginStatus } from '../functions/check.login.status';
import { css } from '../objects/css';
import { Duplicates } from './routes/duplicates';
import { Error } from './routes/error';
import { Home } from './routes/home';
import { Recommend } from './routes/recommend';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { Shuffle } from './routes/shuffle';
import { use } from '../objects/use';
import { useConstructor } from '../functions/use.constructor';

export const Body = () => {
   const location = useLocation();
   
   useConstructor(() => callFunctionRepeatedly(checkLoginStatus, 10));
   
   const renderComponent = (component = <></>) => {
      allow.aReactElement(component);
      return (
         <div style={{
            padding: 20,
            position: css.position.absolute,
            width: 'calc(100% - 50px)',
         }}>
            {component}
         </div>
      );
   }
   
   if (!use.global.isLoggedIn && location.pathname !== '/home' && location.pathname !== '/about')
      window.location.href = '/home';
   return (
      <main style={{
         height: '100%',
         overflow: css.overflow.auto,
         position: css.position.relative,
         width: '100%',
      }}>
         <TransitionGroup>
            <CSSTransition
               classNames={'fade'}
               key={location.key}
               timeout={1500}
            >
               <Switch location={location}>
                  <Route
                     exact={true}
                     path={'/'}
                  >
                     <Redirect to={'/home'}/>
                  </Route>
                  <Route
                     path={'/about'}
                     render={() => renderComponent(<About/>)}
                  />
                  <Route
                     path={'/duplicates'}
                     render={() => renderComponent(<Duplicates/>)}
                  />
                  <Route
                     path={'/error'}
                     render={() => renderComponent(<Error/>)}
                  />
                  <Route
                     path={'/home'}
                     render={() => renderComponent(<Home/>)}
                  />
                  <Route
                     path={'/recommend'}
                     render={() => renderComponent(<Recommend/>)}
                  />
                  <Route
                     path={'/shuffle'}
                     render={() => renderComponent(<Shuffle/>)}
                  />
               </Switch>
            </CSSTransition>
         </TransitionGroup>
      </main>
   );
}