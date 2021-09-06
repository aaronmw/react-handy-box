import React from 'react';
import styled from 'styled-components';
import { ConfigObject } from '../../Config';
import { BoxStyleProps, HandyBoxConfig } from './Box.types';
import buildBoxStyles from './buildBoxStyles';

type CoreBoxProps<
    Config extends HandyBoxConfig,
    TagName extends React.ElementType = 'div'
> = BoxStyleProps<Config> & {
    additionalCSS?: string;
    as?: TagName;
    children?: React.ReactNode;
    highlightFocusWithin?: boolean;
    hoverProps?: BoxStyleProps<Config>;
    isOnlyForScreenReaders?: boolean;
    responsiveProps?: {
        [breakpoint in keyof typeof ConfigObject['current']['responsiveBreakpoints']]?: BoxProps<
            Config,
            TagName
        >;
    };
};

export type BoxProps<
    Config extends HandyBoxConfig,
    TagName extends React.ElementType = 'div'
> = CoreBoxProps<Config, TagName> &
    Omit<
        React.ComponentPropsWithRef<TagName>,
        keyof CoreBoxProps<Config, TagName> | keyof BoxStyleProps<Config>
    >;

type BoxComponent = <
    Config extends HandyBoxConfig,
    TagName extends React.ElementType = 'div'
>(
    props: BoxProps<Config, TagName>
) => JSX.Element;

const alwaysForwardedProps = ['disabled', 'onClick', 'width', 'height'];

const boxPropNames = [
    'additionalCSS',
    'alignItems',
    'alignSelf',
    'as',
    'backgroundColor',
    'backgroundColorLightness',
    'border',
    'borderBottom',
    'borderColor',
    'borderColorLightness',
    'borderBottomColor',
    'borderBottomColorLightness',
    'borderLeftColor',
    'borderLeftColorLightness',
    'borderRightColor',
    'borderRightColorLightness',
    'borderTopColor',
    'borderTopColorLightness',
    'borderLeft',
    'borderRadius',
    'borderRadiusBottomLeft',
    'borderRadiusBottomRight',
    'borderRadiusTopLeft',
    'borderRadiusTopRight',
    'borderRight',
    'borderTop',
    'bottom',
    'boxShadow',
    'color',
    'colorLightness',
    'columnGap',
    'columns',
    'cursor',
    'disabled',
    'display',
    'flexDirection',
    'flexGrow',
    'flexShrink',
    'flexWrap',
    'fontSize',
    'fontStyle',
    'fontWeight',
    'gap',
    'height',
    'highlightFocusWithin',
    'hoverProps',
    'isFlexible',
    'isOnlyForScreenReaders',
    'justifyContent',
    'justifySelf',
    'left',
    'margin',
    'marginBottom',
    'marginLeft',
    'marginRight',
    'marginTop',
    'marginX',
    'marginY',
    'maxHeight',
    'maxLines',
    'maxWidth',
    'minHeight',
    'minWidth',
    'opacity',
    'overflow',
    'overflowX',
    'overflowY',
    'padding',
    'paddingBottom',
    'paddingLeft',
    'paddingRight',
    'paddingTop',
    'paddingX',
    'paddingY',
    'pointerEvents',
    'position',
    'responsiveProps',
    'right',
    'rowGap',
    'rows',
    'textAlign',
    'textDecoration',
    'top',
    'transform',
    'transitionDuration',
    'transitionProperty',
    'transitionTimingFunction',
    'whiteSpace',
    'width',
    'zIndex',
];

type BoxGeneratorTypeWhatever<TagName extends React.ElementType = 'div', Config extends HandyBoxConfig = > = (props: {
    as?: TagName;
    config?: Config
}) => BoxComponent;

const Box: BoxComponent = styled.div
    .attrs((props) => ({
        // Automatically apply aria-hidden attr
        'aria-hidden':
            (props as any).isOnlyForScreenReaders === true ? 'true' : null,

        // FontAwesome forces area-hidden to "true" no matter what; this
        // gives us a selector for explicitly hidden Boxes
        'data-is-hidden':
            (props as any).isOnlyForScreenReaders === true ? 'true' : null,
    }))
    .withConfig({
        shouldForwardProp: (propName, nativeFilter) => {
            return (
                alwaysForwardedProps.includes(propName as any) ||
                (boxPropNames.includes(propName as any) === false &&
                    nativeFilter(propName) === true)
            );
        },
    })((props: BoxProps<Config, TagName>): BoxGeneratorTypeWhatever<Config extends HandyBoxConfig> => {return buildBoxStyles(props)});

export default Box;
