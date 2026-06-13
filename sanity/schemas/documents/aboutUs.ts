import { defineField, defineType } from 'sanity'

export const aboutUs = defineType({
  name: 'aboutUs',
  title: 'About Us',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Main Title',
      type: 'string',
      initialValue: 'Welcome to Fantastic Adventure Nepal',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'subtitle',
      title: 'Company Tagline',
      type: 'string',
      description: 'e.g. "Government-registered trekking, tour & adventure company based in Kathmandu"',
    }),

    defineField({
      name: 'description',
      title: 'About Description',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Main body — who you are, mission, what you offer.',
    }),

    defineField({
      name: 'closingLine',
      title: 'Closing Line',
      type: 'string',
      description: 'e.g. "Join us and discover why Nepal remains one of the world\'s most extraordinary adventure destinations."',
    }),

    defineField({
      name: 'whyTravelWithUs',
      title: 'Why Travel With Us',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'point',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon Image',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'e.g. "Local Himalayan Experts"',
            }),
          ],
          preview: {
            select: { title: 'label' },
          },
        },
      ],
    }),

    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
          ],
        },
      ],
    }),
  ],

  preview: {
    select: { title: 'title' },
  },
})