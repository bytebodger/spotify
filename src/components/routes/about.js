import React, { useState } from 'react';
import { useConstructor } from '../../hooks/use.constructor';
import { logGooglePageHit } from '../../functions/log.google.page.hit';
import * as me from '../../images/adam.nathaniel.davis.jpg';
import axios from 'axios';
import { the } from '../../objects/the';
import { css } from '../../objects/css';
import { Row } from '../row';
import { Column } from '../column';

export const About = () => {
   const [npmPackages, setNpmPackages] = useState({
      'allow': 0,
      'allow-react': 0,
      'clone': 0,
      'color': 0,
      'create-random-id': 0,
      'get-cookies': 0,
      'get-url-parameters': 0,
      'is-a-regular-object': 0,
      'is-a-regular-object-react': 0,
      'local-storage': 0,
      'local-storage-is-available': 0,
      'looks-like-email': 0,
      'session-storage': 0,
      'session-storage-is-available': 0,
      'string-contains': 0,
      'use-constructor': 0,
      'use-synchronous-state': 0,
      'use-viewport': 0,
   });
   const [totalDownloads, setTotalDownloads] = useState(0);
   
   useConstructor(() => {
      logGooglePageHit('About');
      Object.keys(npmPackages).forEach(npmPackage => {
         axios({
            headers: {},
            method: the.method.get,
            params: {},
            url: 'https://api.npmjs.org/downloads/point/2019-01-01:2050-01-01/@toolz/' + npmPackage,
         }).then(response => {
            if (response?.data?.downloads) {
               setNpmPackages(previousNpmPackages => {
                  previousNpmPackages[npmPackage] = response.data.downloads;
                  return previousNpmPackages;
               });
               setTotalDownloads(previousValue => previousValue + response.data.downloads);
            }
         }).catch(() => {
            // no downloads for this package yet
         });
      });
   });
   
   const getPackageRows = () => {
      const rows = [];
      Object.entries(npmPackages).forEach((entry, index) => {
         const [npmPackage, downloads] = entry;
         rows.push(
            <tr
               key={npmPackage}
               style={{backgroundColor: index % 2 ? 'lightgray' : 'white'}}
            >
               <td>
                  <a
                     href={'https://npmjs.com/package/@toolz/' + npmPackage}
                     rel={'noopener noreferrer'}
                     target={'_blank'}
                  >
                     @toolz/{npmPackage}
                  </a>
               </td>
               <td style={{textAlign: css.textAlign.right}}>{downloads}</td>
            </tr>
         );
      });
      return rows;
   };
   
   const getPackageTable = () => {
      return <>
         <Row>
            <Column xl={4} lg={6} md={8} sm={10} xs={12}>
               <table style={{width: '100%',}}>
                  <thead>
                     <tr>
                        <th style={{
                           textAlign: css.textAlign.left,
                           width: '90%',
                        }}>Package
                        </th>
                        <th style={{
                           minWidth: 50,
                           textAlign: css.textAlign.right,
                           width: '10%',
                        }}>Downloads
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     {getPackageRows()}
                  </tbody>
               </table>
            </Column>
         </Row>
      </>;
   };
   
   return <>
      <h1 style={{marginTop: 0}}>All About Spotify Toolz</h1>
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
         Spotify Toolz is an independent project by me - Adam Nathaniel Davis. I have no rights whatsoever to the <i>Spotify</i> name, brand, copyrights, or trademarks (obviously). The site is only named as such because all of
         these tools are solely designed to work with Spotify and integrate specifically with Spotify's public API.
      </p>
      <p>
         I am the sole contributor on the project. However, this is open source and if you'd like to see how this app is built, or if, perhaps, you'd like to contribute features or bug fixes, you're welcome to do so. This app
         is written entirely in React using Hooks, functional components, and no third-party state-management library. It also leverages standard tools such as <code>React Router</code>, <code>Material UI</code>, <code>Axios</code>,
         and <code>crypto-js</code>. All of
         the code can be viewed here:<br/>
         <a href={'https://github.com/bytebodger/spotify'}>https://github.com/bytebodger/spotify</a>
      </p>
      <p>
         I've been doing application development now for more than 20 years. I have extensive experience in Java, C#, PHP, MS-SQL / MySQL / PostgreSQL / Oracle DB, and ColdFusion. But for the last decade or so, I've been focusing
         very heavily on frontend development. This includes jQuery, Angular, Node (for occasional "backend" services), and lots and lots and lots of tasty React. If you're a software-type like me and you'd like to browse some of
         my random rants, I have a growing library of blog posts that can be viewed here:<br/>
         <a href={'https://dev.to/bytebodger'}>https://dev.to/bytebodger</a>
      </p>
      <p>
         I do more than just write code (although I write a <i>lot</i> of code). I'm a writer and a painter. You can read all about my creative endeavors here:<br/>
         <a href={'https://writing.voyage/'}>https://writing.voyage/</a>
      </p>
      <p>
         I'm working on my next novel - a fantasy tome written in an entirely unique lost-tech world. There are currently more than 400,000 words of pure worldbuilding (maps, articles, timelines, etc.) that do nothing but
         set the scene for this project. To read all about this world, and to preview the first chapters of the upcoming novel, go here:<br/>
         <a href={'https://www.worldanvil.com/w/excilior'}>https://www.worldanvil.com/w/excilior</a>
      </p>
      <p>
         Do you like theatre? Because, guess what?? I write <i>plays</i> as well! Check out my catalog here:<br/>
         <a href={'https://newplayexchange.org/users/7276/adam-nathaniel-davis'}>https://newplayexchange.org/users/7276/adam-nathaniel-davis</a>
      </p>
      <p>
         Wanna see what I'm painting? I've got a whole YouTube channel designed to document the entire act of creation. Check it out here:<br/>
         <a href={'https://www.youtube.com/channel/UCHNDtVFC4WQTcp_awD9c1Ag'}>Blob Life</a>
      </p>
      <p>
         I've recently been building the following library of NPM packages. To-date, my software has been downloaded more than <b>{totalDownloads}</b> times.
      </p>
      <div>
         {getPackageTable()}
      </div>
   </>;
};
