import * as PropTypes from 'prop-types';
import { allow } from '../classes/allow';
import { is } from '../objects/is';
import * as USFlag from '../images/flags/us.svg';
import * as SpanishFlag from '../images/flags/es.svg';
import React, { useState } from 'react';
import { translation } from '../objects/constants/translation';
import { use } from '../objects/use';
import { TranslatedSpan } from './translated.span';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
// test

export const LanguageMenuWithFlags = props => {
   const [anchorElement, setAnchorElement] = useState(null);
   
   const close = (event = {}) => {
      allow.anObject(event, is.not.empty);
      setAnchorElement(null);
      const language = event.currentTarget.getAttribute('language');
      if (props.onClose && language)
         props.onClose(language);
   };
   
   const flag = {
      English: USFlag,
      Spanish: SpanishFlag,
   };

   const getLabel = () => {
      if (!props.label)
         return null;
      return (
         <>
            <span style={props.labelStyle}>
               {props.label}
            </span>
            <br/>
         </>
      );
   };
   
   const getMenuItems = () => {
      let menuItems = [];
      const languages = Object.keys(translation).push('English');
      languages.forEach(language => {
         const selected = language === props.selectedLanguage;
         if (selected)
            currentFlag = flag;
         menuItems.push(
            <MenuItem
               key={`${language}-menuItem`}
               language={language}
               onClick={close}
               selected={selected}
            >
               {flag[use.global.language]}
               <TranslatedSpan
                  english={language}
                  id={props.spanId}
                  style={{marginLeft : 10}}
               />
            </MenuItem>
         );
      });
      return menuItems;
   };
   
   const open = (event = {}) => {
      allow.anObject(event, is.not.empty);
      const target = event.currentTarget;
      setAnchorElement(target);
      if (props.onOpen)
         props.onOpen(event);
   };
   
   let currentFlag = null;
   const menuItems = getMenuItems();
   if (!currentFlag)
      return null;
   return (
      <div style={props.containerStyle}>
         {getLabel()}
         <Button
            aria-haspopup={true}
            aria-owns={anchorElement ? 'simple-menu' : null}
            onClick={open}
            style={props.buttonStyle}
         >
            {currentFlag}
         </Button>
         <Menu
            anchorEl={anchorElement}
            id={'simple-menu'}
            onClose={close}
            open={!!anchorElement}
         >
            {menuItems}
         </Menu>
      </div>
   );
}

LanguageMenuWithFlags.propTypes = {
   buttonStyle : PropTypes.object,
   containerStyle : PropTypes.object,
   label : PropTypes.string,
   labelStyle : PropTypes.object,
   onClose : PropTypes.func,
   onOpen : PropTypes.func,
   selectedLanguage : PropTypes.string,
   spanId : PropTypes.string,
};
LanguageMenuWithFlags.defaultProps = {
   buttonStyle : {},
   containerStyle : {},
   label : '',
   labelStyle : {
      color : 'rgba(0, 0, 0, 0.5)',
      float : 'left',
      fontFamily : 'Roboto, Helvetica, Arial, sans-serif',
      fontSize : '0.9em',
      lineHeight : 1,
   },
   selectedLanguage : 'English',
};