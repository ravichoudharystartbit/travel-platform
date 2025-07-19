# Travel Platform Monorepo

A monorepo containing multiple travel websites powered by a shared Payload CMS backend and UI components.

## Project Structure

```
travel-platform/
├── packages/                           # Shared packages
│   ├── ui-components/                 # Shared UI library
│   ├── travel-cms/                    # Shared CMS configuration
│   └── shared-utils/                  # Common utilities
└── sites/                             # Individual travel sites
    ├── luxury-travel/                 # Site 1: Luxury Travel
    ├── adventure-tours/               # Site 2: Adventure Tours
    └── family-vacations/              # Site 3: Family Vacations
```

## Prerequisites

- Node.js 18+
- pnpm 8+
- MongoDB 6.0+

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/travel-platform.git
   cd travel-platform
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your configuration.

4. **Start the development servers**
   ```bash
   # Start the CMS and all sites in development mode
   pnpm dev
   ```

5. **Access the applications**
   - Payload CMS Admin: http://localhost:3000/admin
   - Luxury Travel: http://localhost:3001
   - Adventure Tours: http://localhost:3002
   - Family Vacations: http://localhost:3003

## Available Scripts

- `pnpm dev` - Start all packages and sites in development mode
- `pnpm build` - Build all packages and sites for production
- `pnpm lint` - Lint all packages and sites
- `pnpm format` - Format code using Prettier

## Development Workflow

### Adding a new site

1. Create a new Next.js application in the `sites` directory
2. Add the site to the root `package.json` scripts
3. Update the `pnpm-workspace.yaml` if needed
4. Start developing with the shared packages

### Working with the shared UI components

1. Navigate to `packages/ui-components`
2. Make your changes to the components
3. The changes will be automatically reflected in all sites using HMR

### Working with the CMS

1. Navigate to `packages/travel-cms`
2. Make your changes to the collections or configuration
3. The CMS will automatically reload with your changes

## Deployment

Each site can be deployed independently. Refer to the individual site's README for specific deployment instructions.

## License

MIT