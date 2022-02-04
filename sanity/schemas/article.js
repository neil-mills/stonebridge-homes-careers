import { MdPerson as icon } from 'react-icons/md';

export default {
  name: 'article',
  title: 'Articles',
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
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'imageAlt',
      title: 'Image description',
      type: 'string',
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'newsCategory' }] }],
    },
    {
      type: 'articleSectionContentType',
      name: 'articleSectionType',
      title: 'Article sections',
    },
    {
      title: 'Show Image',
      name: 'showImage',
      type: 'boolean',
      description: 'Display image on article page',
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
