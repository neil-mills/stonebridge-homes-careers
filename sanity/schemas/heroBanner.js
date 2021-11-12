export default {
  title: 'Hero banner',
  name: 'heroBanner',
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
      title: 'Image',
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      title: 'Text box',
      name: 'textBox',
      type: 'boolean',
      description: 'Heading and text appear in box',
    },
  ],
};
