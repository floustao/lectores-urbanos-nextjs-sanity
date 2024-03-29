import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'book',
  title: 'Book',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => [
        Rule.required()
          .min(2)
          .error('The title must be at least 2 characters long.'),
        Rule.required()
          .max(80)
          .warning('Long titles may break the design of the page.'),
      ],
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: (Rule) => [
        Rule.required()
          .min(2)
          .error('The name must be at least 2 characters long.'),
        Rule.required().max(40).warning('Short names are usually better.'),
      ],
    }),
    defineField({
      name: 'file',
      title: 'PDF File',
      type: 'file',
      options: {
        accept: '.pdf', // Specify the accepted file type(s)
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
})
