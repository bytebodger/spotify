import React from 'react';

export const About = () => {
   
   return (
      <>
         <h1 style={{marginTop: 0}}>All About Spotify Toolz</h1>
         <p>
            Spotify Toolz is an independent project by me - Adam Nathaniel Davis.  I (obviously) have no rights whatsoever to the <i>Spotify</i> name, brand, copyrights, or trademarks.  The site is only named as such because all of
            these tools are solely designed to work with Spotify and integrate specifically with Spotify's public API.
         </p>
         
         <p>
            I am the sole contributor on the project.  However, this is open source and if you'd like to see how this app is built, or if, perhaps, you'd like to contribute features or bug fixes, you're welcome to do so.  This app
            is written entirely in React using Hooks, functional components, and no third-party state-management library.  It also leverages standard tools such as <code>React Router</code>, <code>Material UI</code>, <code>Axios</code>,
            and <code>crypto-js</code>.  All of
            the code can be viewed here:<br/>
            <a href={'https://github.com/bytebodger/spotify'}>https://github.com/bytebodger/spotify</a>
         </p>
         <p>
            I've been doing application development now for more than 20 years.  I have extensive experience in Java, C#, PHP, MS-SQL / MySQL / PostgreSQL / Oracle DB, and ColdFusion.  But for the last decade or so, I've been focusing
            very heavily on frontend development.  This includes jQuery, Angular, Node (for occasional "backend" services), and lots and lots and lots of tasty React.  If you're a software-type like me and you'd like to browse some of
            my random rants, I have a growing library of blog posts that can be viewed here:<br/>
            <a href={'https://dev.to/bytebodger'}>https://dev.to/bytebodger</a>
         </p>
         <p>
            I do more than just write code (although I write a <i>lot</i> of code).  I'm a poet, playwright, painter, and novelist.  You can read all about my creative endeavors here:<br/>
            <a href={'https://writing.voyage/'}>https://writing.voyage/</a>
         </p>
         <p>
            I'm also working on my next novel - a fantasy tome written in an entirely unique lost-tech world.  There are currently more than 400,000 words of pure worldbuilding (maps, articles, timelines, etc.) that do nothing but
            set the scene for this project.  To read all about this world, and to preview the first chapters of the upcoming novel, go here:<br/>
            <a href={'https://www.worldanvil.com/w/excilior'}>https://www.worldanvil.com/w/excilior</a>
         </p>
      </>
   );
}