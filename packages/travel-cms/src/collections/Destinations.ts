import { CollectionConfig } from 'payload/types';

export const Destinations: CollectionConfig = {
  slug: 'destinations',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'region', 'isPopular'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => user.role === 'admin' || user.role === 'editor',
    update: ({ req: { user } }) => user.role === 'admin' || user.role === 'editor',
    delete: ({ req: { user } }) => user.role === 'admin',
  },
  fields: [
    {
      name: 'name',
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
      name: 'region',
      type: 'select',
      options: [
        { label: 'Africa', value: 'africa' },
        { label: 'Asia', value: 'asia' },
        { label: 'Europe', value: 'europe' },
        { label: 'North America', value: 'north-america' },
        { label: 'South America', value: 'south-america' },
        { label: 'Oceania', value: 'oceania' },
        { label: 'Middle East', value: 'middle-east' },
      ],
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
    {
      name: 'highlights',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          options: [
            'beach',
            'mountain',
            'city',
            'food',
            'adventure',
            'culture',
            'wildlife',
            'history',
          ],
          required: true,
        },
      ],
    },
    {
      name: 'bestTimeToVisit',
      type: 'group',
      fields: [
        {
          name: 'from',
          type: 'select',
          options: [
            { label: 'January', value: 'january' },
            { label: 'February', value: 'february' },
            { label: 'March', value: 'march' },
            { label: 'April', value: 'april' },
            { label: 'May', value: 'may' },
            { label: 'June', value: 'june' },
            { label: 'July', value: 'july' },
            { label: 'August', value: 'august' },
            { label: 'September', value: 'september' },
            { label: 'October', value: 'october' },
            { label: 'November', value: 'november' },
            { label: 'December', value: 'december' },
          ],
          required: true,
        },
        {
          name: 'to',
          type: 'select',
          options: [
            { label: 'January', value: 'january' },
            { label: 'February', value: 'february' },
            { label: 'March', value: 'march' },
            { label: 'April', value: 'april' },
            { label: 'May', value: 'may' },
            { label: 'June', value: 'june' },
            { label: 'July', value: 'july' },
            { label: 'August', value: 'august' },
            { label: 'September', value: 'september' },
            { label: 'October', value: 'october' },
            { label: 'November', value: 'november' },
            { label: 'December', value: 'december' },
          ],
          required: true,
        },
      ],
    },
    {
      name: 'isPopular',
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

export default Destinations;
