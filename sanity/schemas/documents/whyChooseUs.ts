import { defineField, defineType } from "sanity";

export const whyChooseUs = defineType({
  name: "whyChooseUs",
  title: "Why Choose Us Section",
  type: "document",

  fields: [
    defineField({
      name: "label",
      title: "Section Label",
      type: "string",
      initialValue: "Why Choose Us",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      description: 'Example: "Your Adventure Starts Here"',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Section Description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "features",
      title: "Features",
      type: "array",
      validation: (Rule) => Rule.min(1),
      of: [
        defineField({
          name: "feature",
          title: "Feature",
          type: "object",

          fields: [
            defineField({
              name: "title",
              title: "Feature Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "description",
              title: "Feature Description",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "iconName",
              title: "Icon",
              type: "string",
              validation: (Rule) => Rule.required(),
              options: {
                list: [
                  { title: "Map Pinned", value: "MapPinned" },
                  { title: "Shield Check", value: "ShieldCheck" },
                  { title: "Compass", value: "Compass" },
                  { title: "Mountain", value: "Mountain" },
                  { title: "Users", value: "Users" },
                  { title: "Star", value: "Star" },
                  { title: "Globe", value: "Globe" },
                  { title: "Tent", value: "Tent" },
                  { title: "Award", value: "Award" },
                  { title: "Heart Handshake", value: "HeartHandshake" },
                ],
              },
            }),
          ],

          preview: {
            select: {
              title: "title",
            },
          },
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
    },
  },
});