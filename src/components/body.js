import '../css/fade.css';
import CSSTransition from 'react-transition-group/CSSTransition';
import React  from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { allow } from '../classes/allow';
import { use } from '../objects/use';
import { Error } from './routes/error';
import { Home } from './routes/home';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { Shuffle } from './routes/shuffle';

export const Body = () => {
   const location = useLocation();
   
   const renderComponent = (component = {}) => {
      allow.aPopulatedObject(component);
      return (
         <div style={{position: 'absolute'}}>
            {component}
         </div>
      );
   }
   
   if (!use.global.isLoggedIn && location.pathname !== '/home')
      window.location.href = '/home';
   return (
      <main>
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
                     path={'/error'}
                     render={() => renderComponent(<Error/>)}
                  />
                  <Route
                     path={'/home'}
                     render={() => renderComponent(<Home/>)}
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