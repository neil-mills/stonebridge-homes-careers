import { MdPerson as icon } from 'react-icons/md';

export default {
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon,
  fields: [
    {
      name: 'address',
      title: 'Address',
      type: 'text',
      description: 'Office address',
    },
    {
      name: 'instagram',
      title: 'Instagram',
      type: 'string',
    },
    {
      name: 'facebook',
      title: 'Facebook',
      type: 'string',
    },
    {
      name: 'linkedin',
      title: 'Linkedin',
      type: 'string',
    },
    {
      name: 'twitter',
      title: 'Twitter',
      type: 'string',
    },
  ],
};
