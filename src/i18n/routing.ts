import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['en', 'hi', 'pa', 'bn'],
    defaultLocale: 'en',
    localePrefix: 'always',
});
