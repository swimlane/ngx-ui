# Lit Component Library Implementation Plan

## Overview
Create a Lit web component library that matches the styling and design system of the existing Angular `@swimlane/ngx-ui` library. Initial implementation will focus on Button and Input components.

## Project Structure

```
projects/swimlane/lit-ui/
├── src/
│   ├── components/
│   │   ├── button/
│   │   │   ├── button.component.ts
│   │   │   ├── button.styles.ts
│   │   │   ├── button-state.enum.ts
│   │   │   └── index.ts
│   │   ├── input/
│   │   │   ├── input.component.ts
│   │   │   ├── input.styles.ts
│   │   │   ├── input-types.enum.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── styles/
│   │   ├── tokens/
│   │   │   ├── colors.ts
│   │   │   ├── typography.ts
│   │   │   ├── spacing.ts
│   │   │   └── index.ts
│   │   ├── base.css.ts
│   │   ├── mixins/
│   │   │   ├── forms.ts
│   │   │   └── buttons.ts
│   │   └── index.ts
│   ├── utils/
│   │   ├── coerce.ts
│   │   └── index.ts
│   └── index.ts
├── demo/
│   ├── index.html
│   ├── src/
│   │   ├── main.ts
│   │   ├── components/
│   │   │   ├── button-demo.ts
│   │   │   └── input-demo.ts
│   │   └── styles/
│   │       └── demo.css
│   └── vite.config.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Phase 1: Project Setup

### 1.1 Initialize Project Structure
- Create `projects/swimlane/lit-ui` directory
- Initialize package.json with proper metadata
- Set up TypeScript configuration
- Configure build tooling (Vite for development and Rollup for production)

### 1.2 Install Dependencies
```json
{
  "dependencies": {
    "lit": "^3.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "vite": "^5.x",
    "@rollup/plugin-node-resolve": "^15.x",
    "@rollup/plugin-typescript": "^11.x",
    "@web/dev-server": "^0.4.x",
    "@web/test-runner": "^0.18.x",
    "@web/test-runner-playwright": "^0.11.x",
    "rollup": "^4.x",
    "rollup-plugin-copy": "^3.x"
  }
}
```

### 1.3 Build Configuration
- **Development**: Vite for fast HMR and dev server
- **Production**: Rollup for optimized bundles
- **Output**: ESM and UMD formats
- **Tree-shaking**: Ensure proper side-effect annotations

## Phase 2: Design Tokens

### 2.1 Color System
Create TypeScript/CSS design tokens matching the Angular library:

```typescript
// styles/tokens/colors.ts
export const colors = {
  // Blue
  blue100: 'rgb(224, 239, 255)',
  blue200: 'rgb(173, 212, 255)',
  blue300: 'rgb(122, 185, 255)',
  blue400: 'rgb(71, 158, 255)',
  blue500: 'rgb(20, 131, 255)',
  // ... all color tokens from _vars.scss
  
  // Grey
  grey050: 'rgb(235, 237, 242)',
  // ... all grey tokens
  
  // Semantic colors
  primary: 'var(--blue-400)',
  danger: 'var(--red-400)',
  warning: 'var(--orange-400)',
  success: 'var(--green-500)',
}
```

### 2.2 Typography System
```typescript
// styles/tokens/typography.ts
export const typography = {
  fontSizeBase: '16px',
  fontSizeXXS: '0.625rem',
  fontSizeXS: '0.75rem',
  fontSizeS: '0.875rem',
  fontSizeM: '1rem',
  fontSizeL: '1.125rem',
  fontSizeXL: '1.25rem',
  // ... all font sizes
  
  fontWeightLight: '300',
  fontWeightRegular: '400',
  fontWeightSemibold: '600',
  fontWeightBold: '700',
}
```

### 2.3 Spacing System
```typescript
// styles/tokens/spacing.ts
export const spacing = {
  spacing0: '0',
  spacing2: '2px',
  spacing4: '4px',
  spacing8: '8px',
  spacing10: '10px',
  spacing16: '16px',
  // ... standard spacing scale
}
```

### 2.4 Global CSS Variables
Export all design tokens as CSS custom properties:
```typescript
// styles/base.css.ts
import { css } from 'lit';

