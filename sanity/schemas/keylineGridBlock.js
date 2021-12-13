export default {
  name: 'keylineGridBlock',
  title: 'Keyline Grid',
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
      name: 'columns',
      title: 'Columns',
      type: 'number',
      initialValue: 3,
    },
    {
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{ type: 'keylineGridItem' }],
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
