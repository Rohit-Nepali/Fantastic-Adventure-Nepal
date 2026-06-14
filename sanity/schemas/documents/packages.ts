// schemas/package.ts

import { defineField, defineType } from "sanity";

export const packageSchema = defineType({
  name: "package",
  title: "Package",
  type: "document",
  groups: [
    { name: "basic",     title: "Basic Info" },
    { name: "details",   title: "Trip Details" },
    { name: "content",   title: "Content" },
    { name: "logistics", title: "Logistics" },
  ],
  fields: [
    // ─── Basic Info ───────────────────────────────────────────────
    defineField({
      name: "title",
      title: "Package Title",
      type: "string",
      group: "basic",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "basic",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      group: "basic",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bannerImage",
      title: "Banner Image",
      type: "image",
      group: "basic",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Additional Images",
      type: "array",
      group: "basic",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "shortIntro",
      title: "Short Introduction",
      type: "text",
      rows: 3,
      group: "basic",
      description: "2–3 sentences shown in the hero section",
      validation: (Rule) => Rule.required().max(400),
    }),
    defineField({
      name: "overview",
      title: "Overview",
      type: "array",
      group: "basic",
      of: [{ type: "block" }],
      description: "Full description shown in the Overview tab",
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      group: "basic",
      validation: (Rule) => Rule.min(0).max(5).precision(1),
    }),
    defineField({
      name: "isFeatured",
      title: "Featured Package",
      type: "boolean",
      group: "basic",
      description: "Show this package in featured/highlighted sections",
      initialValue: false,
    }),

    // ─── Trip Details ─────────────────────────────────────────────
    defineField({
      name: "price",
      title: "Starting Price (USD)",
      type: "number",
      group: "details",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      group: "details",
      description: "e.g. 14 Days / 13 Nights",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "destination",
      title: "Destination",
      type: "string",
      group: "details",
      description: "e.g. Everest Region",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "difficulty",
      title: "Difficulty Level",
      type: "string",
      group: "details",
      options: {
        list: [
          { title: "Easy",           value: "Easy" },
          { title: "Easy-Moderate",  value: "Easy-Moderate" },
          { title: "Moderate",       value: "Moderate" },
          { title: "Moderate-Hard",  value: "Moderate-Hard" },
          { title: "Hard",           value: "Hard" },
          { title: "Extreme",        value: "Extreme" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "maxAltitude",
      title: "Maximum Altitude",
      type: "string",
      group: "details",
      description: "e.g. 5,364m / 17,598ft",
    }),
    defineField({
      name: "groupSize",
      title: "Group Size",
      type: "string",
      group: "details",
      description: "e.g. 1–12 People",
    }),
    defineField({
      name: "bestSeason",
      title: "Best Season",
      type: "string",
      group: "details",
      description: "e.g. Spring & Autumn",
    }),
    defineField({
      name: "accommodation",
      title: "Accommodation",
      type: "string",
      group: "details",
      description: "e.g. Tea House / Hotel / Camping",
    }),
    defineField({
      name: "transportation",
      title: "Transportation",
      type: "string",
      group: "details",
      description: "e.g. Flight + Private Vehicle",
    }),
    defineField({
      name: "meals",
      title: "Meals",
      type: "string",
      group: "details",
      description: "e.g. Breakfast & Dinner Included",
    }),

    // ─── Content ──────────────────────────────────────────────────
    defineField({
      name: "highlights",
      title: "Trip Highlights",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "itinerary",
      title: "Itinerary",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          name: "itineraryDay",
          title: "Day",
          fields: [
            defineField({
              name: "dayNumber",
              title: "Day Number",
              type: "number",
              validation: (Rule) => Rule.required().positive().integer(),
            }),
            defineField({
              name: "title",
              title: "Day Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 4,
            }),
            defineField({
              name: "elevation",
              title: "Elevation",
              type: "string",
            }),
            defineField({
              name: "walkingHours",
              title: "Walking Hours",
              type: "string",
            }),
            defineField({
              name: "distance",
              title: "Distance",
              type: "string",
            }),
            defineField({
              name: "meals",
              title: "Meals",
              type: "string",
            }),
            defineField({
              name: "accommodation",
              title: "Accommodation",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "dayNumber" },
            prepare({ title, subtitle }) {
              return { 
                title: subtitle ? `Day ${subtitle}: ${title || "Untitled"}` : `${title || "New Day"}` 
              };
            }
          },
        },
      ],
    }),
    defineField({
      name: "costIncludes",
      title: "Cost Includes",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "costExcludes",
      title: "Cost Excludes",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "essentialInfo",
      title: "Essential Information",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          name: "essentialInfoItem",
          title: "Info Item",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "body",
              title: "Body",
              type: "array",
              of: [{ type: "block" }],
            }),
          ],
          preview: {
            select: { title: "title" },
          },
        },
      ],
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          name: "faqItem",
          title: "FAQ",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "question" },
          },
        },
      ],
    }),

    // ─── Logistics ────────────────────────────────────────────────
    defineField({
      name: "departures",
      title: "Fixed Departures",
      type: "array",
      group: "logistics",
      of: [
        {
          type: "object",
          name: "departure",
          title: "Departure",
          fields: [
            defineField({
              name: "date",
              title: "Departure Date",
              type: "date",
              options: { dateFormat: "YYYY-MM-DD" },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "availability",
              title: "Availability",
              type: "string",
              options: {
                list: [
                  { title: "Available",  value: "Available" },
                  { title: "Guaranteed", value: "Guaranteed" },
                  { title: "Full",       value: "Full" },
                ],
                layout: "radio",
              },
              initialValue: "Available",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "price",
              title: "Price (USD)",
              type: "number",
              description: "Leave empty to use the package starting price",
            }),
          ],
          preview: {
            select: { title: "date", subtitle: "availability" },
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      title:    "title",
      subtitle: "destination",
      media:    "bannerImage",
    },
  },
});