export default {
  name: 'timelineSection',
  title: 'Timeline section',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'items',
      title: 'Timeline items',
      type: 'array',
      of: [{ type: 'timelineItem' }],
    },
  ],
};
