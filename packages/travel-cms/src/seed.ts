import { Payload } from 'payload';
import { Config as GeneratedTypes } from 'payload/generated-types';

interface SeedData {
  users: Array<{
    email: string;
    name: string;
    password: string;
    role: 'admin' | 'editor' | 'user';
  }>;
  destinations: Array<{
    name: string;
    slug: string;
    region: string;
    description: any;
    isPopular: boolean;
  }>;
}

export async function seed(payload: Payload) {
  // Clear existing data
  await Promise.all([
    payload.delete({
      collection: 'users',
      where: {},
    }),
    payload.delete({
      collection: 'media',
      where: {},
    }),
    payload.delete({
      collection: 'destinations',
      where: {},
    }),
    payload.delete({
      collection: 'tours',
      where: {},
    }),
  ]);

  // Create admin user
  const adminUser = await payload.create({
    collection: 'users',
    data: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: 'password',
      role: 'admin',
    },
  });

  // Create sample destinations
  const destinations = await Promise.all([
    payload.create({
      collection: 'destinations',
      data: {
        name: 'Bali',
        slug: 'bali',
        region: 'asia',
        description: [
          {
            children: [
              {
                text: 'Bali is an Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs. The island is home to religious sites such as cliffside Uluwatu Temple.',
              },
            ],
          },
        ],
        isPopular: true,
      },
    }),
    payload.create({
      collection: 'destinations',
      data: {
        name: 'Santorini',
        slug: 'santorini',
        region: 'europe',
        description: [
          {
            children: [
              {
                text: 'Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape.',
              },
            ],
          },
        ],
        isPopular: true,
      },
    }),
  ]);

  // Create sample tours
  await Promise.all([
    payload.create({
      collection: 'tours',
      data: {
        title: 'Bali Adventure Tour',
        slug: 'bali-adventure-tour',
        description: [
          {
            children: [
              {
                text: 'Experience the best of Bali with this 7-day adventure tour. Explore ancient temples, hike volcanoes, and relax on pristine beaches.',
              },
            ],
          },
        ],
        destination: destinations[0].id,
        price: 1299,
        duration: {
          days: 7,
          nights: 6,
        },
        included: [
          '6 nights accommodation',
          'Daily breakfast',
          'Airport transfers',
          'Guided tours',
          'Entrance fees',
        ],
        isFeatured: true,
      },
    }),
    payload.create({
      collection: 'tours',
      data: {
        title: 'Santorini Sunset Experience',
        slug: 'santorini-sunset-experience',
        description: [
          {
            children: [
              {
                text: 'Discover the magic of Santorini with this 5-day luxury experience. Enjoy breathtaking sunsets, private yacht tours, and gourmet dining.',
              },
            ],
          },
        ],
        destination: destinations[1].id,
        price: 2499,
        duration: {
          days: 5,
          nights: 4,
        },
        included: [
          '4 nights in a luxury suite',
          'Daily breakfast and dinner',
          'Private yacht tour',
          'Wine tasting experience',
          'Airport transfers',
        ],
        isFeatured: true,
      },
    }),
  ]);

  console.log('Seed data created successfully!');
  process.exit(0);
}
