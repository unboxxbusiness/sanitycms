// src/sanity/studio-theme.ts
import { buildLegacyTheme } from 'sanity';

const props = {
    '--my-white': '#ffffff',
    '--my-black': '#1a1a1a',
    '--my-blue': '#4285f4',
    '--my-red': '#db4437',
    '--my-yellow': '#f4b400',
    '--my-green': '#0f9d58',
    '--amulyax-primary': 'hsl(231, 66%, 56%)',
    '--amulyax-accent': 'hsl(282, 82%, 56%)',
    '--amulyax-background': 'hsl(240, 10%, 96.1%)',
    '--amulyax-foreground': 'hsl(240, 10%, 3.9%)',
    '--amulyax-card': 'hsl(240, 10%, 96.1%)',
};

export const studioTheme = buildLegacyTheme({
    /* Base theme colors */
    '--black': props['--my-black'],
    '--white': props['--my-white'],

    '--gray': '#666',
    '--gray-base': '#666',

    '--component-bg': props['--amulyax-background'],
    '--component-text-color': props['--amulyax-foreground'],

    /* Brand */
    '--brand-primary': props['--amulyax-primary'],

    // Default button
    '--default-button-color': '#666',
    '--default-button-primary-color': props['--amulyax-primary'],
    '--default-button-success-color': props['--my-green'],
    '--default-button-warning-color': props['--my-yellow'],
    '--default-button-danger-color': props['--my-red'],

    /* State */
    '--state-info-color': props['--amulyax-primary'],
    '--state-success-color': props['--my-green'],
    '--state-warning-color': props['--my-yellow'],
    '--state-danger-color': props['--my-red'],

    /* Navbar */
    '--main-navigation-color': props['--my-black'],
    '--main-navigation-color--inverted': props['--my-white'],

    '--focus-color': props['--amulyax-accent'],
});
