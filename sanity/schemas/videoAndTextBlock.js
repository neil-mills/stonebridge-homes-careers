export default {
  title: 'Video and text',
  name: 'videoAndTextBlock',
  type: 'object',
  fields: [
    {
      title: 'Heading',
      name: 'heading',
      type: 'string',
    },
    {
      title: 'Text',
      name: 'text',
      type: 'text',
      description: 'Visible text',
    },
    {
      title: 'Url',
      name: 'url',
      type: 'url',
      description: 'Embedded video url',
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
