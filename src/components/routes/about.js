import React from 'react';
import { useConstructor } from '../../hooks/use.constructor';
import { logGooglePageHit } from '../../functions/log.google.page.hit';
import * as me from '../../images/adam.nathaniel.davis.jpg';
import { css } from '../../objects/css';
import { Row } from '../row';
import { Column } from '../column';

export const About = () => {
   useConstructor(() => logGooglePageHit('About'));
   
   return <>
      <Row justify={'space-evenly'}>
         <Column
            xs={12} sm={10} md={8} lg={7} xl={6}
            style={{
               paddingLeft: 8,
               paddingRight: 8,
            }}
         >
            <h1 style={{
               marginTop: 0,
               textAlign: css.textAlign.center,
            }}>All About playlist.help</h1>
            <p style={{textAlign: css.textAlign.center}}>
               <img
                  alt={'Adam Nathaniel Davis'}
                  src={me}
                  style={{
                     maxWidth: 700,
                     width: '100%',
                  }}
               />
            </p>
            <p>
               playlist.help is an independent project by me - Adam Nathaniel Davis. I have no rights whatsoever to the <i>Spotify</i> name, brand, copyrights, or trademarks (obviously). The site is only named as such because all of
               these tools are solely designed to work with Spotify and integrate specifically with Spotify's public API.
            </p>
            <p>
               My picture above already proves that I'm strikingly earnest and stunningly handsome. But if you'd like to learn a whole lot more (some would say, <i>too much</i> more), please check out my complete resume/CV
               site at:
            </p>
            <p style={{textAlign: css.textAlign.center}}>
               <a href={'https://adamdavis.codes'}>https://adamdavis.codes</a>
            </p>
         </Column>
      </Row>
   </>;
};
