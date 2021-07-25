/// <reference types="react" />
import { RESPONSIVE_BREAKPOINTS } from '../../tokens';
import { BoxStyleProps } from './Box.types';
declare type CoreBoxProps<Component extends React.ElementType> = BoxStyleProps & {
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
export declare type BoxProps<Component extends React.ElementType = 'div'> = CoreBoxProps<Component> & Omit<React.ComponentPropsWithRef<Component>, keyof CoreBoxProps<Component> | keyof BoxStyleProps>;
declare type BoxComponent = <Component extends React.ElementType = 'div'>(props: BoxProps<Component>) => JSX.Element;
declare const Box: BoxComponent;
export default Box;
