---
name: Luminous Insight
colors:
  surface: '#f8fafb'
  surface-dim: '#d8dadb'
  surface-bright: '#f8fafb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f5'
  surface-container: '#eceeef'
  surface-container-high: '#e6e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#3d4a3e'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#eff1f2'
  outline: '#6c7b6d'
  outline-variant: '#bbcbbb'
  surface-tint: '#006d37'
  primary: '#006d37'
  on-primary: '#ffffff'
  primary-container: '#2ecc71'
  on-primary-container: '#005027'
  inverse-primary: '#4ae183'
  secondary: '#555f6f'
  on-secondary: '#ffffff'
  secondary-container: '#d6e0f3'
  on-secondary-container: '#596373'
  tertiary: '#006397'
  on-tertiary: '#ffffff'
  tertiary-container: '#5fbaff'
  on-tertiary-container: '#004970'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#6bfe9c'
  primary-fixed-dim: '#4ae183'
  on-primary-fixed: '#00210c'
  on-primary-fixed-variant: '#005228'
  secondary-fixed: '#d9e3f6'
  secondary-fixed-dim: '#bdc7d9'
  on-secondary-fixed: '#121c2a'
  on-secondary-fixed-variant: '#3d4756'
  tertiary-fixed: '#cce5ff'
  tertiary-fixed-dim: '#92ccff'
  on-tertiary-fixed: '#001d31'
  on-tertiary-fixed-variant: '#004b73'
  background: '#f8fafb'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

The design system is engineered for a premium AI diagnostic platform tailored for small business owners. The brand personality balances **innovation** with **accessibility**, ensuring that complex data analysis feels intuitive and trustworthy. 

The visual style is **Modern Corporate Minimalism**. It leverages high-quality typography and a disciplined use of whitespace to create a sense of professional clarity. Subtle depth is achieved through soft shadows rather than heavy borders, evoking a "software-as-a-service" aesthetic that feels both cutting-edge and dependable. The emotional response should be one of "empowered clarity"—transforming the anxiety of business management into the confidence of data-driven growth.

## Colors

The palette is anchored by **Bold Green (#2ECC71)**, symbolizing growth, health, and financial success. This is set against a sophisticated neutral background of **Light Grey-Blue (#F7F9FA)** to reduce eye strain and provide a premium "canvas" feel.

- **Primary**: Use for call-to-actions, success states, and key diagnostic indicators.
- **Secondary (Deep Charcoal)**: Used for high-level navigation and primary headings to provide grounding contrast.
- **Surface**: Pure white is reserved for cards and modals to pop against the light grey background.
- **Semantic**: Green for positive diagnostics, Amber for warnings, and Red for critical risks.

## Typography

This design system utilizes **Inter** exclusively to maintain a systematic, utilitarian, yet premium feel. The type scale relies on tight letter-spacing for headlines to create a contemporary "editorial" look.

- **Hierarchies**: Use `Display` for hero sections and AI score totals. `Headline` styles should be used for section titles and card headers.
- **Readability**: Maintain a line height of at least 1.5x for body text to ensure diagnostic reports remain legible during long reading sessions.
- **Labels**: Small, semi-bold labels are intended for table headers, data tags, and small captions.

## Layout & Spacing

The layout follows a **Fluid Grid** system within a centered container. A strict 8px spacing scale governs all margins and paddings to ensure mathematical harmony.

- **Desktop**: 12-column grid with 24px gutters and 40px side margins.
- **Tablet**: 8-column grid with 16px gutters.
- **Mobile**: 4-column grid with 16px gutters.
- **Philosophy**: Generous whitespace is a functional requirement here, not just aesthetic. It separates complex data points, preventing "information overload" for the user.

## Elevation & Depth

This design system uses **Ambient Shadows** to create a sense of elevation without harsh lines. Depth is used to communicate interactivity and hierarchy.

- **Level 0 (Flat)**: The background surface (#F7F9FA).
- **Level 1 (Low)**: Standard content cards. Shadow: `0px 2px 4px rgba(0, 0, 0, 0.05)`.
- **Level 2 (Medium)**: Hover states for cards and navigation elements. Shadow: `0px 10px 15px -3px rgba(0, 0, 0, 0.08)`.
- **Level 3 (High)**: Modals, dropdowns, and floating AI diagnostic panels. Shadow: `0px 20px 25px -5px rgba(0, 0, 0, 0.1)`.

All elevations should maintain a very low opacity to keep the interface feeling light and airy.

## Shapes

The design system employs a **Rounded (8px)** corner strategy across all primary components. This choice softens the "technical" nature of AI, making the platform feel more approachable and modern.

- **Small Components**: Checkboxes and tags use a 4px radius.
- **Standard Components**: Buttons, Input fields, and Cards use the 8px base radius.
- **Large Components**: Promotional banners or containers may scale up to 16px (rounded-lg) to emphasize their distinctiveness.

## Components

### Buttons
- **Primary**: Solid #2ECC71 with white text. 8px radius. Subtle scale-down effect on click.
- **Secondary**: Ghost style with a #2ECC71 border or a subtle grey fill (#F3F4F6).
- **Size**: 44px minimum height for touch accessibility.

### Cards (The Core Diagnostic Unit)
- Cards are white with an 8px radius and Level 1 shadow. 
- Headers inside cards should use `Headline-sm`. 
- Content padding should be a consistent 24px (spacing.md).

### Input Fields
- Background: #FFFFFF. Border: 1px solid #E5E7EB. 
- Focus State: 1px solid #2ECC71 with a soft green outer glow (2px spread).
- Labels: Use `Label-sm` in `Text-Secondary` color, positioned 8px above the field.

### AI Insight Chips
- Small, pill-shaped indicators for \"Growth,\" \"Risk,\" or \"Stability.\" 
- Use a desaturated background of the semantic color with a high-contrast text color (e.g., Light Green background with Dark Green text).

### Progress Indicators
- For AI diagnostic loading, use a thin, linear progress bar in the Primary Green.
- Use rounded caps for the bar ends to match the shape language.
