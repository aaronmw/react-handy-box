export type HandyBoxConfig = {
    baseUnit: string;
    borderRadii: Record<string, string>;
    borderStyles: Record<string, string>;
    boxShadowStyles: Record<string, string>;
    colors: {
        core: Record<string, string>;
        fixed: Record<string, string>;
        palette: Record<string, string>;
        spot: Record<string, string>;
        variants: Record<string, (colorCode: string) => string>;
    };
    fontSizes: Record<string, string>;
    fontWeights: Record<string, string>;
    lineHeights: Record<string, string>;
    gridSizes: Record<string, string | ((baseUnit: string) => string)>;
    responsiveBreakpoints: Record<string, string>;
    textDecorations: Record<string, string>;
    transitionDurations: Record<string, string>;
    zIndexes: Record<string, number>;
};

export type AnimatableCSSProperty =
    | 'all'
    | 'backdrop-filter'
    | 'background'
    | 'background-color'
    | 'background-position'
    | 'background-size'
    | 'block-size'
    | 'border'
    | 'border-block-end'
    | 'border-block-end-color'
    | 'border-block-end-width'
    | 'border-block-start'
    | 'border-block-start-color'
    | 'border-block-start-width'
    | 'border-bottom'
    | 'border-bottom-color'
    | 'border-bottom-left-radius'
    | 'border-bottom-right-radius'
    | 'border-bottom-width'
    | 'border-color'
    | 'border-end-end-radius'
    | 'border-end-start-radius'
    | 'border-image-outset'
    | 'border-image-slice'
    | 'border-image-width'
    | 'border-inline-end'
    | 'border-inline-end-color'
    | 'border-inline-end-width'
    | 'border-inline-start'
    | 'border-inline-start-color'
    | 'border-inline-start-width'
    | 'border-left'
    | 'border-left-color'
    | 'border-left-width'
    | 'border-radius'
    | 'border-right'
    | 'border-right-color'
    | 'border-right-width'
    | 'border-start-end-radius'
    | 'border-start-start-radius'
    | 'border-top'
    | 'border-top-color'
    | 'border-top-left-radius'
    | 'border-top-right-radius'
    | 'border-top-width'
    | 'border-width'
    | 'bottom'
    | 'box-shadow'
    | 'caret-color'
    | 'clip'
    | 'clip-path'
    | 'color'
    | 'column-count'
    | 'column-gap'
    | 'column-rule'
    | 'column-rule-color'
    | 'column-rule-width'
    | 'column-width'
    | 'columns'
    | 'filter'
    | 'flex'
    | 'flex-basis'
    | 'flex-grow'
    | 'flex-shrink'
    | 'font'
    | 'font-size'
    | 'font-size-adjust'
    | 'font-stretch'
    | 'font-variation-settings'
    | 'font-weight'
    | 'gap'
    | 'grid-column-gap'
    | 'grid-gap'
    | 'grid-row-gap'
    | 'grid-template-columns'
    | 'grid-template-rows'
    | 'height'
    | 'inline-size'
    | 'inset'
    | 'inset-block'
    | 'inset-block-end'
    | 'inset-block-start'
    | 'inset-inline'
    | 'inset-inline-end'
    | 'inset-inline-start'
    | 'left'
    | 'letter-spacing'
    | 'line-clamp'
    | 'line-height'
    | 'margin'
    | 'margin-block-end'
    | 'margin-block-start'
    | 'margin-bottom'
    | 'margin-inline-end'
    | 'margin-inline-start'
    | 'margin-left'
    | 'margin-right'
    | 'margin-top'
    | 'mask'
    | 'mask-border'
    | 'mask-position'
    | 'mask-size'
    | 'max-block-size'
    | 'max-height'
    | 'max-inline-size'
    | 'max-lines'
    | 'max-width'
    | 'min-block-size'
    | 'min-height'
    | 'min-inline-size'
    | 'min-width'
    | 'object-position'
    | 'offset'
    | 'offset-anchor'
    | 'offset-distance'
    | 'offset-path'
    | 'offset-position'
    | 'offset-rotate'
    | 'opacity'
    | 'order'
    | 'outline'
    | 'outline-color'
    | 'outline-offset'
    | 'outline-width'
    | 'padding'
    | 'padding-block-end'
    | 'padding-block-start'
    | 'padding-bottom'
    | 'padding-inline-end'
    | 'padding-inline-start'
    | 'padding-left'
    | 'padding-right'
    | 'padding-top'
    | 'perspective'
    | 'perspective-origin'
    | 'right'
    | 'rotate'
    | 'row-gap'
    | 'scale'
    | 'scroll-margin'
    | 'scroll-margin-block'
    | 'scroll-margin-block-end'
    | 'scroll-margin-block-start'
    | 'scroll-margin-bottom'
    | 'scroll-margin-inline'
    | 'scroll-margin-inline-end'
    | 'scroll-margin-inline-start'
    | 'scroll-margin-left'
    | 'scroll-margin-right'
    | 'scroll-margin-top'
    | 'scroll-padding'
    | 'scroll-padding-block'
    | 'scroll-padding-block-end'
    | 'scroll-padding-block-start'
    | 'scroll-padding-bottom'
    | 'scroll-padding-inline'
    | 'scroll-padding-inline-end'
    | 'scroll-padding-inline-start'
    | 'scroll-padding-left'
    | 'scroll-padding-right'
    | 'scroll-padding-top'
    | 'scroll-snap-coordinate'
    | 'scroll-snap-destination'
    | 'scrollbar-color'
    | 'shape-image-threshold'
    | 'shape-margin'
    | 'shape-outside'
    | 'tab-size'
    | 'text-decoration'
    | 'text-decoration-color'
    | 'text-decoration-thickness'
    | 'text-emphasis'
    | 'text-emphasis-color'
    | 'text-indent'
    | 'text-shadow'
    | 'text-underline-offset'
    | 'top'
    | 'transform'
    | 'transform-origin'
    | 'translate'
    | 'vertical-align'
    | 'visibility'
    | 'width'
    | 'word-spacing'
    | 'z-index'
    | 'zoom';

