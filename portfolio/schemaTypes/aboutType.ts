import {defineField, defineType} from 'sanity'

export const aboutType = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  groups: [
    {
      name: 'personal',
      title: 'Personal',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'social',
      title: 'Social',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'seo',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'seo',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      group: 'seo',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'name',
      type: 'string',
      group: 'personal',
    }),
    defineField({
      name: 'headline',
      type: 'string',
      group: 'personal',
    }),
    defineField({
      name: 'email',
      type: 'string',
      group: 'personal',
    }),
    defineField({
      name: 'phone',
      type: 'string',
      group: 'personal',
    }),
    defineField({
      name: 'image',
      type: 'image',
      group: 'personal',
    }),
    defineField({
      name: 'bio',
      type: 'array',
      group: 'personal',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'socialLinks',
      type: 'array',
      group: 'personal',
      of: [{type: 'block'}],
    }),
  ],
})
