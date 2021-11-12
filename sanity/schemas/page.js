import { RiArticleFill as icon } from 'react-icons/ri';

export default {
  name: 'page',
  title: 'Pages',
  type: 'document',
  icon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title of page',
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
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'contentBlock' }] }],
    },
  ],
};
