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
      title: 'Mobile Text',
      name: 'textMobile',
      type: 'text',
      description: 'Visible text on mobile',
    },
    {
      title: 'Text',
      name: 'text',
      type: 'text',
      description: 'Visible text',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Mobile image',
      description: '500px width',
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Large image',
      description: '1400px width',
      name: 'imageDesktop',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Image Description',
      name: 'imageAlt',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
