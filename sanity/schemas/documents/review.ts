import { defineField, defineType } from "sanity";

export const review = defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    defineField({ name: "travelerName", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "country", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "review", type: "text", validation: (rule) => rule.required() }),
    defineField({ name: "rating", type: "number", validation: (rule) => rule.min(1).max(5).required() }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "imageAlt", type: "string" }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
  ],
  preview: {
    select: {
      title: "travelerName",
      subtitle: "country",
      media: "image",
    },
  },
});
