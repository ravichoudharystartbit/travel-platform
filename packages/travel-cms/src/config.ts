import { buildConfig } from 'payload/config';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { slateEditor } from '@payloadcms/richtext-slate';
import path from 'path';

// Collections
import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Tours } from './collections/Tours';
import { Destinations } from './collections/Destinations';

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    css: path.resolve(__dirname, 'styles/globals.scss'),
  },
  editor: slateEditor({}),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  collections: [Users, Media, Tours, Destinations],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  cors: [
    process.env.PAYLOAD_PUBLIC_SITE_URL || 'http://localhost:3001',
    'http://localhost:3000',
  ].filter(Boolean) as string[],
  csrf: [
    process.env.PAYLOAD_PUBLIC_SITE_URL || 'http://localhost:3001',
    'http://localhost:3000',
  ].filter(Boolean) as string[],
  plugins: [],
});
