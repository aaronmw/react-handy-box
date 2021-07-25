import { readableColor } from 'polished';
import { clamp } from 'lodash';
import {
    BORDER_RADII,
    BORDER_STYLES,
    BOX_SHADOW_STYLES,
    COLOR_PALETTE,
    FONT_SIZES,
    GRID_SIZES,
    LINE_HEIGHTS,
    RESPONSIVE_BREAKPOINTS,
    SPOT_COLORS,
    TEXT_DECORATIONS,
    TRANSITION_DURATIONS,
    UNADJUSTABLE_COLORS,
    Z_INDEXES,
} from '../../tokens';
import {
    BorderStyle,
    BoxStyleProps,
    Color,
    ColorCode,
    ColorLightness,
} from './Box.types';

// Exported for tests
export const CHILDREN_SELECTOR =
    '& > *:not([data-is-hidden]) + *:not([data-is-hidden])';

type BorderPropName =
    | 'border'
    | 'borderTop'
    | 'borderRight'
    | 'borderBottom'
    | 'borderLeft';

type BorderColorPropName = `${BorderPropName}Color`;

const toBorder: (
    borderPropName: BorderPropName,
    props: {
        [propName: string]: unknown;
    }
) => string = (borderPropName, props) => {
    const propValue = props[borderPropName];
    const borderColor =
        props[`${borderPropName}Color`] || props['borderColor'] || 'border';
    const borderColorLightness =
        props[`${borderPropName}ColorLightness`] ||
        props[`borderColorLightness`] ||
        undefined;

    return propValue === false
        ? 'none'
        : `${
              BORDER_STYLES[
                  propValue === true ? 'normal' : (propValue as BorderStyle)
              ]
          } ${String(
              toColor(
                  borderColor as Color,
                  borderColorLightness as ColorLightness
              )
          )}`;
};

const toBorderColor: (
    borderPropName: BorderPropName,
    props: Record<string, unknown>
) => ColorCode = (borderPropName, props) =>
    toColor(
        props[`${borderPropName}Color`] as Color,
        props[`${borderPropName}ColorLightness`] as ColorLightness
    );

const toBorderRadius = (borderRadiusPropValue) =>
    BORDER_RADII[borderRadiusPropValue];

const toColor: (
    colorName: Color,
    adjustment?: boolean | string | number
) => ColorCode = (colorName, adjustment = false) => {
    if (colorName in UNADJUSTABLE_COLORS) {
        return UNADJUSTABLE_COLORS[colorName];
    }

    const baseColorName =
        colorName in SPOT_COLORS ? SPOT_COLORS[colorName] : colorName;

    if (!adjustment) {
        return COLOR_PALETTE[baseColorName];
    }

    const [rootColor, currentLightnessValue = 400] = baseColorName.split('--');

    const adjustedLightnessValue = clamp(
        typeof adjustment === 'string'
            ? Number(currentLightnessValue) + Number(adjustment)
            : (adjustment as number),
        100,
        700
    );

    return COLOR_PALETTE[`${rootColor}--${adjustedLightnessValue}`];
};

const toGridSizeOrLength = (propValue) =>
    propValue === false
        ? 0
        : propValue === true
        ? GRID_SIZES.normal
        : typeof propValue === 'number'
        ? `${propValue}px`
        : propValue in GRID_SIZES
        ? GRID_SIZES[propValue]
        : propValue;

const toLength = (propValue) =>
    typeof propValue === 'number' ? `${propValue}px` : propValue;

const toNumber = (v) => (v === true ? 1 : v === false ? 0 : Number(v));

type BoxPropRenderer = {
    propName: string | Array<string>;
    getCSS?: (propValue?: any, props?: any) => any;
    cssProperty?: string | Array<string>;
    getValue?: (propValue?: any, props?: any) => any;
};

