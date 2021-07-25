import styled from 'styled-components';
import { RESPONSIVE_BREAKPOINTS } from '../../tokens';
import { BoxStyleProps } from './Box.types';
import buildBoxStyles from './buildBoxStyles';

type CoreBoxProps<Component extends React.ElementType> = BoxStyleProps & {
    additionalCSS?: string;
    as?: Component;
    children?: React.ReactNode;
    highlightFocusWithin?: boolean;
    hoverProps?: BoxStyleProps;
    isOnlyForScreenReaders?: boolean;
    responsiveProps?: {
        [breakpoint in keyof typeof RESPONSIVE_BREAKPOINTS]?: BoxProps<Component>;
    };
};

export type BoxProps<Component extends React.ElementType = 'div'> =
    CoreBoxProps<Component> &
        Omit<
            React.ComponentPropsWithRef<Component>,
            keyof CoreBoxProps<Component> | keyof BoxStyleProps
        >;

type BoxComponent = <Component extends React.ElementType = 'div'>(
    props: BoxProps<Component>
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
    })((props: BoxProps) => buildBoxStyles(props));

export default Box;
