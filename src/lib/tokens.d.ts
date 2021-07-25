export declare const BORDER_RADII: {
    normal: string;
    large: string;
    circle: string;
};
export declare const BORDER_STYLES: {
    normal: string;
    thick: string;
    dashed: string;
};
export declare const BOX_SHADOW_STYLES: {
    normal: string;
    large: string;
};
export declare const SPOT_COLORS: {
    border: string;
    danger: string;
    text: string;
};
export declare const UNADJUSTABLE_COLORS: {
    white: string;
    transparent: string;
};
declare type CoreColors = {
    [colorName: string]: string;
};
export declare const CORE_COLORS: CoreColors;
declare type TintsAndShades = {
    [tintValue: string]: (colorCode: string) => string;
};
export declare const TINTS_AND_SHADES: TintsAndShades;
export declare const COLOR_PALETTE: CoreColors;
export declare const FONT_SIZES: {
    small: string;
    normal: string;
    large: string;
    xlarge: string;
    xxlarge: string;
};
export declare const LINE_HEIGHTS: {
    small: string;
    normal: string;
    large: string;
    xlarge: string;
    xxlarge: string;
};
export declare const GRID_SIZES: {
    xtight: string;
    tight: string;
    normal: string;
    loose: string;
    xloose: string;
};
export declare const RESPONSIVE_BREAKPOINTS: {
    phonesOnly: string;
    tabletsPortraitAndUp: string;
    tabletsLandscapeAndUp: string;
    desktopsAndUp: string;
    largeDesktopsAndUp: string;
};
export declare const TEXT_DECORATIONS: {
    underline: string;
    'dotted-underline': string;
    'wavy-underline': string;
};
export declare const TRANSITION_DURATIONS: {
    short: string;
    normal: string;
    long: string;
};
export declare const Z_INDEXES: {
    '1--stickyElements': number;
    '2--modalWindows': number;
    '3--popoversAndTooltips': number;
    '4--maximum': number;
};
export {};
