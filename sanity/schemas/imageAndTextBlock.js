export default {
  title: 'Image and text',
  name: 'imageAndTextBlock',
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
      title: 'Background image',
      name: 'backgroundImage',
      type: 'boolean',
      description: 'Display image in background',
    },
    {
      title: 'Paralax image',
      name: 'paralaxImage',
      type: 'boolean',
      description: 'Display image as paralax',
    },
    {
      title: 'Text box',
      name: 'textBox',
      type: 'boolean',
      description: 'Heading and text appear in box',
    },
    {
      title: 'Text position',
      name: 'textPosition',
      description: 'Position of text in block',
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
      title: 'Button label',
      name: 'buttonLabel',
      type: 'string',
      description: 'Visible button label',
    },
    {
      type: 'reference',
      title: 'Page link',
      name: 'pageLink',
      description: 'Page the button links to',
      to: [{ type: 'page' }],
    },
    {
      title: 'External URL',
      name: 'externalUrl',
      type: 'url',
      description: 'External URL the button links to',
    },
  ],
};
