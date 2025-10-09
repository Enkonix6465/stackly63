# Language Changing Functionality

This project now supports multiple languages: English, Arabic, and Hebrew.

## Features

- **Multi-language Support**: English, Arabic, Hebrew (All LTR layout)
- **Fixed Layout**: Logo stays on left, language selector on right
- **Persistent Language Selection**: Language choice is saved in localStorage
- **Language Selector**: Dropdown menu in the header with flag icons
- **Translated Navigation**: All navigation items are translated
- **Translated Footer**: Complete footer translation including all sections and links
- **Translated Login Page**: Complete login page translation including all form elements and text
- **Translated Forgot Password Page**: Complete forgot password page translation including all form elements and text
- **Translated Home Page**: Complete home page translation including all sections, buttons, and content
- **Login Page Header**: Dedicated header with language selector for easy language switching
- **Forgot Password Page Header**: Dedicated header with language selector for easy language switching

## How It Works

### 1. Language Files

- `src/locales/en.json` - English translations
- `src/locales/ar.json` - Arabic translations
- `src/locales/he.json` - Hebrew translations

### 2. Components

- `LanguageSelector` - Dropdown menu for language selection
- `useLanguage` hook - Custom hook for language management
- Updated `Navbar` - Now uses translations for all text
- Updated `Footer` - Now uses translations for all text and sections
- Updated `Login` - Now uses translations for all text and form elements
- Updated `ForgotPassword` - Now uses translations for all text and form elements
- Updated `Home` - Now uses translations for all text, sections, and content
- Updated `LanguageSelector` - Added variant support for different page styles

### 3. Layout Features

- Logo fixed on the left side
- Language selector fixed on the right side
- All languages use LTR (left-to-right) layout
- Font family optimization for Arabic and Hebrew text

## Usage

### Adding New Translations

1. Add new keys to all language files in `src/locales/`
2. Use the translation function in components: `t('key.path')`

Example:

```jsx
import { useTranslation } from "react-i18next";

function MyComponent() {
  const { t } = useTranslation();

  return <h1>{t("nav.home")}</h1>;
}
```

### Adding New Languages

1. Create a new language file in `src/locales/`
2. Add the language to the `languages` array in `LanguageSelector`
3. Update the `i18n.js` configuration

## Dependencies

- `react-i18next` - React integration for i18next
- `i18next` - Internationalization framework
- `i18next-browser-languagedetector` - Language detection

## Browser Support

- Modern browsers with ES6+ support
- RTL languages work best in browsers with good RTL support
- Language detection uses localStorage and navigator language
