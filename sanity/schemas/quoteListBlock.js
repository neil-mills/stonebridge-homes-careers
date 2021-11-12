export default {
  title: 'Quote list',
  name: 'quoteListBlock',
  type: 'object',
  fields: [
    {
      title: 'Above heading',
      name: 'aboveHeading',
      description: 'Text above the heading',
      type: 'string',
    },
    {
      title: 'Heading',
      name: 'heading',
      type: 'string',
    },
    {
      title: 'Below heading',
      name: 'belowHeading',
      description: 'Text below the heading',
      type: 'string',
    },
    {
      title: 'Quotes',
      name: 'quotes',
      description: 'Number of quotes in list',
      type: 'string',
      options: {
        list: [
          { title: '2', value: '2' },
          { title: '4', value: '4' },
          { title: 'All', value: 'all' },
        ], // <-- predefined values
        layout: 'dropdown', // <-- defaults to 'dropdown'
      },
    },
    {
      title: 'Archive button',
      name: 'archiveButton',
      type: 'boolean',
      description: 'Display link to archive page',
    },
  ],
};
