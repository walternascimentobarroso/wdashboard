# UI Contracts: Dashboard UI Upgrade

**Purpose**: User interface contracts and component specifications
**Date**: 2026-03-23
**Feature**: 002-dashboard-ui-upgrade

## Layout Contract

### DashboardLayout Component

```typescript
interface DashboardLayoutProps {
  children: React.ReactNode
  className?: string
}

interface DashboardLayoutContract {
  // Layout structure
  header: HeaderComponent
  sidebar: SidebarComponent
  main: React.ReactNode

  // Responsive behavior
  mobileBehavior: 'drawer' | 'overlay'
  desktopBehavior: 'fixed' | 'static'

  // Theme support
  supportedThemes: ('light' | 'dark' | 'system')[]

  // Accessibility
  ariaLabels: {
    navigation: string
    toggle: string
    theme: string
  }
}
```

## Sidebar Contract

### Sidebar Component

```typescript
interface SidebarProps {
  expanded: boolean
  onToggle: () => void
  navigationItems: NavigationItem[]
  activeItem?: string
  className?: string
}

interface SidebarContract {
  // States
  states: {
    expanded: 'full' | 'collapsed'
    responsive: 'desktop' | 'mobile'
    mobile: 'open' | 'closed'
  }

  // Interactions
  interactions: {
    toggle: () => void
    navigate: (href: string) => void
    hover: (itemId: string) => void
  }

  // Visual requirements
  visual: {
    expandedWidth: string
    collapsedWidth: string
    transitionDuration: string
    iconSize: string
  }

  // Accessibility
  accessibility: {
    role: 'navigation'
    ariaLabel: string
    keyboardNavigation: boolean
    focusManagement: boolean
  }
}
```

## Header Contract

### Header Component

```typescript
interface HeaderProps {
  onSidebarToggle: () => void
  onThemeToggle: () => void
  currentTheme: 'light' | 'dark' | 'system'
  title?: string
  actions?: React.ReactNode
}

interface HeaderContract {
  // Content areas
  areas: {
    left: React.ReactNode
    center: React.ReactNode
    right: React.ReactNode
  }

  // Controls
  controls: {
    sidebarToggle: {
      icon: 'menu' | 'x'
      ariaLabel: string
    }
    themeToggle: {
      icon: 'sun' | 'moon' | 'system'
      ariaLabel: string
    }
  }

  // Responsive behavior
  responsive: {
    mobileTitle: boolean
    hideActions: boolean
    compactLayout: boolean
  }
}
```

## Theme System Contract

### Theme Provider

```typescript
interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: 'light' | 'dark' | 'system'
  storageKey?: string
}

interface ThemeContract {
  // Theme modes
  modes: {
    light: ThemeColors
    dark: ThemeColors
    system: 'light' | 'dark'
  }

  // Color tokens
  colors: {
    background: string
    foreground: string
    primary: string
    secondary: string
    muted: string
    accent: string
    destructive: string
    border: string
    input: string
    ring: string
  }

  // Transitions
  transitions: {
    duration: string
    easing: string
  }

  // Persistence
  storage: {
    key: string
    syncAcrossTabs: boolean
  }
}
```

## Glass Effect Contract

### Glass Utility

```typescript
interface GlassEffectProps {
  variant?: 'light' | 'dark' | 'auto'
  blur?: number
  opacity?: number
  className?: string
}

interface GlassContract {
  // Visual properties
  properties: {
    backdropFilter: string
    backgroundColor: string
    border: string
  }

  // Variants
  variants: {
    light: GlassProperties
    dark: GlassProperties
    auto: GlassProperties
  }

  // Component support
  supportedComponents: ['Card', 'Dialog', 'Sheet', 'DropdownMenu']

  // Accessibility
  accessibility: {
    contrastRatio: number
    readability: 'excellent' | 'good' | 'poor'
  }
}
```

## Navigation Contract

### Navigation Item

```typescript
interface NavigationItem {
  id: string
  label: string
  icon: React.ComponentType
  href: string
  badge?: number
  disabled?: boolean
  external?: boolean
}

interface NavigationContract {
  // Item structure
  item: {
    required: ['id', 'label', 'icon', 'href']
    optional: ['badge', 'disabled', 'external']
  }

  // Grouping
  groups: {
    primary: NavigationItem[]
    secondary: NavigationItem[]
    footer: NavigationItem[]
  }

  // Behavior
  behavior: {
    activeState: boolean
    hoverState: boolean
    disabledState: boolean
    loadingState: boolean
  }

  // Accessibility
  accessibility: {
    ariaCurrent: 'page' | 'location' | undefined
    role: 'navigation'
    keyboardShortcuts: boolean
  }
}
```

