import { BsFillLayersFill as icon } from 'react-icons/bs';

export default {
  name: 'articleSectionBlock',
  title: 'Article Section Block',
  type: 'object',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Name of content block',
    },
    {
      type: 'articleSectionContentType',
      name: 'articleSectionType',
      title: 'Content',
    },
  ],
  preview: {
    select: {
      title: 'name',
      contentType: 'articleSectionContentType.0.title',
    },
    prepare({ title }) {
      return {
        title,
      };
    },
  },
};
