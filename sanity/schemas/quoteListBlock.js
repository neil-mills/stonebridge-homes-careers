export default {
  title: 'Quote list',
  name: 'quoteListBlock',
  type: 'object',
  fields: [
    {
      name: 'subHeading',
      title: 'Sub heading',
      type: 'string',
      description: 'Secondary title (optional)',
    },
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Name of content block',
    },
    {
      name: 'text',
      title: 'Text',
      type: 'text',
      description: 'Text that appears below the heading (optional)',
    },
    {
      name: 'headingLevel',
      title: 'Heading level',
      type: 'number',
      initialValue: 2,
    },
    {
      title: 'Quotes',
      name: 'quotes',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'quoteItem' }],
        },
      ],
    },
  ],
};
