# Updated Architecture: Multi-Repository Travel Platform

## 🎯 **Recommended Approach: Multi-Repository with Shared Components**

Based on your requirement (1 owner, multiple sites), this approach is simpler, more maintainable, and gives you better flexibility.

## 🏗️ **Project Structure**

```
travel-platform/
├── packages/                           # Shared packages
│   ├── ui-components/                  # Shared UI library
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── Hero/
│   │   │   │   ├── TourCard/
│   │   │   │   ├── DestinationCard/
│   │   │   │   └── BookingForm/
│   │   │   ├── layouts/
│   │   │   └── utils/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── travel-cms/                     # Shared CMS configuration
│   │   ├── src/
│   │   │   ├── collections/
│   │   │   │   ├── Tours.ts
│   │   │   │   ├── Destinations.ts
│   │   │   │   ├── Bookings.ts
│   │   │   │   └── Reviews.ts
│   │   │   ├── blocks/
│   │   │   ├── globals/
│   │   │   └── utilities/
│   │   ├── package.json
│   │   └── payload.config.ts
│   │
│   └── shared-utils/                   # Common utilities
│       ├── src/
│       │   ├── api/
│       │   ├── hooks/
│       │   ├── types/
│       │   └── constants/
│       └── package.json
│
├── sites/                              # Individual travel sites
│   ├── luxury-travel/                  # Site 1: Luxury Travel
│   │   ├── src/
│   │   │   ├── app/
│   │   │   ├── components/             # Site-specific components
│   │   │   └── styles/
│   │   ├── public/
│   │   ├── package.json
│   │   ├── next.config.js
│   │   └── .env.local
│   │
│   ├── adventure-tours/                # Site 2: Adventure Tours
│   │   ├── src/
│   │   ├── public/
│   │   ├── package.json
│   │   └── .env.local
│   │
│   └── family-vacations/               # Site 3: Family Vacations
│       ├── src/
│       ├── public/
│       ├── package.json
│       └── .env.local
│
├── package.json                        # Root package.json (monorepo)
├── pnpm-workspace.yaml                 # PNPM workspace config
└── README.md
```

## 🎨 **Implementation Strategy**

### **Phase 1: Create Shared Packages**

#### **1. Shared UI Components Package**
```typescript
// packages/ui-components/src/components/TourCard/index.tsx
export interface TourCardProps {
  tour: {
    title: string;
    price: number;
    image: string;
    duration: string;
    destination: string;
  };
  variant?: 'default' | 'luxury' | 'adventure' | 'family';
}

export const TourCard: React.FC<TourCardProps> = ({ tour, variant = 'default' }) => {
  const variantClasses = {
    default: 'bg-white border-gray-200',
    luxury: 'bg-gradient-to-br from-gold-50 to-gold-100 border-gold-200',
    adventure: 'bg-gradient-to-br from-green-50 to-green-100 border-green-200',
    family: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200',
  };

  return (
    <div className={`rounded-lg border ${variantClasses[variant]} p-6`}>
      {/* Tour card content */}
    </div>
  );
};
```

#### **2. Shared CMS Package**
```typescript
// packages/travel-cms/src/collections/Tours.ts
import type { CollectionConfig } from 'payload';

export const Tours: CollectionConfig = {
  slug: 'tours',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'destination', 'price', 'updatedAt'],
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
      type: 'textarea',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'duration',
      type: 'group',
      fields: [
        {
          name: 'days',
          type: 'number',
          required: true,
        },
        {
          name: 'nights',
          type: 'number',
          required: true,
        },
      ],
    },
    // ... more fields
  ],
};
```

### **Phase 2: Create Individual Sites**

#### **Each Site Structure:**
```typescript
// sites/luxury-travel/src/app/page.tsx
import { Hero } from '@travel-platform/ui-components';
import { TourCard } from '@travel-platform/ui-components';
import { getPayload } from 'payload';

export default async function HomePage() {
  const payload = await getPayload();
  const tours = await payload.find({
    collection: 'tours',
    where: { featured: { equals: true } },
    limit: 6,
  });

  return (
    <main>
      <Hero 
        variant="luxury"
        title="Luxury Travel Experiences"
        subtitle="Discover the world in unparalleled comfort"
      />
      
      <section className="py-16">
        <div className="container">
          <h2>Featured Tours</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.docs.map((tour) => (
              <TourCard key={tour.id} tour={tour} variant="luxury" />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
```

### **Phase 3: Site-Specific Customization**

#### **Individual Branding:**
```typescript
// sites/luxury-travel/src/styles/globals.css
@import '@travel-platform/ui-components/styles';

:root {
  --primary-color: #d4af37;      /* Gold */
  --secondary-color: #1a1a1a;    /* Black */
  --accent-color: #ffffff;       /* White */
}

// sites/adventure-tours/src/styles/globals.css
@import '@travel-platform/ui-components/styles';

:root {
  --primary-color: #22c55e;      /* Green */
  --secondary-color: #1f2937;    /* Dark Gray */
  --accent-color: #f59e0b;       /* Orange */
}
```

## 🚀 **Deployment Strategy**

### **Individual Deployments:**
```yaml
# Each site gets its own Vercel project
luxury-travel/
├── vercel.json
└── .env.production

adventure-tours/
├── vercel.json
└── .env.production

family-vacations/
├── vercel.json
└── .env.production
```

### **Shared Package Updates:**
```bash
# When you update shared components
cd packages/ui-components
npm version patch
npm publish

# Each site updates independently
cd sites/luxury-travel
npm update @travel-platform/ui-components
```

## 💾 **Database Strategy**

### **Separate Supabase Projects:**
```
Luxury Travel Site
├── Database: luxury-travel-db
├── Storage: luxury-travel-storage
└── Auth: luxury-travel-auth

Adventure Tours Site
├── Database: adventure-tours-db
├── Storage: adventure-tours-storage
└── Auth: adventure-tours-auth
```

## 🎯 **Benefits of This Approach**

### **1. Simplicity**
- Each site is a standard Next.js app
- No complex multi-tenant logic
- Easier debugging and development

### **2. Performance**
- Independent hosting and databases
- No shared resource bottlenecks
- Site-specific optimization

### **3. Flexibility**
- Each site can have unique features
- Independent deployment schedules
- Custom domain configurations

### **4. Maintainability**
- Shared components reduce duplication
- Updates can be applied selectively
- Clear separation of concerns

### **5. Cost Efficiency**
- Pay only for what each site uses
- Can scale sites independently
- No over-provisioning

## 📋 **Development Workflow**

### **1. Monorepo Setup:**
```bash
# Install dependencies for all packages
pnpm install

# Develop shared components
cd packages/ui-components
pnpm dev

# Develop individual site
cd sites/luxury-travel
pnpm dev
```

### **2. Component Development:**
```bash
# Create new shared component
cd packages/ui-components
# Add component
# Publish package

# Use in sites
cd sites/luxury-travel
pnpm add @travel-platform/ui-components@latest
```

This approach gives you the benefits of code reuse without the complexity of multi-tenancy, perfect for your use case! 