import { RiArticleFill as icon } from 'react-icons/ri';

export default {
  name: 'page',
  title: 'Pages',
  type: 'document',
  icon,
  fields: [
    {
      name: 'title',
      title: 'Name',
      type: 'string',
      description: 'Name of page',
    },
    {
      name: 'seoTitle',
      title: 'Title',
      type: 'string',
      description: 'Title of page for SEO',
    },
    {
      name: 'seoDescription',
      title: 'Description',
      type: 'text',
      description: 'Description of page for SEO',
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
