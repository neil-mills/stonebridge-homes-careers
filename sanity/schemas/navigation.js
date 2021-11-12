import { CgMenuGridR as icon } from 'react-icons/cg';
//import navigationLink from './navigationLink'
export default {
 name: 'navigation',
 title: 'Navigation',
 type: 'document',
 icon,
 fields: [
  {
   name: 'title',
   title: 'Title',
   type: 'string',
   description: '',
  },
  {
    name: 'navigationLink',
    title: 'Link',
    type: 'navigationLink'
  }
 ],
};
