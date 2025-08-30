// src/sanity/studio-theme.ts
import { buildLegacyTheme } from 'sanity';

const props = {
    '--brand-white': '#ffffff',
    '--brand-black': '#000000',
    '--brand-light-gray': '#e5e5e5',
    '--brand-dark-blue': '#14213d',
    '--brand-orange-gold': '#fca311',

    '--brand-red': '#db4437',
    '--brand-green': '#0f9d58',
};

export const studioTheme = buildLegacyTheme({
    /* Base theme colors */
    '--black': props['--brand-dark-blue'],
    '--white': props['--brand-white'],

    '--gray': '#666',
    '--gray-base': '#666',

    '--component-bg': props['--brand-white'],
    '--component-text-color': props['--brand-dark-blue'],

    /* Brand */
    '--brand-primary': props['--brand-orange-gold'],

    // Default button
    '--default-button-color': '#666',
    '--default-button-primary-color': props['--brand-orange-gold'],
    '--default-button-success-color': props['--brand-green'],
    '--default-button-warning-color': props['--brand-orange-gold'],
    '--default-button-danger-color': props['--brand-red'],

    /* State */
    '--state-info-color': props['--brand-orange-gold'],
    '--state-success-color': props['--brand-green'],
    '--state-warning-color': props['--brand-orange-gold'],
    '--state-danger-color': props['--brand-red'],

    /* Navbar */
    '--main-navigation-color': props['--brand-dark-blue'],
    '--main-navigation-color--inverted': props['--brand-white'],

    '--focus-color': props['--brand-orange-gold'],
});
