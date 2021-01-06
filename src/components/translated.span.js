import * as PropTypes from 'prop-types';
import React from 'react';
import { translate } from '../functions/translate';

export const TranslatedSpan = props => <span id={props.id} style={props.style}>{translate(props.english, props.replacements, props.translateTo)}</span>;

TranslatedSpan.propTypes = {
   english: PropTypes.string.isRequired,
   id: PropTypes.string,
   replacements: PropTypes.object,
   translateTo: PropTypes.string,
   style: PropTypes.object,
};
TranslatedSpan.defaultProps = {
   replacements: {},
   style: {},
   translateTo: '',
};