import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Person Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Company / Title',
      type: 'string',
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'rating',
      title: 'Star Rating',
      type: 'number',
      options: { list: [3, 4, 5] },
      initialValue: 5,
    }),
    defineField({
      name: 'featured',
      title: 'Show on homepage?',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'company', media: 'photo' },
  },
})
