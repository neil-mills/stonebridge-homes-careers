import { MdPerson as icon } from 'react-icons/md';

export default {
  type: 'array',
  name: 'contentType',
  title: 'Content',
  icon,
  of: [
    {
      title: 'Home Banner',
      name: 'homeBanner',
      type: 'homeBanner',
    },
    {
      title: 'Image and text',
      name: 'imageAndTextBlock',
      type: 'imageAndTextBlock',
    },
    {
      title: 'Video and text',
      name: 'videoAndTextBlock',
      type: 'videoAndTextBlock',
    },
    {
      title: 'Vacancies list',
      name: 'vacanciesListBlock',
      type: 'vacanciesListBlock',
    },
    {
      title: 'News list',
      name: 'newsListBlock',
      type: 'newsListBlock',
    },
    {
      title: 'People list',
      name: 'peopleListBlock',
      type: 'peopleListBlock',
    },
    {
      title: 'Quote list',
      name: 'quoteListBlock',
      type: 'quoteListBlock',
    },
  ],
};