const boxPropRenderers: Array<BoxPropRenderer> = [
    {
        propName: [
            'as',
            'highlightFocusWithin',
            'href',
            'position',
            'tabIndex',
            'zIndex',
            'onClick',
        ],
        getCSS: (
            _,
            {
                as,
                disabled,
                highlightFocusWithin,
                href,
                position,
                tabIndex,
                zIndex,
                onClick,
            }
        ) =>
            highlightFocusWithin ||
            href ||
            onClick ||
            ['button', 'a', 'input', 'textarea', 'select'].includes(as) ||
            typeof tabIndex === 'number'
                ? {
                      cursor: disabled ? 'default' : 'pointer',
                      [highlightFocusWithin ? '&:focus-within' : '&:focus']: [
                          `box-shadow: 0 0 0 2px white, 0 0 0 6px ${
                              COLOR_PALETTE[SPOT_COLORS['focusIndicator']]
                          };`,
                          `border-radius: ${BORDER_RADII.normal};`,
                          `position: ${position || 'relative'};`,
                          `z-index: ${
                              typeof zIndex === 'number'
                                  ? zIndex
                                  : Z_INDEXES[zIndex || '1--stickyElements']
                          };`,
                      ].join('\n'),
                  }
                : {},
    },
    {
        propName: 'additionalCSS',
        getCSS: (additionalCSS) => ({
            '&': additionalCSS,
        }),
    },
    {
        propName: 'alignItems',
        getCSS: (alignItems) => ({
            'display': 'flex',
            'align-items': alignItems,
        }),
    },
    {
        propName: 'alignSelf',
        cssProperty: 'align-self',
    },
    {
        propName: 'backgroundColor',
        cssProperty: 'background-color',
        getValue: (backgroundColor, { backgroundColorLightness }) =>
            toColor(backgroundColor, backgroundColorLightness),
    },
    {
        propName: 'border',
        cssProperty: 'border',
        getValue: (_, props) => toBorder('border', props),
    },
    {
        propName: 'borderBottom',
        cssProperty: 'border-bottom',
        getValue: (_, props) => toBorder('borderBottom', props),
    },
    {
        propName: 'borderBottomColor',
        cssProperty: 'border-bottom-color',
        getValue: (_, props) => toBorderColor('borderBottom', props),
    },
    {
        propName: 'borderLeft',
        cssProperty: 'border-left',
        getValue: (_, props) => toBorder('borderLeft', props),
    },
    {
        propName: 'borderLeftColor',
        cssProperty: 'border-left-color',
        getValue: (_, props) => toBorderColor('borderLeft', props),
    },
    {
        propName: 'borderRadius',
        cssProperty: 'border-radius',
        getValue: toBorderRadius,
    },
    {
        propName: 'borderBottomLeftRadius',
        cssProperty: 'border-bottom-left-radius',
        getValue: toBorderRadius,
    },
    {
        propName: 'borderBottomRightRadius',
        cssProperty: 'border-bottom-right-radius',
        getValue: toBorderRadius,
    },
    {
        propName: 'borderTopLeftRadius',
        cssProperty: 'border-top-left-radius',
        getValue: toBorderRadius,
    },
    {
        propName: 'borderTopRightRadius',
        cssProperty: 'border-top-right-radius',
        getValue: toBorderRadius,
    },
    {
        propName: 'borderRight',
        cssProperty: 'border-right',
        getValue: (_, props) => toBorder('borderRight', props),
    },
    {
        propName: 'borderRightColor',
        cssProperty: 'border-right-color',
        getValue: (_, props) => toBorderColor('borderRight', props),
    },
    {
        propName: 'borderTop',
        cssProperty: 'border-top',
        getValue: (_, props) => toBorder('borderTop', props),
    },
    {
        propName: 'borderTopColor',
        cssProperty: 'border-top-color',
        getValue: (_, props) => toBorderColor('borderTop', props),
    },
    {
        propName: 'bottom',
        cssProperty: 'bottom',
        getValue: toGridSizeOrLength,
    },
    {
        propName: 'boxShadow',
        cssProperty: 'box-shadow',
        getValue: (boxShadow) => BOX_SHADOW_STYLES[boxShadow],
    },
    {
        propName: 'color',
        cssProperty: 'color',
        getValue: (color, { colorLightness }) => toColor(color, colorLightness),
    },
    {
        propName: 'columnGap',
        getCSS: (columnGap, { columns }) =>
            columns
                ? {
                      'column-gap': toGridSizeOrLength(columnGap),
                  }
                : {
                      display: 'flex',
                      [CHILDREN_SELECTOR]: `margin-left: ${toGridSizeOrLength(
                          columnGap
                      )};`,
                  },
    },
    {
        propName: 'columns',
        getCSS: (propValue) => {
            const cssPropertyValue =
                typeof propValue === 'number' // 3 => '1fr 1fr 1fr'
                    ? `repeat(${propValue}, 1fr)`
                    : Array.isArray(propValue) // [1, 2, '150px'] => '1fr 2fr 150px'
                    ? propValue
                          .map((column) =>
                              typeof column === 'number'
                                  ? `repeat(${column}, 1fr)`
                                  : column
                          )
                          .join(' ')
                    : propValue;

            return {
                'display': 'grid',
                'grid-template-columns': cssPropertyValue,
            };
        },
    },
    {
        propName: 'cursor',
        cssProperty: 'cursor',
    },
    {
        propName: 'display',
        cssProperty: 'display',
    },
    {
        propName: 'flexDirection',
        getCSS: (flexDirection) => ({
            'display': 'flex',
            'flex-direction': flexDirection,
        }),
    },
    {
        propName: 'flexGrow',
        cssProperty: 'flex-grow',
        getValue: toNumber,
    },
    {
        propName: 'flexShrink',
        cssProperty: 'flex-shrink',
        getValue: toNumber,
    },
    {
        propName: 'flexWrap',
        cssProperty: 'flex-wrap',
    },
    {
        propName: 'fontSize',
        getCSS: (fontSize) => ({
            'font-size': FONT_SIZES[fontSize],
            'line-height': LINE_HEIGHTS[fontSize],
        }),
    },
    {
        propName: 'fontStyle',
        cssProperty: 'font-style',
    },
    {
        propName: 'fontWeight',
        cssProperty: 'font-weight',
    },
    {
        propName: 'gap',
        getCSS: (gap, { columns, flexDirection }) => {
            const styles = {};

            if (columns === undefined) {
                const marginEdgeByFlexDirection = {
                    'column': 'top',
                    'column-reverse': 'bottom',
                    'row': 'left',
                    'row-reverse': 'right',
                };

                styles['display'] = 'flex';
                styles[CHILDREN_SELECTOR] = `margin-${
                    marginEdgeByFlexDirection[flexDirection || 'row']
                }: ${toGridSizeOrLength(gap)};`;
            } else {
                styles['gap'] = toGridSizeOrLength(gap);
            }

            return styles;
        },
    },
    {
        propName: 'height',
        cssProperty: 'height',
        getValue: toLength,
    },
    {
        propName: 'hoverProps',
        getCSS: (hoverProps) => ({
            '&:hover, &:focus': buildBoxStyles(hoverProps),
        }),
    },
    {
        propName: 'isFlexible',
        cssProperty: ['flex-grow', 'flex-shrink'],
        getValue: (isFlexible) => toNumber(isFlexible),
    },
    {
        propName: 'isOnlyForScreenReaders',
        getCSS: (isOnlyForScreenReaders) =>
            isOnlyForScreenReaders
                ? {
                      'position': 'absolute',
                      'width': '1px',
                      'height': '1px',
                      'padding': 0,
                      'margin': '-1px',
                      'overflow': 'hidden',
                      'clip': 'rect(0, 0, 0, 0)',
                      'white-space': 'nowrap',
                      'border': 0,
                  }
                : {},
    },
    {
        propName: 'justifyContent',
        getCSS: (justifyContent) => ({
            'display': 'flex',
            'justify-content': justifyContent,
        }),
    },
    {
        propName: 'justifySelf',
        cssProperty: 'justify-self',
    },
    {
        propName: 'left',
        cssProperty: 'left',
        getValue: toGridSizeOrLength,
    },
    {
        propName: 'margin',
        cssProperty: 'margin',
        getValue: toGridSizeOrLength,
    },
    {
        propName: 'marginBottom',
        cssProperty: 'margin-bottom',
        getValue: toGridSizeOrLength,
    },
    {
        propName: 'marginLeft',
        cssProperty: 'margin-left',
        getValue: toGridSizeOrLength,
    },
    {
        propName: 'marginRight',
        cssProperty: 'margin-right',
        getValue: toGridSizeOrLength,
    },
    {
        propName: 'marginTop',
        cssProperty: 'margin-top',
        getValue: toGridSizeOrLength,
    },
    {
        propName: 'marginX',
        cssProperty: ['margin-left', 'margin-right'],
        getValue: toGridSizeOrLength,
    },
    {
        propName: 'marginY',
        cssProperty: ['margin-top', 'margin-bottom'],
        getValue: toGridSizeOrLength,
    },
    {
        propName: 'maxLines',
        getCSS: (maxLines) => ({
            '-webkit-box-orient': 'vertical',
            '-webkit-line-clamp': maxLines,
            'display': '-webkit-box',
            'overflow': 'hidden',
        }),
    },
    {
        propName: 'maxHeight',
        cssProperty: 'max-height',
        getValue: toLength,
    },
    {
        propName: 'maxWidth',
        cssProperty: 'max-width',
        getValue: toLength,
    },
    {
        propName: 'minHeight',
        cssProperty: 'min-height',
        getValue: toLength,
    },
    {
        propName: 'minWidth',
        cssProperty: 'min-width',
        getValue: toLength,
    },
    {
        propName: 'opacity',
        cssProperty: 'opacity',
    },
    {
        propName: 'overflow',
        cssProperty: 'overflow',
    },
    {
        propName: 'overflowX',
        cssProperty: 'overflow-x',
    },
    {
        propName: 'overflowY',
        cssProperty: 'overflow-y',
    },
    {
        propName: 'padding',
        cssProperty: 'padding',
        getValue: toGridSizeOrLength,
    },
    {
        propName: 'paddingX',
        cssProperty: ['padding-left', 'padding-right'],
        getValue: toGridSizeOrLength,
    },
    {
        propName: 'paddingY',
        cssProperty: ['padding-top', 'padding-bottom'],
        getValue: toGridSizeOrLength,
    },
    {
        propName: 'paddingBottom',
        cssProperty: 'padding-bottom',
        getValue: toGridSizeOrLength,
    },
    {
        propName: 'paddingLeft',
        cssProperty: 'padding-left',
        getValue: toGridSizeOrLength,
    },
    {
        propName: 'paddingRight',
        cssProperty: 'padding-right',
        getValue: toGridSizeOrLength,
    },
    {
        propName: 'paddingTop',
        cssProperty: 'padding-top',
        getValue: toGridSizeOrLength,
    },
    {
        propName: 'pointerEvents',
        cssProperty: 'pointer-events',
    },
    {
        propName: 'position',
        cssProperty: 'position',
    },
    {
        propName: 'responsiveProps',
        getCSS: (responsiveProps) => {
            const styles = {};
            const breakpointNames = Object.keys(responsiveProps);

            breakpointNames.forEach((breakpointName) => {
                const breakpointSelector =
                    RESPONSIVE_BREAKPOINTS[breakpointName];
                styles[breakpointSelector] = buildBoxStyles(
                    responsiveProps[breakpointName]
                );
            });

            return styles;
        },
    },
    {
        propName: 'right',
        cssProperty: 'right',
        getValue: toGridSizeOrLength,
    },
    {
        propName: 'rowGap',
        getCSS: (rowGap, { columns, flexDirection }) =>
            columns
                ? {
                      'row-gap': toGridSizeOrLength(rowGap),
                  }
                : {
                      'display': 'flex',
                      'flex-direction': flexDirection || 'column',
                      [CHILDREN_SELECTOR]: `margin-top: ${toGridSizeOrLength(
                          rowGap
                      )};`,
                  },
    },
    {
        propName: 'textAlign',
        cssProperty: 'text-align',
    },
    {
        propName: 'textDecoration',
        cssProperty: 'text-decoration',
        getValue: (textDecoration) => TEXT_DECORATIONS[textDecoration],
    },
    {
        propName: 'top',
        cssProperty: 'top',
        getValue: toGridSizeOrLength,
    },
    {
        propName: 'transform',
        cssProperty: 'transform',
    },
    {
        propName: 'transitionDuration',
        cssProperty: 'transition-duration',
        getValue: (transitionDuration) =>
            transitionDuration in TRANSITION_DURATIONS
                ? TRANSITION_DURATIONS[transitionDuration]
                : typeof transitionDuration === 'number'
                ? `${transitionDuration}ms`
                : transitionDuration,
    },
    {
        propName: 'transitionProperty',
        getCSS: (transitionProperty, { transitionDuration }) => ({
            'transition-property': [].concat(transitionProperty).join(', '),
            ...(!transitionDuration && {
                'transition-duration': TRANSITION_DURATIONS.normal,
            }),
        }),
    },
    {
        propName: 'transitionTimingFunction',
        getCSS: (transitionTimingFunction, { transitionDuration }) => ({
            'transition-timing-function': transitionTimingFunction,
            ...(!transitionDuration && {
                'transition-duration': TRANSITION_DURATIONS.normal,
            }),
        }),
    },
    {
        propName: 'whiteSpace',
        cssProperty: 'white-space',
    },
    {
        propName: 'width',
        cssProperty: 'width',
        getValue: toLength,
    },
    {
        propName: 'zIndex',
        cssProperty: 'z-index',
        getValue: (zIndex) =>
            typeof zIndex === 'number' ? zIndex : Z_INDEXES[zIndex],
    },
];

