import { supportedLocales } from './supported-locales';

// Create a type from the supported locales list.
export type Locale = typeof supportedLocales[number];
