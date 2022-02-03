export default {
  name: 'keylineGridItem',
  title: 'Grid Item',
  type: 'object',
  fields: [
    {
      name: 'icon',
      title: 'Icon',
      type: 'file',
    },
    {
      name: 'size',
      title: 'Icon Size',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'sm' },
          { title: 'Large', value: 'lg' },
        ],
        layout: 'radio',
      },
      description: 'The size of the icon',
      initialValue: 'sm',
    },
    {
      name: 'subTitle',
      title: 'Sub title',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'text',
      title: 'Text',
      type: 'text',
    },
  ],
};
