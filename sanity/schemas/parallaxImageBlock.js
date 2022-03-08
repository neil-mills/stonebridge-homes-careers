export default {
  title: 'Parallax image',
  name: 'parallaxImageBlock',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Image Description',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Mobile image',
      name: 'src',
      description: '500px width',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Large image',
      name: 'srcLarge',
      description: '1400px width',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title,
      };
    },
  },
};
