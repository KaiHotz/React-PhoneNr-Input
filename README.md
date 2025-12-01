# React Phone Number Input

[![npm version](https://img.shields.io/npm/v/react-phonenr-input.svg)](https://www.npmjs.com/package/react-phonenr-input)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

An automated and intuitive international and national phone input field for React with TypeScript support.

## Features

- 🌍 **International phone number formatting** with country code detection
- 🎯 **Automatic phone number validation** using `libphonenumber-js`
- 🏳️ **Country flags** with dropdown selector
- 📱 **Mobile-friendly** with optimized UX
- ⚙️ **Flexible configuration** - set default country, preferred countries, or filter by regions
- 🎨 **Customizable styling** with SCSS support
- 📦 **TypeScript first** with full type definitions
- ♿ **Accessible** with proper ARIA attributes
- 🔄 **Supports both INTERNATIONAL and NATIONAL formats**

## Installation

```bash
npm install react-phonenr-input
```

or

```bash
yarn add react-phonenr-input
```

## Basic Usage

```tsx
import { useState } from 'react';
import { PhoneInput } from 'react-phonenr-input';
import 'react-phonenr-input/styles.css';

function App() {
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <PhoneInput
      onChange={setPhoneNumber}
      placeholder="+1 702 123 4567"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onChange` | `(value: PhoneNumber) => void` | **required** | Callback fired when the phone number changes |
| `defaultCountry` | `CountryCode` | - | Default country code (e.g., 'US', 'GB') |
| `initialValue` | `string` | - | Initial phone number value with country code |
| `preferredCountries` | `CountryCode[]` | - | List of countries to show at the top of the dropdown |
| `regions` | `Region[]` | - | Filter countries by region(s) |
| `format` | `'INTERNATIONAL' \| 'NATIONAL'` | `'INTERNATIONAL'` | Phone number format |
| `withCountryMeta` | `boolean` | `false` | Include country metadata in the returned value |
| `maxLength` | `number` | `21` | Maximum input length |
| `disabled` | `boolean` | `false` | Disable the input |
| `placeholder` | `string` | - | Placeholder text |
| `className` | `string` | - | Custom CSS class name |
| `onFocus` | `FocusEventHandler` | - | Focus event handler |
| `onBlur` | `FocusEventHandler` | - | Blur event handler |

Additional HTML input attributes are also supported via the spread operator.

## Advanced Examples

### With Initial Value

```tsx
<PhoneInput
  onChange={setPhoneNumber}
  initialValue="+491761234112"
/>
```

### With Default Country

```tsx
<PhoneInput
  onChange={setPhoneNumber}
  defaultCountry="US"
  placeholder="Enter phone number"
/>
```

### With Preferred Countries

```tsx
<PhoneInput
  onChange={setPhoneNumber}
  preferredCountries={['US', 'GB', 'DE', 'FR']}
/>
```

### Filter by Regions

```tsx
<PhoneInput
  onChange={setPhoneNumber}
  regions={['europe', 'north-america']}
/>
```

### With Country Metadata

```tsx
<PhoneInput
  onChange={setPhoneNumber}
  withCountryMeta
/>
```

When `withCountryMeta` is enabled, the onChange callback receives an object with the phone number and country information:

```typescript
{
  phoneNumber: "+491761234112",
  country: {
    name: "Germany",
    iso2: "DE",
    dialCode: "49",
    // ... additional metadata
  }
}
```

### National Format

```tsx
<PhoneInput
  onChange={setPhoneNumber}
  format="NATIONAL"
  defaultCountry="US"
/>
```

## Types

### PhoneNumber

```typescript
type PhoneNumber = string | {
  phoneNumber: string;
  country: ICountry;
}
```

### Available Regions

```typescript
type Region =
  | "asia"
  | "europe"
  | "africa"
  | "north-africa"
  | "oceania"
  | "america"
  | "carribean"
  | "south-america"
  | "ex-ussr"
  | "european-union"
  | "middle-east"
  | "central-america"
  | "north-america"
```

## Styling

Import the default styles:

```tsx
import 'react-phonenr-input/styles.css';
```

Or create your own custom styles by targeting the component classes. The component uses BEM methodology for CSS class names.

## Development

### Prerequisites

- Node.js >= 22
- Yarn or npm

### Setup

```bash
# Install dependencies
yarn install

# Start Storybook for development
yarn start

# Run tests
yarn test

# Run linting
yarn lint

# Build the library
yarn build
```

### Scripts

- `yarn start` - Start Storybook development server
- `yarn build` - Build the library for production
- `yarn test` - Run tests with Vitest
- `yarn lint` - Run ESLint and Stylelint
- `yarn lint:fix` - Fix linting issues automatically
- `yarn check-types` - Run TypeScript type checking
- `yarn ci` - Run all checks (lint + tests)

## Browser Support

This library supports all modern browsers. For older browsers, you may need to include appropriate polyfills.

## Dependencies

- React 19.2.x
- libphonenumber-js - Phone number parsing and validation
- react-country-flag - Country flag components

## License

MIT © [Kai Hotz](https://github.com/KaiHotz)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Repository

[https://github.com/KaiHotz/React-PhoneNr-Input](https://github.com/KaiHotz/React-PhoneNr-Input)
