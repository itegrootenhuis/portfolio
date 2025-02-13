import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      type: 'string',
    }),
    defineField({
      name: 'projectType',
      type: 'string',
      options: {
        list: [
          {title: 'Kentico 13', value: 'Kentico 13'},
          {title: 'Xperience by Kentico', value: 'Xperience by Kentico'},
          {title: 'Kontent.ai', value: 'Kontent.ai'},
          {title: 'Custom Application', value: 'Custom Application'},
        ],
      },
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'techStack',
      type: 'array',
      of: [{type: 'block'}],
    }),

    defineField({
      name: 'challenge',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'solution',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
