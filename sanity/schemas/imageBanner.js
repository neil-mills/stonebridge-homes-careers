export default {
  title: 'Image banner',
  name: 'imageBanner',
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
      title: 'Mobile Image',
      name: 'srcMobile',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Image',
      name: 'src',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      title: 'Image Alt',
      name: 'srcAlt',
      type: 'string',
      description: 'Image description',
    },
    {
      title: 'Button label',
      name: 'buttonLabel',
      type: 'string',
      description: 'Visible button label',
    },
    {
      title: 'Button Link',
      name: 'buttonLink',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'page' }] }],
    },
    {
      title: 'Text alignment',
      name: 'alignText',
      description: 'Position of text',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'dropdown',
      },
    },
    {
      title: 'Top of page',
      name: 'top',
      type: 'boolean',
      description: 'Is the section at the top of the page',
    },
    {
      title: 'Tint',
      name: 'tint',
      type: 'boolean',
      description: 'Does the section have a tinted background',
    },
  ],
};
