import { darken, lighten } from 'polished';
import { createGlobalStyle } from 'styled-components';
import { HandyBoxConfig } from './components/Box/Box.types';

const renderConfig = (
    baseConfig = defaultConfig,
    userConfig = {} as HandyBoxConfig
) => {
    const finalConfig = {
        ...baseConfig,
        ...userConfig,
    };

    finalConfig.colors.palette = buildvariants(
        finalConfig.colors.core,
        finalConfig.colors.variants
    );

    Object.keys(finalConfig.gridSizes).forEach((gridSizeName) => {
        const gridSizeRenderer = finalConfig.gridSizes[gridSizeName];

        if (typeof gridSizeRenderer !== 'function') {
            return;
        }

        finalConfig.gridSizes[gridSizeName] = gridSizeRenderer(
            finalConfig.baseUnit
        );
    });

    return finalConfig;
};

const defaultConfig: HandyBoxConfig = {
    baseUnit: '16px',
    borderRadii: { normal: '4px', large: '12px', circle: '1000px' },
    borderStyles: {
        normal: '1px solid',
        thick: '2px solid',
        dashed: '2px dashed',
    },
    boxShadowStyles: {
        normal: '0 4px 5px rgba(0, 0, 0, 0.5)',
        large: '0 8px 10px rgba(0, 0, 0, 0.5)',
    },
    colors: {
        core: {
            red: '#db3838',
            orange: '#f6621f',
            yellow: '#fecc2f',
            green: '#b2c225',
            blue: '#41a4d8',
            indigo: '#ba34dc',
            violet: '#a363d9',
            gray: '#999',
        },
        fixed: {
            white: '#fff',
            transparent: 'rgba(255, 255, 255, 0)',
        },
        palette: {
            // Complete palette of tints and shades gets rendered here
        },
        spot: {
            border: 'gray',
            danger: 'red--500',
            text: 'gray--700',
        },
        variants: {
            '100': (colorCode) => lighten(0.4, colorCode),
            '200': (colorCode) => lighten(0.25, colorCode),
            '300': (colorCode) => lighten(0.1, colorCode),
            '400': (colorCode) => colorCode,
            '500': (colorCode) => darken(0.1, colorCode),
            '600': (colorCode) => darken(0.25, colorCode),
            '700': (colorCode) => darken(0.4, colorCode),
        },
    },
    fontSizes: {
        small: '13px',
        normal: '14px',
        large: '18px',
        xlarge: '24px',
        xxlarge: '40px',
    },
    fontWeights: {
        normal: '400',
        bold: '900',
    },
    lineHeights: {
        small: '18px',
        normal: '20px',
        large: '24px',
        xlarge: '32px',
        xxlarge: '40px',
    },
    gridSizes: {
        xtight: (baseUnit) => `calc(${baseUnit} * 0.25)`,
        tight: (baseUnit) => `calc(${baseUnit} * 0.5)`,
        normal: (baseUnit) => baseUnit,
        loose: (baseUnit) => `calc(${baseUnit} * 1.5)`,
        xloose: (baseUnit) => `calc(${baseUnit} * 2)`,
    },
    responsiveBreakpoints: {
        phonesOnly: '@media (max-width: 599px)',
        tabletsPortraitAndUp: '@media (min-width: 600px)',
        tabletsLandscapeAndUp: '@media (min-width: 900px)',
        desktopsAndUp: '@media (min-width: 1200px)',
        largeDesktopsAndUp: '@media (min-width: 1800px)',
    },
    textDecorations: {
        'underline': 'underline',
        'dotted-underline': 'underline dotted',
        'wavy-underline': 'underline wavy',
    },
    transitionDurations: {
        short: '0.2s',
        normal: '0.5s',
        long: '1s',
    },
    zIndexes: {
        '1--stickyElements': 1000,
        '2--modalWindows': 5000,
        '3--popoversAndTooltips': 6000,
        '4--maximum': 1000000,
    },
};

const buildvariants: (
    coreColors: HandyBoxConfig['colors']['core'],
    variants: HandyBoxConfig['colors']['variants']
) => HandyBoxConfig['colors']['core'] = (coreColors, variants) => {
    const expandedColors = {
        ...coreColors,
    };

    const tintAndShadeNames = Object.keys(variants);

    Object.keys(coreColors).forEach((colorName) => {
        const colorCode = coreColors[colorName];

        tintAndShadeNames.forEach((tintOrShadeName) => {
            const tintOrShader = variants[tintOrShadeName];

            expandedColors[`${colorName}--${tintOrShadeName}`] =
                tintOrShader(colorCode);
        });
    });

    return expandedColors;
};

export const ConfigObject = {
    current: defaultConfig,
};

const Config = ({ config = defaultConfig }) => {
    ConfigObject.current = renderConfig(config);

    const GlobalStyles = createGlobalStyle`
        * {
            background: unset;
            border: unset;
            box-sizing: border-box;
            color: unset;
            font-size: inherit;
            font: unset;
            line-height: inherit;
            list-style-type: none;
            margin: 0;
            outline: unset;
            padding: 0;
            text-decoration: none;
        }
        :root {
            background-color: white;
            color: black;
            font-family: Roboto, sans-serif;
            font-size: ${config.fontSizes.normal};
            line-height: ${config.lineHeights.normal};
            scroll-padding-top: 50px;
        }
        body {
            overscroll-behavior-y: none;
        }
    `;

    return <GlobalStyles />;
};

export default Config;