export const baseStyles = css`
  :host {
    /* Colors */
    --blue-100: rgb(224, 239, 255);
    --blue-200: rgb(173, 212, 255);
    /* ... all color variables */
    
    /* Typography */
    --font-size-base: 16px;
    --font-size-xxs: 0.625rem;
    /* ... all typography variables */
    
    /* Spacing */
    --spacing-0: 0;
    --spacing-2: 2px;
    /* ... all spacing variables */
  }
`;
```

## Phase 3: Button Component

### 3.1 Button Features
- **States**: active, in-progress, success, fail
- **Variants**: primary, warning, danger, link, bordered, default
- **Sizes**: small, medium (default), large
- **Disabled state**
- **Promise handling** (for async operations)
- **State icons**: spinner, checkmark, error icon

### 3.2 Button Properties
```typescript
@property({ type: String }) variant: 'default' | 'primary' | 'warning' | 'danger' | 'link' | 'bordered' = 'default';
@property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium';
@property({ type: Boolean }) disabled = false;
@property({ type: String }) state: 'active' | 'in-progress' | 'success' | 'fail' = 'active';
@property({ type: String }) type: 'button' | 'submit' | 'reset' = 'button';
@property({ type: Number }) timeout = 3000;
@property({ attribute: false }) promise?: Promise<any>;
```

### 3.3 Button Template Structure
```html
<button 
  type="${this.type}"
  ?disabled="${this.disabled}"
  class="${this.getButtonClasses()}"
  @click="${this._handleClick}">
  <span class="content">
    <slot></slot>
  </span>
  <span class="state-icon">
    ${this.renderStateIcon()}
  </span>
</button>
```

### 3.4 Button Styling
Match the Angular button styles exactly:
- Base button styles (border-radius, padding, font-weight)
- Color schemes for each variant
- Hover/focus states with proper outline
- Transition animations (200ms)
- State-specific styling (in-progress cursor, success/fail colors)
- Focus-visible support for accessibility

## Phase 4: Input Component

### 3.1 Input Features
- **Types**: text, password, email, number, textarea, tel, url
- **Floating label** with animation
- **Underline animation** on focus
- **Hint text** below input
- **Prefix/suffix slots** for icons or text
- **Validation states** (valid, invalid)
- **Disabled and readonly states**
- **Password visibility toggle**
- **Number input spinners**
- **Auto-sizing** for text inputs
- **Required indicator**

### 3.2 Input Properties
```typescript
@property({ type: String }) type: 'text' | 'password' | 'email' | 'number' | 'textarea' | 'tel' | 'url' = 'text';
@property({ type: String }) label = '';
@property({ type: String }) placeholder = '';
@property({ type: String }) hint = '';
@property({ type: String }) value = '';
@property({ type: String }) name = '';
@property({ type: Boolean }) disabled = false;
@property({ type: Boolean }) readonly = false;
@property({ type: Boolean }) required = false;
@property({ type: Boolean }) autofocus = false;
@property({ type: String }) requiredIndicator = '*';
@property({ type: String }) appearance: 'legacy' | 'fill' = 'legacy';
@property({ type: String }) size: 'sm' | 'md' | 'lg' = 'sm';
@property({ type: Boolean }) passwordToggleEnabled = false;
@property({ type: Number }) min?: number;
@property({ type: Number }) max?: number;
@property({ type: Number }) minlength?: number;
@property({ type: Number }) maxlength?: number;
```

### 3.3 Input Template Structure
```html
<div class="input-wrap">
  <div class="input-flex-wrap">
    <slot name="prefix"></slot>
    <div class="input-flex-wrap-inner">
      <div class="input-box-wrap">
        ${this.renderInput()}
        ${this.renderSpinner()}
        ${this.renderPasswordToggle()}
      </div>
      <label class="input-label" for="${this.id}">
        ${this.label}
        ${this.required ? html`<span>${this.requiredIndicator}</span>` : ''}
      </label>
    </div>
    <slot name="suffix"></slot>
  </div>
  <div class="input-underline">
    <div class="underline-fill"></div>
  </div>
  <div class="input-hint">
    <slot name="hint">${this.hint}</slot>
  </div>
</div>
```

### 3.4 Input Styling
Match the Angular input styles:
- Material-design inspired floating label
- Animated underline on focus (150ms ease)
- Fill appearance with background overlay
- Size variants (sm, md, lg)
- Color transitions for validation states
- Number input spinner styling
- Password toggle icon positioning

### 3.5 Input Behavior
- Form association (using `ElementInternals` API)
- Custom validation
- Focus/blur event handling
- Value change events
- Support for form reset
- Accessibility (ARIA labels, roles)

## Phase 5: Utilities and Mixins

### 5.1 Coercion Utilities
```typescript
// utils/coerce.ts
export function coerceBooleanProperty(value: any): boolean {
  return value != null && `${value}` !== 'false';
}

export function coerceNumberProperty(value: any, fallback: number | null = null): number | null {
  return isNaN(parseFloat(value)) || isNaN(Number(value)) ? fallback : Number(value);
}
```

### 5.2 Style Mixins
Create reusable CSS style functions:
```typescript
// styles/mixins/forms.ts
export const inputBoxMixin = css`
  display: block;
  max-width: 100%;
  margin-top: var(--spacing-16);
  margin-bottom: var(--spacing-8);
  line-height: calc(1em + 0.75em);
  padding-top: calc(0.75rem + 8px);
  padding-bottom: 0;
`;

