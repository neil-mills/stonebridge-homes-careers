import { MdPerson as icon } from 'react-icons/md';

export default {
  name: 'articlesBlock',
  title: 'Articles',
  type: 'object',
  icon,
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Name of content block',
    },
    {
      name: 'subHeading',
      title: 'Sub heading',
      type: 'string',
      description: 'Secondary title (optional)',
    },
    {
      name: 'text',
      title: 'Text',
      type: 'text',
      description: 'Text that appears below the heading (optional)',
    },
    {
      name: 'headingLevel',
      title: 'Heading level',
      type: 'number',
      initialValue: 2,
    },
    {
      name: 'dataSource',
      title: 'Data source',
      type: 'string',
      options: {
        list: [
          { title: 'Articles', value: 'articles' },
          { title: 'People', value: 'people' },
        ],
        layout: 'radio',
      },
      description: 'The data to display in the list',
      initialValue: 'articles',
    },
    {
      name: 'showArticles',
      title: 'Show articles',
      type: 'string',
      options: {
        list: [
          { title: 'Latest', value: 'latest' },
          { title: 'Selected', value: 'selected' },
        ],
        layout: 'radio',
      },
      description: 'Items to display in list',
      initialValue: 'latest',
      hidden: ({ parent }) => parent?.dataSource === 'people',
    },
    {
      title: 'Carousel',
      name: 'carousel',
      type: 'boolean',
      description: 'Display the items in a carousel',
      initialValue: false,
    },
    {
      title: 'Paginated',
      name: 'isPaginated',
      type: 'boolean',
      description: 'Articles are paginated',
      initialValue: false,
      hidden: ({ parent }) =>
        parent?.showArticles === 'selected' || parent.carousel,
    },
    {
      title: 'Articles',
      name: 'selectedArticles',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'article' }, { type: 'person' }],
        },
      ],
      description: 'Select items to display in list',
      hidden: ({ parent }) => parent.showArticles === 'latest',
    },
    {
      title: 'Category Filters',
      name: 'showCategories',
      type: 'boolean',
      description: 'Show category filter menu',
      initialValue: false,
      hidden: ({ parent }) =>
        parent.showArticles === 'selected' ||
        parent.carousel ||
        parent.dataSource === 'people',
    },

    {
      name: 'buttonLabel',
      title: 'Button label',
      type: 'string',
      description: 'Visible label of the button (optional)',
    },
    {
      name: 'buttonLink',
      title: 'Button link',
      type: 'reference',
      to: [{ type: 'page' }],
      description: 'Page link from the button (optional)',
    },
  ],
  preview: {
    select: {
      title: 'heading',
      contentType: 'contentType.0.title',
    },
    prepare({ title = 'Articles' }) {
      return {
        title,
      };
    },
  },
};
