export default {
  title: 'Parallax image',
  name: 'parallaxImageBlock',
  type: 'object',
  fields: [
    {
      title: 'Image',
      name: 'src',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      title: 'Large image',
      name: 'srcLarge',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};
