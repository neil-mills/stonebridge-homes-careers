import { MdLayers as icon } from 'react-icons/md';

export default {
  name: 'contentBlock',
  title: 'Content Block',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Name of content block',
    },
    {
      type: 'contentType',
      name: 'contentType',
      title: 'Content',
    },
  ],
  preview: {
    select: {
      title: 'name',
      contentType: 'contentType.0.title',
    },
    prepare({ title }) {
      return {
        title,
      };
    },
  },
};
