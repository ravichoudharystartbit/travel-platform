import { Payload } from 'payload';

export async function seed(payload: Payload) {
  // Create admin user
  await payload.create({
    collection: 'users',
    data: {
      email: 'admin@example.com',
      password: 'password',
      role: 'admin',
    },
  });

  console.log('Seed data created successfully!');
}
