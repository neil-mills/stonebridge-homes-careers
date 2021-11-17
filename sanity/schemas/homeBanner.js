export default {
  title: 'Home Banner',
  name: 'homeBanner',
  type: 'object',
  fields: [
    {
      title: 'Heading',
      name: 'heading',
      type: 'string',
      description: 'Visible heading',
    },
    {
      title: 'Text',
      name: 'text',
      type: 'text',
      description: 'Visible text',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      title: 'Image Desktop',
      name: 'imageDesktop',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      title: 'Button Label',
      name: 'buttonLabel',
      type: 'string',
    },
    {
      title: 'Button Link',
      name: 'buttonLink',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'page' }] }],
    },
  ],
};
