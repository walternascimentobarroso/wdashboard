# Data Model: Dashboard UI Upgrade

**Purpose**: Data entities and state management for Dashboard UI Upgrade
**Date**: 2026-03-23
**Feature**: 002-dashboard-ui-upgrade

## User Preferences Entity

### Description
Stores user interface preferences that persist across sessions

### Schema
```typescript
interface UserPreferences {
  sidebar: {
    expanded: boolean
    mobileOpen: boolean
  }
  theme: 'light' | 'dark' | 'system'
  glassEffects: boolean
}
```

### Fields
- **sidebar.expanded**: Boolean indicating if sidebar is in expanded state
- **sidebar.mobileOpen**: Boolean indicating if mobile drawer is open
- **theme**: User's preferred theme mode
- **glassEffects**: Boolean indicating if glass effects are enabled

### Validation Rules
- sidebar.expanded: must be boolean, defaults to true
- sidebar.mobileOpen: must be boolean, defaults to false
- theme: must be one of 'light', 'dark', 'system', defaults to 'system'
- glassEffects: must be boolean, defaults to true

### State Transitions
- Initial load: Read from localStorage or use defaults
- Theme change: Update theme value and persist
- Sidebar toggle: Update expanded state and persist
- Mobile drawer: Update mobileOpen state (no persistence needed)

## Sidebar State Entity

### Description
Current sidebar configuration and UI state

### Schema
```typescript
interface SidebarState {
  isExpanded: boolean
  isMobile: boolean
  isMobileOpen: boolean
  activeItem: string | null
}
```

### Fields
- **isExpanded**: Current expanded/collapsed state
- **isMobile**: Whether sidebar is in mobile mode
- **isMobileOpen**: Whether mobile drawer is open
- **activeItem**: Currently selected navigation item

### Validation Rules
- isExpanded: boolean, derived from user preferences
- isMobile: boolean, derived from screen width
- isMobileOpen: boolean, UI state only
- activeItem: string or null, defaults to null

### State Transitions
- Screen resize: Update isMobile based on breakpoint
- Toggle click: Update isExpanded and persist
- Mobile interaction: Update isMobileOpen
- Navigation: Update activeItem

## Theme Configuration Entity

### Description
Active theme settings and design tokens

### Schema
```typescript
interface ThemeConfig {
  mode: 'light' | 'dark'
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
  glass: {
    background: string
    border: string
  }
}
```

### Fields
- **mode**: Active theme mode (resolved from user preference)
- **colors**: Theme color palette
- **glass**: Glass effect styling values

### Validation Rules
- mode: must be 'light' or 'dark'
- colors: all values must be valid CSS colors
- glass: values must support transparency

### State Transitions
- Theme preference change: Update mode and color values
- System theme change: Update mode if preference is 'system'

## Glass Effect Configuration Entity

### Description
Configuration for glassmorphism visual effects

### Schema
```typescript
interface GlassEffectConfig {
  enabled: boolean
  blur: number
  opacity: number
  borderOpacity: number
}
```

### Fields
- **enabled**: Whether glass effects are active
- **blur**: Backdrop filter blur amount in pixels
- **opacity**: Background opacity value (0-1)
- **borderOpacity**: Border opacity value (0-1)

### Validation Rules
- enabled: boolean, defaults to true
- blur: number between 0-20, defaults to 10
- opacity: number between 0-0.3, defaults to 0.1
- borderOpacity: number between 0-0.5, defaults to 0.2

### State Transitions
- Toggle glass effects: Update enabled state and persist
- Theme change: Update opacity values for readability

## Navigation Item Entity

### Description
Sidebar navigation item configuration

### Schema
```typescript
interface NavigationItem {
  id: string
  label: string
  icon: string
  href: string
  badge?: number
  disabled?: boolean
}
```

### Fields
- **id**: Unique identifier for the item
- **label**: Display text for the item
- **icon**: Icon name or component
- **href**: Navigation target URL
- **badge**: Optional badge count
- **disabled**: Whether the item is disabled

### Validation Rules
- id: required, unique string
- label: required, non-empty string
- icon: required, valid icon identifier
- href: required, valid URL path
- badge: optional, non-negative integer
- disabled: optional, boolean, defaults to false

## State Management Architecture

### Global State
```typescript
interface AppState {
  userPreferences: UserPreferences
  sidebarState: SidebarState
  themeConfig: ThemeConfig
  glassEffectConfig: GlassEffectConfig
}
```

### Context Providers
1. **PreferencesContext**: Manages user preferences with localStorage persistence
2. **ThemeContext**: Provides theme configuration and resolved values
3. **SidebarContext**: Manages sidebar state and interactions

### Persistence Strategy
- **localStorage**: User preferences (sidebar state, theme, glass effects)
- **Session State**: Mobile drawer state, active navigation item
- **Derived State**: Theme configuration, responsive breakpoints

## Data Flow

1. **Initial Load**: 
   - Read preferences from localStorage
   - Initialize theme configuration
   - Set sidebar state based on preferences and screen size

2. **User Interactions**:
   - Update relevant state
   - Persist preference changes
   - Trigger UI re-renders

3. **Responsive Changes**:
   - Update mobile/desktop states
   - Adjust sidebar behavior
   - Maintain user preferences

## Integration Points

### Existing Modules
- **Auth Module**: No changes required
- **Dashboard Module**: UI updates only
- **Files Module**: UI updates only
- **Logs Module**: UI updates only

### Services Layer
- **API Services**: No changes required
- **State Management**: New UI-only state added
- **Utilities**: New theme and layout utilities added

## Performance Considerations

### State Updates
- Minimize re-renders with proper memoization
- Debounce resize events for responsive updates
- Use localStorage efficiently with batched writes

### Memory Management
- Clean up event listeners on unmount
- Avoid memory leaks in context providers
- Optimize component re-renders

## Testing Considerations

### Unit Tests
- State management logic
- Preference persistence
- Theme resolution
- Responsive behavior

### Integration Tests
- Sidebar interactions
- Theme switching
- Mobile responsiveness
- Glass effect rendering

### E2E Tests
- Complete user flows
- Cross-browser compatibility
- Accessibility compliance
- Performance benchmarks
