import { defineArrayMember, defineField, defineType } from 'sanity'

const productPathPattern = /^\/(services|shop)\/[a-z0-9-/]+$/

export const productGallery = defineType({
  name: 'productGallery',
  title: 'Product Galleries',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Product name',
      type: 'string',
      description: 'Internal label shown in Studio, for example “Table Top Retractable”.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'productPath',
      title: 'Product page path',
      type: 'string',
      description: 'Copy the product URL path beginning with /services/ or /shop/. Example: /services/signage/banners/retractable-tabletop',
      validation: Rule => Rule.required().regex(productPathPattern, {
        name: 'product page path',
        invert: false,
      }),
    }),
    defineField({
      name: 'enabled',
      title: 'Use this gallery on the website',
      type: 'boolean',
      description: 'Turn this off and publish to return the page to its built-in gallery.',
      initialValue: true,
    }),
    defineField({
      name: 'galleryBackground',
      title: 'Gallery background',
      type: 'string',
      initialValue: 'muted',
      options: {
        layout: 'radio',
        list: [
          { title: 'Light gray', value: 'muted' },
          { title: 'White', value: 'white' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Gallery images',
      type: 'array',
      description: 'Drag images to reorder them. The first image is displayed by default.',
      of: [
        defineArrayMember({
          name: 'productGalleryImage',
          title: 'Product image',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image file',
              type: 'image',
              options: { hotspot: true },
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Alternative text',
              type: 'string',
              description: 'Briefly describe the product shown for accessibility and search engines.',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'fit',
              title: 'Image fit',
              type: 'string',
              initialValue: 'contain',
              options: {
                layout: 'radio',
                list: [
                  { title: 'Contain — show the complete image', value: 'contain' },
                  { title: 'Cover — fill the square and crop edges', value: 'cover' },
                ],
              },
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'padding',
              title: 'Padding',
              type: 'number',
              description: 'Only applies to Contain images.',
              initialValue: 16,
              options: {
                list: [
                  { title: 'None', value: 0 },
                  { title: 'Small', value: 8 },
                  { title: 'Standard', value: 16 },
                  { title: 'Large', value: 24 },
                  { title: 'Extra large', value: 32 },
                ],
              },
              validation: Rule => Rule.required().min(0).max(32),
            }),
          ],
          preview: {
            select: {
              title: 'alt',
              media: 'image',
              fit: 'fit',
            },
            prepare({ title, media, fit }) {
              return {
                title: title || 'Untitled product image',
                subtitle: fit === 'cover' ? 'Cover' : 'Contain',
                media,
              }
            },
          },
        }),
      ],
      validation: Rule => Rule.required().min(1).max(12),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'productPath',
      media: 'images.0.image',
      enabled: 'enabled',
    },
    prepare({ title, subtitle, media, enabled }) {
      return {
        title: `${enabled === false ? 'Paused — ' : ''}${title || 'Untitled product'}`,
        subtitle,
        media,
      }
    },
  },
})