export type BorderRadius<T extends HandyBoxConfig> = keyof T['borderRadii'];

export type BorderStyle<T extends HandyBoxConfig> = keyof T['borderStyles'];

export type BoxShadow<T extends HandyBoxConfig> = keyof T['boxShadowStyles'];

type ExtractKeys<T extends { [k: string]: any }> = T extends infer G
    ? `${string & keyof G}`
    : never;

export type Color<T extends HandyBoxConfig> =
    | keyof T['colors']['core']
    | keyof T['colors']['fixed']
    | keyof T['colors']['spot']
    | `${ExtractKeys<T['colors']['core']>}--${ColorLightness<T>}`;

export type ColorAdjustment<T extends HandyBoxConfig> =
    | ColorLightness<T>
    | `+${ColorLightness<T>}`
    | `-${ColorLightness<T>}`;

export type ColorCode = `#${string}`;

export type ColorLightness<T extends HandyBoxConfig> = ExtractKeys<
    T['colors']['variants']
>;

export type Cursor =
    | 'auto'
    | 'default'
    | 'none'
    | 'context-menu'
    | 'help'
    | 'pointer'
    | 'progress'
    | 'wait'
    | 'cell'
    | 'crosshair'
    | 'text'
    | 'vertical-text'
    | 'alias'
    | 'copy'
    | 'move'
    | 'no-drop'
    | 'not-allowed'
    | 'grab'
    | 'grabbing'
    | 'all-scroll'
    | 'col-resize'
    | 'row-resize'
    | 'n-resize'
    | 'e-resize'
    | 's-resize'
    | 'w-resize'
    | 'ne-resize'
    | 'nw-resize'
    | 'se-resize'
    | 'sw-resize'
    | 'ew-resize'
    | 'ns-resize'
    | 'nesw-resize'
    | 'nwse-resize'
    | 'zoom-in'
    | 'zoom-out';

export type DisplayMode =
    | 'block'
    | 'inline'
    | 'inline-block'
    | 'grid'
    | 'flex'
    | 'none'
    | 'table'
    | 'table-row'
    | 'table-cell'
    | 'table-header-group'
    | 'table-footer-group'
    | 'table-row-group';

export type FlexAlignment =
    | 'baseline'
    | 'center'
    | 'flex-end'
    | 'flex-start'
    | 'stretch';

export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export type FlexJustification =
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'left'
    | 'right'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'stretch';

export type FontSize<T extends HandyBoxConfig> = 0 | keyof T['fontSizes'];

export type FontWeight<T extends HandyBoxConfig> = keyof T['fontWeights'];

export type GridSize<T extends HandyBoxConfig> = keyof T['gridSizes'];

export type GridSizeOrLength<T extends HandyBoxConfig> =
    | GridSize<T>
    | 'auto'
    | 'unset'
    | `${number}px`
    | `${number}%`
    | number;

