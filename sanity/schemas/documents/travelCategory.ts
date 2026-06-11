import { defineField, defineType } from "sanity";

export const travelCategory = defineType({
  name: "travelCategoriesSection",
  title: "Travel Categories Section",
  type: "document",
  fields: [
    // --- Section Header Content ---
    defineField({
      name: "sectionTagline",
      title: "Section Tagline",
      type: "string",
      initialValue: "Travel Categories",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heading",
      title: "Main Heading",
      type: "string",
      initialValue: "Explore Nepal Your Way",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      initialValue: "Every traveler is unique, and so is every journey. Choose from a wide range of travel experiences designed to match your interests, travel style, and adventure level.",
      validation: (Rule) => Rule.required(),
    }),

    // --- Categories Array ---
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [
        {
          type: "object",
          name: "category",
          title: "Category Item",
          fields: [
            defineField({
              name: "label",
              title: "Category Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "teaser",
              title: "Teaser / Short Description",
              type: "text",
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "image",
              title: "Background Image",
              type: "image",
              options: {
                hotspot: true, // Allows accurate cropping for your aspect ratios
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "slug",
              title: "Slug (For Links)",
              type: "slug",
              options: {
                source: (doc, ctx) => ctx.parent?.label || "",
                maxLength: 96,
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "label",
              media: "image",
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
});