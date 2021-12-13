import { MdPerson as icon } from 'react-icons/md';

export default {
  name: 'person',
  title: 'People',
  type: 'document',
  icon,
  fields: [
    {
      name: 'title',
      title: 'Name',
      type: 'string',
      description: '',
    },
    {
      name: 'subTitle',
      title: 'Job title',
      type: 'string',
      description: '',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 100,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'videoUrl',
      title: 'Video URL',
      type: 'string',
      description: '',
    },
  ],
};