export type LineHeights<T extends HandyBoxConfig> = keyof T['lineHeights'];

export type TextDecoration<T extends HandyBoxConfig> =
    keyof T['textDecorations'];

export type TransitionDuration<T extends HandyBoxConfig> =
    | keyof T['transitionDurations']
    | `${number}ms`
    | `${number}s`
    | number;

export type Overflow = 'auto' | 'clip' | 'hidden' | 'scroll' | 'visible';

export type Position = 'absolute' | 'fixed' | 'relative' | 'static' | 'sticky';

export type TextAlignment = 'left' | 'right' | 'center' | 'justify';

export type WhiteSpace =
    | 'normal'
    | 'nowrap'
    | 'pre'
    | 'pre-wrap'
    | 'pre-line'
    | 'break-spaces';

export type zIndex<T extends HandyBoxConfig> = keyof T['zIndexes'] | number;

export type BoxStyleProps<T extends HandyBoxConfig> = {
    alignItems?: FlexAlignment;
    alignSelf?: FlexAlignment;
    backgroundColor?: Color<T>;
    backgroundColorLightness?: ColorAdjustment<T>;
    border?: BorderStyle<T> | boolean;
    borderBottom?: BorderStyle<T> | boolean;
    borderBottomColor?: Color<T>;
    borderBottomColorLightness?: ColorAdjustment<T>;
    borderColor?: Color<T>;
    borderColorLightness?: ColorAdjustment<T>;
    borderLeft?: BorderStyle<T> | boolean;
    borderLeftColor?: Color<T>;
    borderLeftColorLightness?: ColorAdjustment<T>;
    borderRadius?: BorderRadius<T> | boolean;
    borderRight?: BorderStyle<T> | boolean;
    borderRightColor?: Color<T>;
    borderRightColorLightness?: ColorAdjustment<T>;
    borderTop?: BorderStyle<T> | boolean;
    borderTopColor?: Color<T>;
    borderTopColorLightness?: ColorAdjustment<T>;
    bottom?: GridSizeOrLength<T>;
    boxShadow?: BoxShadow<T> | boolean;
    color?: Color<T>;
    colorLightness?: ColorAdjustment<T>;
    columnGap?: GridSize<T>;
    columns?: number | Array<string | number>;
    cursor?: Cursor;
    display?: DisplayMode;
    flexDirection?: FlexDirection;
    flexGrow?: number;
    flexShrink?: number;
    flexWrap?: FlexWrap;
    fontSize?: FontSize<T>;
    fontStyle?: 'italic';
    fontWeight?: FontWeight<T>;
    gap?: GridSize<T>;
    height?: number | string;
    isFlexible?: boolean;
    isOnlyForScreenReaders?: boolean;
    justifyContent?: FlexJustification;
    justifySelf?: FlexJustification;
    left?: GridSizeOrLength<T>;
    margin?: GridSizeOrLength<T>;
    marginBottom?: GridSizeOrLength<T>;
    marginLeft?: GridSizeOrLength<T>;
    marginRight?: GridSizeOrLength<T>;
    marginTop?: GridSizeOrLength<T>;
    marginX?: GridSizeOrLength<T>;
    marginY?: GridSizeOrLength<T>;
    maxHeight?: number | string;
    maxLines?: number;
    maxWidth?: number | string;
    minHeight?: number | string;
    minWidth?: number | string;
    opacity?: number;
    overflow?: Overflow;
    overflowX?: Overflow;
    overflowY?: Overflow;
    padding?: GridSizeOrLength<T>;
    paddingBottom?: GridSizeOrLength<T>;
    paddingLeft?: GridSizeOrLength<T>;
    paddingRight?: GridSizeOrLength<T>;
    paddingTop?: GridSizeOrLength<T>;
    paddingX?: GridSizeOrLength<T>;
    paddingY?: GridSizeOrLength<T>;
    pointerEvents?: 'all' | 'auto' | 'none';
    position?: Position;
    right?: GridSizeOrLength<T>;
    rowGap?: GridSize<T>;
    textAlign?: TextAlignment;
    textDecoration?: TextDecoration<T>;
    top?: GridSizeOrLength<T>;
    transform?: string;
    transitionDuration?: TransitionDuration<T>;
    transitionProperty?: AnimatableCSSProperty | Array<AnimatableCSSProperty>;
    whiteSpace?: WhiteSpace;
    width?: number | string;
    zIndex?: zIndex<T>;
};
