import { AiFillTags as icon } from 'react-icons/ai';

export default {
  name: 'newsCategory',
  title: 'News category',
  type: 'document',
  icon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Category title',
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
  ],
}
