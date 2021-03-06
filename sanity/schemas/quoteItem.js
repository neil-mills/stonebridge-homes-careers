import { MdChat as icon } from 'react-icons/md';

export default {
  title: 'Quotes',
  name: 'quoteItem',
  type: 'document',
  icon,
  fields: [
    {
      title: 'Heading',
      name: 'heading',
      description: 'Quote heading',
      type: 'string',
    },
    {
      title: 'Quote',
      name: 'quote',
      type: 'text',
    },
    {
      title: 'Author',
      name: 'author',
      description: 'Name of author',
      type: 'string',
    },
    {
      title: 'Author image',
      name: 'image',
      type: 'image',
    },
  ],
  preview: {
    select: {
      author: 'author',
    },
    prepare: ({ author }) => ({
      title: author,
    }),
  },
};
