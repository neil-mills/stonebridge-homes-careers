import { MdPerson as icon } from 'react-icons/md';

export default {
  type: 'array',
  name: 'contentType',
  title: 'Content',
  icon,
  of: [
    {
      title: 'Home banner',
      name: 'homeBanner',
      type: 'homeBanner',
    },
    {
      title: 'Image and text',
      name: 'imageAndTextBlock',
      type: 'imageAndTextBlock',
    },
    {
      title: 'Image banner',
      name: 'imageBanner',
      type: 'imageBanner',
    },
    {
      title: 'Vacancies list',
      name: 'vacanciesListBlock',
      type: 'vacanciesListBlock',
    },
    {
      title: 'Articles list',
      name: 'articlesBlock',
      type: 'articlesBlock',
    },
    {
      title: 'Parallax image',
      name: 'parallaxImageBlock',
      type: 'parallaxImageBlock',
    },
    {
      title: 'Timeline block',
      name: 'timelineBlock',
      type: 'timelineBlock',
    },
    {
      title: 'Keyline grid block',
      name: 'keylineGridBlock',
      type: 'keylineGridBlock',
    },
    {
      title: 'Values block',
      name: 'valuesBlock',
      type: 'valuesBlock',
    },
    {
      title: 'Subcontactor block',
      name: 'subContractorBlock',
      type: 'subContractorBlock',
    },
    {
      title: 'Quote list',
      name: 'quoteListBlock',
      type: 'quoteListBlock',
    },
    {
      title: 'Text block',
      name: 'textBlock',
      type: 'textBlock',
    },
  ],
};
