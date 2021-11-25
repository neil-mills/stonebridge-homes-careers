export default {
  name: 'timelineBlock',
  title: 'Timeline',
  type: 'object',
  fields: [
    {
      name: 'timelineSections',
      title: 'Sections',
      type: 'array',
      of: [{ type: 'timelineSection' }],
    },
  ],
  preview: {
    select: {
      timelineSections: 'timelineSections',
    },
    prepare: ({ timelineSections }) => {
      const sections = timelineSections.map((section) => section.title);
      return {
        title: sections.join(', '),
      };
    },
  },
};
