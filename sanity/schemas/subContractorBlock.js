export default {
  title: 'Subcontractor',
  name: 'subContractorBlock',
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
      name: 'textBlock',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      title: 'Button label',
      name: 'buttonLabel',
      type: 'string',
      description: 'Visible button label',
    },
    {
      title: 'Tint',
      name: 'tint',
      type: 'boolean',
      description: 'Does this section have a tinted background',
    },
  ],
};
