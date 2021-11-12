export default {
  title: 'People list',
  name: 'peopleListBlock',
  type: 'object',
  fields: [
    {
      title: 'Heading',
      name: 'heading',
      type: 'string',
    },
    {
      title: 'People',
      name: 'people',
      description: 'Number of people in list',
      type: 'string',
      options: {
        list: [
          { title: '3', value: '3' },
          { title: '6', value: '6' },
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
