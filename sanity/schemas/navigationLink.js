export default {
  type: 'array',
  title: 'Navigation link',
  name: 'navigationLink',
  of: [
    {
      title: 'Page',
      type: 'reference',
      to: [{ type: 'page' }],
    },
    {
      name: 'externalLink',
      title: 'External Link',
      type: 'externalLink',
    },
  ],
};
