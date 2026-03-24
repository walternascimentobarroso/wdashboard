# Quickstart Guide: Dashboard Template

**Purpose**: Quick setup and development guide for Dashboard Template
**Created**: 2026-03-23
**Feature**: Dashboard Template

## Prerequisites

- Node.js 18+
- npm or yarn package manager
- Basic knowledge of React and TypeScript
- Understanding of Next.js App Router

## Installation

### 1. Clone and Setup

```bash
git clone <repository-url>
cd dashboard-template
npm install
```

### 2. Environment Configuration

```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

### 3. Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Project Structure Overview

```
dashboard-template/
├── app/                   # Next.js App Router pages
│   ├── login/            # Authentication pages
│   ├── dashboard/        # Main dashboard
│   ├── users/           # User management
│   ├── files/           # File upload
│   ├── logs/            # System logs
│   ├── settings/        # Settings page
│   └── layout.tsx       # Root layout
├── components/           # Reusable components
│   ├── ui/              # shadcn/ui components
│   ├── layout/          # Layout components
│   ├── shared/          # Shared components
│   └── charts/          # Chart components
├── modules/             # Feature modules
│   ├── auth/           # Authentication module
│   ├── users/          # Users module
│   ├── files/          # Files module
│   ├── logs/           # Logs module
│   ├── dashboard/      # Dashboard module
│   └── settings/       # Settings module
├── services/           # API service layer
├── types/              # TypeScript types
├── lib/                # Utilities
└── middleware.ts       # Route protection
```

## Getting Started

### Default Login Credentials

```
Email: admin@example.com
Password: password123
```

### Navigation

Once logged in, you'll see:

- **Dashboard**: Overview with KPIs and charts
- **Users**: User management with CRUD operations
- **Files**: File upload and status tracking
- **Logs**: System logs viewer
- **Settings**: Feature flags and configuration

## Development Guide

### Adding New Modules

1. **Create Module Structure**

```bash
mkdir modules/new-feature
cd modules/new-feature
mkdir components services types
```

2. **Define Types**

```typescript
// modules/new-feature/types/index.ts
export interface NewFeatureItem {
  id: string
  name: string
  // ... other properties
}
```

3. **Create Service**

```typescript
// modules/new-feature/services/api.ts
import { BaseMockService } from '@/services/api'

export class NewFeatureService extends BaseMockService {
  async getItems() {
    await this.delay(200)
    return this.createResponse(mockData)
  }
}
```

4. **Create Components**

```typescript
// modules/new-feature/components/ItemList.tsx
'use client';

import { useNewFeatureItems } from '../hooks/useItems';

export function ItemList() {
  const { data, isLoading, error } = useNewFeatureItems();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

5. **Add Route**

```typescript
// app/new-feature/page.tsx
import { ItemList } from '@/modules/new-feature/components/ItemList';

export default function NewFeaturePage() {
  return <ItemList />;
}
```

### Using the Mock API

All data operations go through the service layer:

```typescript
// Example: Fetching users
import { useUsers } from '@/modules/users/hooks/useUsers'

function UsersPage() {
  const { data, isLoading, error } = useUsers({
    page: 1,
    limit: 10,
    search: '',
  })

  // Component implementation
}
```

### Custom Components

Follow the established patterns:

```typescript
// components/shared/LoadingSpinner.tsx
import { Loader2 } from 'lucide-react';

export function LoadingSpinner({ size = 'md' }) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <Loader2 className={`animate-spin ${sizeClasses[size]}`} />
  );
}
```

## Styling Guide

### Using Tailwind Classes

```typescript
// Consistent spacing and colors
<div className="p-6 bg-white rounded-lg shadow-sm border">
  <h2 className="text-lg font-semibold text-gray-900">
    Section Title
  </h2>
</div>
```

### shadcn/ui Components

```typescript
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ExampleComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  );
}
```

## State Management

### React Query Patterns

```typescript
// Custom hook for data fetching
export function useUsers(params: GetUsersParams) {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => usersService.getUsers(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Mutation for data changes
export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (user: CreateUserRequest) => usersService.createUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('User created successfully')
    },
    onError: (error) => {
      toast.error('Failed to create user')
    },
  })
}
```

## Testing

### Unit Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### E2E Tests

```bash
# Install Playwright browsers
npx playwright install

# Run E2E tests
npm run test:e2e
```

## Common Tasks

### Adding New KPIs

1. Update `mockDashboardService.getKPIs()`
2. Add KPI type definition
3. Update dashboard component to display new KPI

### Adding New Table Columns

1. Update type definitions
2. Add column to table component
3. Update service filters if needed

### Customizing Theme

1. Edit `tailwind.config.js`
2. Update CSS variables in `app/globals.css`
3. Test across all components

## Deployment

### Build for Production

```bash
npm run build
npm start
```

### Environment Variables

```bash
# .env.production
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_API_URL=https://api.your-domain.com
```

## Troubleshooting

### Common Issues

**Build Errors**

- Check TypeScript types in `types/` directory
- Ensure all imports are correct
- Verify environment variables

**Mock API Not Working**

- Check service implementations in `services/`
- Verify React Query query keys
- Check network tab in browser dev tools

**Styling Issues**

- Verify Tailwind CSS imports
- Check component class names
- Ensure shadcn/ui components are properly installed

**Authentication Issues**

- Check middleware configuration
- Verify token storage
- Check protected route definitions

## Best Practices

### Code Organization

- Keep components focused and small
- Use consistent naming conventions
- Separate business logic from UI
- Follow the established module structure

### Performance

- Use React Query for data caching
- Implement proper loading states
- Optimize bundle size with code splitting
- Use React.memo for expensive components

### Accessibility

- Use semantic HTML elements
- Add proper ARIA labels
- Ensure keyboard navigation
- Test with screen readers

### Security (Mock)

- Follow authentication patterns
- Validate inputs on both client and server
- Use proper error handling
- Implement proper logging

## Next Steps

1. **Explore Modules**: Browse each module to understand the patterns
2. **Customize UI**: Modify colors, layouts, and components
3. **Add Features**: Implement new modules following the established patterns
4. **Integrate Real Backend**: Replace mock services with real API calls
5. **Deploy**: Set up production deployment

## Support

- Check the `docs/` directory for detailed documentation
- Review the component examples in `components/`
- Examine the service patterns in `services/`
- Look at the test examples in `__tests__/`

## Contributing

When contributing to the template:

1. Follow the established patterns
2. Add proper TypeScript types
3. Include tests for new features
4. Update documentation
5. Ensure accessibility compliance
