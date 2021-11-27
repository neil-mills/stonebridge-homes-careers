import { MdPerson as icon } from 'react-icons/md';

export default {
  type: 'array',
  name: 'articleSectionContentType',
  title: 'Section type',
  icon,
  of: [
    {
      title: 'Image and text',
      name: 'imageAndTextBlock',
      type: 'imageAndTextBlock',
    },
    {
      title: 'Text',
      name: 'textBlock',
      type: 'textBlock',
    },
    {
      title: 'Parallax image',
      name: 'parallaxImageBlock',
      type: 'parallaxImageBlock',
    },
  ],
};
