export default {
  title: 'Vacancies list',
  name: 'vacanciesListBlock',
  type: 'object',
  fields: [
    {
      title: 'Heading',
      name: 'heading',
      type: 'string',
    },
    {
      title: 'Vacancies',
      name: 'vacancies',
      description: 'Number of vacancies displayed in list',
      type: 'string',
      options: {
        list: [
          { title: 'Latest 3', value: '3' },
          { title: 'Latest 6', value: '6' },
          { title: 'All', value: 'all' },
        ], // <-- predefined values
        layout: 'dropdown', // <-- defaults to 'dropdown'
      },
    },
    {
      title: 'Filter menu',
      name: 'filter',
      type: 'boolean',
      description: 'Display filter menu',
    },
    {
      title: 'Archive button',
      name: 'archiveButton',
      type: 'boolean',
      description: 'Display link to archive page',
    },
  ],
};
