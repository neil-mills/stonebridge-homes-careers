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
      title: 'Sub heading',
      name: 'subHeading',
      type: 'string',
    },
    {
      title: 'Text',
      name: 'text',
      type: 'string',
    },
    {
      title: 'Limit',
      name: 'limit',
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
      title: 'Button label',
      name: 'buttonLabel',
      type: 'string',
      description: 'Visible label of button',
    },
  ],
  preview: {
    select: {
      heading: 'heading',
    },
    prepare: ({ heading = 'Vacancies' }) => ({
      title: heading,
    }),
  },
};
