import { MdPerson as icon } from 'react-icons/md';

export default {
  name: 'article',
  title: 'News',
  type: 'document',
  icon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Headline of article',
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
      name: 'date',
      title: 'Date',
      type: 'date',
      initialValue: new Date(),
      validation: (Rule) => Rule.required(),
      options: {
        dateFormat: 'DD-MM-YYYY',
      },
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
      description: 'Author of the article',
    },
    {
      name: 'text',
      title: 'Text',
      type: 'text',
      description: 'Article text',
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
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'newsCategory' }] }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
    },
    // prepare({ title, contentType}) {
    //   console.log(contentType);
    //   return {
    //     title
    //   }
    // }
  },
};
