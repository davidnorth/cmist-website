// schemaTypes/project.js
import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Headline',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'URL Slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Body Content',
      of: [{ type: 'block' }], // This enables the Rich Text editor
    }),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Featured Images',
      description: 'Drag to reorder. The first image is used as the cover on listing pages.',
      options: { layout: 'grid' },
      of: [
        {
          type: 'image',
          options: { hotspot: true }, // Allows editors to crop the image in the UI
        },
      ],
    }),
  ],
})
