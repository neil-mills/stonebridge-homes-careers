export default {
  title: 'Image and text',
  name: 'imageAndTextBlock',
  type: 'object',
  fields: [
    {
      title: 'Heading',
      name: 'heading',
      type: 'string',
      description: 'Visible heading',
    },
    {
      title: 'Text',
      name: 'textBlock',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      title: 'Text alignment',
      name: 'alignText',
      description: 'Position of text',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'dropdown',
      },
    },
    {
      title: 'Mobile image',
      name: 'srcMobile',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      title: 'Image',
      name: 'src',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      title: 'Image Alt',
      name: 'srcAlt',
      type: 'string',
      description: 'Image description',
    },
    {
      title: 'Button label',
      name: 'buttonLabel',
      type: 'string',
      description: 'Visible button label',
    },
    {
      title: 'Button Link',
      name: 'buttonLink',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'page' }] }],
    },
    {
      title: 'Video URL',
      name: 'videoSrc',
      type: 'string',
      description: 'Embed url of video',
    },
    {
      title: 'Tint',
      name: 'tint',
      type: 'boolean',
      description: 'Does the section have a tinted background',
    },
    {
      title: 'Button callback',
      name: 'buttonCallback',
      type: 'string',
      description: 'Callback action of button',
    },
  ],
};
