import { CollectionConfig } from 'payload/types';

export const Tours: CollectionConfig = {
  slug: 'tours',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'destination', 'price', 'duration', 'isFeatured'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => user.role === 'admin' || user.role === 'editor',
    update: ({ req: { user } }) => user.role === 'admin' || user.role === 'editor',
    delete: ({ req: { user } }) => user.role === 'admin',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'destination',
      type: 'relationship',
      relationTo: 'destinations',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'duration',
      type: 'group',
      fields: [
        {
          name: 'days',
          type: 'number',
          required: true,
          min: 1,
        },
        {
          name: 'nights',
          type: 'number',
          required: true,
          min: 0,
        },
      ],
    },
    {
      name: 'included',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'itinerary',
      type: 'array',
      fields: [
        {
          name: 'day',
          type: 'number',
          required: true,
          min: 1,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          required: true,
        },
      ],
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'keywords',
          type: 'text',
        },
      ],
    },
  ],
  timestamps: true,
};

export default Tours;