// isOnlyForScreenReaders: 'is-only-for-screen-readers',
// maxLines: 'max-lines',

const buildBoxStyles = (props: BoxStyleProps = {}) => {
    const cssProperties = {};
    const nestedSelectors = {};

    boxPropRenderers.forEach((boxPropRenderer) => {
        const { cssProperty, getCSS, getValue, propName } = boxPropRenderer;

        if (
            ([] as Array<string>)
                .concat(propName)
                .every((v) => [null, undefined].includes(props[v]))
        ) {
            return;
        }

        if (getCSS) {
            const generatedCSS = getCSS(
                Array.isArray(propName) ? null : props[propName],
                props
            );

            Object.keys(generatedCSS).forEach((cssProperty) => {
                if (['&', '@', ':'].includes(cssProperty[0])) {
                    const selector = cssProperty;

                    if (nestedSelectors[selector] === undefined) {
                        nestedSelectors[selector] = '';
                    }

                    nestedSelectors[selector] += generatedCSS[selector];
                } else {
                    cssProperties[cssProperty] = generatedCSS[cssProperty];
                }
            });
        } else if (typeof propName === 'string') {
            const propValue = getValue
                ? getValue(props[propName], props)
                : props[propName];

            if (Array.isArray(cssProperty)) {
                cssProperty.forEach((cssPropertyName) => {
                    cssProperties[cssPropertyName] = propValue;
                });
            } else {
                cssProperties[cssProperty as string] = propValue;
            }
        }
    });

    const cssForProperties = Object.keys(cssProperties)
        .sort()
        .map((cssProperty) => `${cssProperty}: ${cssProperties[cssProperty]};`);

    const cssForNestedSelectors = Object.keys(nestedSelectors)
        .sort()
        .map((selector) =>
            [`${selector} {`, nestedSelectors[selector], '}'].join('\n')
        );

    return [...cssForProperties, ...cssForNestedSelectors].join('\n');
};

export default buildBoxStyles;
