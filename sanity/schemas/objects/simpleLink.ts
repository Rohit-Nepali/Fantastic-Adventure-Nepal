import { defineField, defineType } from "sanity";

export const simpleLink = defineType({
  name: "simpleLink",
  title: "Simple Link",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "href", type: "string", validation: (rule) => rule.required() }),
  ],
});
