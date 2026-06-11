import { defineField, defineType } from "sanity";

export const galleryItem = defineType({
  name: "galleryItem",
  title: "Gallery Item",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "caption", type: "text", rows: 3 }),
    defineField({ name: "tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "image", type: "image", options: { hotspot: true }, validation: (rule) => rule.required() }),
    defineField({ name: "imageAlt", type: "string" }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "caption",
      media: "image",
    },
  },
});
