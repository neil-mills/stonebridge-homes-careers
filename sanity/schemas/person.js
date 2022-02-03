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
      validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'videoUrl',
      title: 'Video URL',
      type: 'string',
      description: '',
    },
    {
      name: 'videoLinkLabel',
      title: 'Video Link Label',
      type: 'string',
      description: 'A description of the video link',
    },
  ],
};
