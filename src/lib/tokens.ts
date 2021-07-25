import { darken, lighten } from 'polished';
import { ColorLightness } from './components/Box/Box.types';

export const BORDER_RADII = { normal: '4px', large: '12px', circle: '1000px' };

export const BORDER_STYLES = {
    normal: '1px solid',
    thick: '2px solid',
    dashed: '2px dashed',
};

export const BOX_SHADOW_STYLES = {
    normal: '0 4px 5px rgba(0, 0, 0, 0.5)',
    large: '0 8px 10px rgba(0, 0, 0, 0.5)',
};

export const SPOT_COLORS = {
    border: 'gray',
    danger: 'red--500',
    text: 'gray--700',
};

export const UNADJUSTABLE_COLORS = {
    white: '#fff',
    transparent: 'rgba(255, 255, 255, 0)',
};

const buildTintsAndShades: (
    coreColors: CoreColors,
    tintsAndShades: TintsAndShades
) => CoreColors = (coreColors, tintsAndShades) => {
    const expandedColors = {
        ...coreColors,
    };

    const tintAndShadeNames = Object.keys(tintsAndShades);

    Object.keys(coreColors).forEach((colorName) => {
        const colorCode = coreColors[colorName];

        tintAndShadeNames.forEach((tintOrShadeName) => {
            const tintOrShader = tintsAndShades[tintOrShadeName];

            expandedColors[`${colorName}--${tintOrShadeName}`] =
                tintOrShader(colorCode);
        });
    });

    return expandedColors;
};

type CoreColors = {
    [colorName: string]: string;
};

export const CORE_COLORS: CoreColors = {
    red: '#db3838',
    orange: '#f6621f',
    yellow: '#fecc2f',
    green: '#b2c225',
    blue: '#41a4d8',
    indigo: '#ba34dc',
    violet: '#a363d9',
    gray: '#999',
};

type TintsAndShades = {
    [tintValue: string]: (colorCode: string) => string;
};

export const TINTS_AND_SHADES: TintsAndShades = {
    '100': (colorCode) => lighten(0.3, colorCode),
    '200': (colorCode) => lighten(0.2, colorCode),
    '300': (colorCode) => lighten(0.1, colorCode),
    '400': (colorCode) => colorCode,
    '500': (colorCode) => darken(0.1, colorCode),
    '600': (colorCode) => darken(0.2, colorCode),
    '700': (colorCode) => darken(0.3, colorCode),
};

export const COLOR_PALETTE = buildTintsAndShades(CORE_COLORS, TINTS_AND_SHADES);

export const FONT_SIZES = {
    small: '13px',
    normal: '14px',
    large: '18px',
    xlarge: '24px',
    xxlarge: '40px',
};

export const LINE_HEIGHTS = {
    small: '18px',
    normal: '20px',
    large: '24px',
    xlarge: '32px',
    xxlarge: '40px',
};

const GRID_UNIT_BASE = '16px';

export const GRID_SIZES = {
    xtight: `calc(${GRID_UNIT_BASE} * 0.25)`,
    tight: `calc(${GRID_UNIT_BASE} * 0.5)`,
    normal: GRID_UNIT_BASE,
    loose: `calc(${GRID_UNIT_BASE} * 1.5)`,
    xloose: `calc(${GRID_UNIT_BASE} * 2)`,
};

export const RESPONSIVE_BREAKPOINTS = {
    phonesOnly: '@media (max-width: 599px)',
    tabletsPortraitAndUp: '@media (min-width: 600px)',
    tabletsLandscapeAndUp: '@media (min-width: 900px)',
    desktopsAndUp: '@media (min-width: 1200px)',
    largeDesktopsAndUp: '@media (min-width: 1800px)',
};

export const TEXT_DECORATIONS = {
    'underline': 'underline',
    'dotted-underline': 'underline dotted',
    'wavy-underline': 'underline wavy',
};

export const TRANSITION_DURATIONS = {
    short: '0.2s',
    normal: '0.5s',
    long: '1s',
};

export const Z_INDEXES = {
    '1--stickyElements': 1000,
    '2--modalWindows': 5000,
    '3--popoversAndTooltips': 6000,
    '4--maximum': 1000000,
};