export const inputLabelMixin = css`
  position: absolute;
  top: 0.5em;
  line-height: 1.1;
  pointer-events: none;
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-semibold);
  color: var(--grey-350);
  white-space: nowrap;
  overflow-x: clip;
  max-width: 100%;
  text-overflow: ellipsis;
  transition: color 0.2s ease-out, font-size 150ms ease-out, top 150ms ease-out;
`;
```

## Phase 6: Demo Application

### 6.1 Demo Structure
Create a Vite-powered demo application:
- Interactive playground for each component
- Show all variants and states
- Code examples
- Property documentation
- Accessibility notes

### 6.2 Demo Pages
- **Button Demo**: All variants, sizes, states, and combinations
- **Input Demo**: All types, appearances, validation states

### 6.3 Demo Features
- Live property editing
- Dark theme (matching ngx-ui)
- Responsive design
- Code snippets for each example

## Phase 7: Build and Distribution

### 7.1 Build Outputs
```
dist/
├── components/
│   ├── button.js
│   ├── button.d.ts
│   ├── input.js
│   └── input.d.ts
├── styles/
│   ├── tokens/
│   └── base.css
├── index.js
├── index.d.ts
└── package.json
```

### 7.2 Package Configuration
```json
{
  "name": "@swimlane/lit-ui",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    },
    "./button": {
      "types": "./dist/components/button.d.ts",
      "default": "./dist/components/button.js"
    },
    "./input": {
      "types": "./dist/components/input.d.ts",
      "default": "./dist/components/input.js"
    },
    "./styles": {
      "default": "./dist/styles/index.js"
    }
  },
  "customElements": "custom-elements.json"
}
```

### 7.3 NPM Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "build:lib": "rollup -c",
    "preview": "vite preview",
    "analyze": "vite-bundle-visualizer",
    "format": "prettier --write \"src/**/*.ts\"",
    "lint": "eslint src/**/*.ts",
    "test": "web-test-runner"
  }
}
```

## Phase 8: Documentation

### 8.1 README
- Installation instructions
- Quick start guide
- Component API documentation
- Examples
- Browser support
- Migration guide from ngx-ui

### 8.2 Component Documentation
For each component:
- Properties table
- Events table
- Slots documentation
- CSS custom properties
- Accessibility considerations
- Usage examples

### 8.3 Custom Elements Manifest
Generate `custom-elements.json` for IDE support and documentation tools

## Phase 9: Testing

### 9.1 Unit Tests
- Component rendering
- Property reactivity
- Event handling
- State management
- Form integration

### 9.2 Visual Regression Tests
- Compare against Angular components
- Test all variants and states
- Responsive behavior

### 9.3 Accessibility Tests
- Keyboard navigation
- Screen reader support
- ARIA attributes
- Focus management

## Phase 10: Integration

### 10.1 Framework Integration Examples
- Vanilla JS/HTML
- React
- Vue
- Angular

### 10.2 Styling Integration
- CSS custom properties override examples
- Theming guide
- Dark/light mode support

## Implementation Timeline

### Week 1: Foundation
- Project setup and tooling
- Design tokens implementation
- Base styles

### Week 2: Button Component
- Button implementation
- Button styling
- Button states and animations
- Button tests

### Week 3: Input Component
- Input implementation
- Input styling
- Input types and validation
- Input tests

### Week 4: Demo & Documentation
- Demo application
- Documentation
- Examples
- Polish and refinements

## Technical Considerations

### Browser Support
- Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ features
- CSS custom properties required
- Shadow DOM support

### Bundle Size
- Target: < 10KB for button component (gzipped)
- Target: < 15KB for input component (gzipped)
- Tree-shakeable exports
- No external dependencies except Lit

### Performance
- Efficient re-rendering with Lit's reactive properties
- CSS-in-JS with Lit's css tagged template
- Lazy loading for demo assets

### Accessibility
- WCAG 2.1 Level AA compliance
- Keyboard navigation
- Screen reader support
- Focus management
- ARIA attributes

### Code Quality
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Comprehensive tests

## Future Enhancements

### Additional Components
After initial button and input implementation:
1. Checkbox
2. Radio button
3. Select/Dropdown
4. Toggle/Switch
5. Textarea (if not covered in input)
6. Card
7. Dialog/Modal
8. Tooltip
9. Tabs
10. And more from ngx-ui library

### Advanced Features
- Internationalization (i18n)
- Right-to-left (RTL) support
- Advanced theming system
- Animation customization
- Form validation framework
- Component composition patterns

## Success Criteria

1. ✅ Button and Input components visually match ngx-ui
2. ✅ All component variants and states implemented
3. ✅ Fully typed with TypeScript
4. ✅ Comprehensive test coverage
5. ✅ Documented API and examples
6. ✅ Working demo application
7. ✅ Build artifacts ready for distribution
8. ✅ Performance benchmarks met
9. ✅ Accessibility requirements met
10. ✅ Framework integration examples provided

## Notes

- Maintain visual parity with the Angular library
- Use modern web standards (Shadow DOM, Custom Elements)
- Keep bundle size minimal
- Prioritize developer experience
- Follow Lit best practices
- Ensure smooth migration path for teams using ngx-ui in Angular who want to use these components in other frameworks

