export default {
  name: 'textBlock',
  title: 'Text Block',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Name of content block',
    },
    {
      name: 'subHeading',
      title: 'Sub heading',
      type: 'string',
      description: 'Secondary title (optional)',
    },
    {
      title: 'Text',
      name: 'text',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
};