## Responsive Contract

### Breakpoint System

```typescript
interface ResponsiveContract {
  // Breakpoints
  breakpoints: {
    sm: '640px'
    md: '768px'
    lg: '1024px'
    xl: '1280px'
    '2xl': '1536px'
  }

  // Layout adaptations
  adaptations: {
    mobile: {
      sidebar: 'drawer'
      header: 'compact'
      content: 'full-width'
    }
    tablet: {
      sidebar: 'collapsible'
      header: 'standard'
      content: 'padded'
    }
    desktop: {
      sidebar: 'fixed'
      header: 'standard'
      content: 'constrained'
    }
  }

  // Touch interactions
  touch: {
    swipeToClose: boolean
    tapToToggle: boolean
    longPress: boolean
  }
}
```

## Performance Contract

### Performance Requirements

```typescript
interface PerformanceContract {
  // Interaction timing
  interactions: {
    sidebarToggle: '<200ms'
    themeSwitch: '<300ms'
    pageLoad: '<10% increase'
  }

  // Animation performance
  animations: {
    frameRate: '60fps'
    dropFrames: '<2%'
    smoothness: 'excellent'
  }

  // Memory usage
  memory: {
    componentSize: '<100KB'
    stateSize: '<10KB'
    listenerCleanup: 'automatic'
  }

  // Accessibility performance
  a11y: {
    screenReader: 'immediate'
    keyboardNavigation: 'instant'
    focusManagement: 'predictable'
  }
}
```

## Component Integration Contract

### Existing Components

```typescript
interface ComponentIntegrationContract {
  // Charts module
  charts: {
    barChart: 'shadcn Card wrapper'
    lineChart: 'shadcn Card wrapper'
    container: 'glass variant support'
  }

  // Files module
  files: {
    fileList: 'shadcn Table'
    fileUpload: 'shadcn Button + Input'
    preview: 'shadcn Dialog'
  }

  // Logs module
  logs: {
    logViewer: 'shadcn ScrollArea'
    filters: 'shadcn Select + Input'
    export: 'shadcn Button'
  }

  // Auth module
  auth: {
    loginForm: 'shadcn Form + Input + Button'
    userProfile: 'shadcn Avatar + Dropdown'
    logout: 'shadcn Button'
  }
}
```

## Testing Contract

### Test Requirements

```typescript
interface TestingContract {
  // Unit tests
  unit: {
    components: '100% coverage'
    hooks: '100% coverage'
    utilities: '100% coverage'
  }

  // Integration tests
  integration: {
    themeSwitching: 'complete'
    sidebarInteraction: 'complete'
    responsiveBehavior: 'complete'
  }

  // E2E tests
  e2e: {
    userFlows: 'critical paths'
    accessibility: 'WCAG 2.1 AA'
    performance: 'benchmarks'
  }

  // Visual regression
  visual: {
    themes: 'light + dark'
    breakpoints: 'mobile + tablet + desktop'
    states: 'normal + hover + focus'
  }
}
```

## Migration Contract

### Migration Strategy

```typescript
interface MigrationContract {
  // Phase 1: Setup
  setup: {
    shadcnInstallation: 'automated'
    tailwindConfig: 'automated'
    baseComponents: 'manual'
  }

  // Phase 2: Layout
  layout: {
    wrapperCreation: 'manual'
    existingPages: 'gradual'
    testing: 'per-page'
  }

  // Phase 3: Features
  features: {
    sidebar: 'independent'
    theme: 'independent'
    glass: 'independent'
  }

  // Phase 4: Migration
  migration: {
    componentMapping: 'manual'
    logicPreservation: 'verified'
    rollbackPlan: 'documented'
  }
}
```

## Compliance Contract

### Constitution Compliance

```typescript
interface ConstitutionComplianceContract {
  // Non-breaking changes
  nonBreaking: {
    apiCompatibility: '100%'
    functionality: '100%'
    userWorkflows: '100%'
  }

  // Progressive enhancement
  progressive: {
    featureIndependence: 'verified'
    incrementalDeployment: 'supported'
    rollbackCapability: 'supported'
  }

  // Clean architecture
  architecture: {
    uiServicesSeparation: 'maintained'
    moduleBoundaries: 'respected'
    coupling: 'minimal'
  }

  // Reusability
  reusability: {
    genericComponents: 'verified'
    projectAgnostic: 'verified'
    businessLogic: 'separated'
  }
}
```
