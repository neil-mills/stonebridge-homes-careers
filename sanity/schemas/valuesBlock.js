export default {
  name: 'valuesBlock',
  title: 'Values grid',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Visible heading',
    },
    {
      name: 'subHeading',
      title: 'Sub heading',
      type: 'string',
      description:
        'Secondary heading which appears above the main heading (optional)',
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
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{ type: 'valuesItem' }],
    },
    {
      name: 'tint',
      title: 'Tint',
      type: 'boolean',
      initialValue: true,
    },
  ],
  // preview: {
  //   select: {
  //     timelineSections: 'timelineSections',
  //   },
  //   prepare: ({ timelineSections }) => {
  //     const sections = timelineSections.map((section) => section.title);
  //     return {
  //       title: sections.join(', '),
  //     };
  //   },
  // },
};
