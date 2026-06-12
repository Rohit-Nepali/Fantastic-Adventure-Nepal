// schemas/travelCategories.ts

import { defineField, defineType } from "sanity";

export const travelCategories = defineType({
  name: "travelCategories",
  title: "Travel Categories",
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
      initialValue:
        "Every traveler is unique, and so is every journey. Choose from a wide range of travel experiences designed to match your interests, travel style, and adventure level.",
      validation: (Rule) => Rule.required(),
    }),

    // --- Categories as references to standalone category documents ---
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      description:
        "Select and order the categories to display on the homepage. Manage category content inside the Category document type.",
      of: [
        {
          type: "reference",
          to: [{ type: "category" }],
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
});