import { BoxStyleProps } from './Box.types';
export declare const CHILDREN_SELECTOR = "& > *:not([data-is-hidden]) + *:not([data-is-hidden])";
declare const buildBoxStyles: (props?: BoxStyleProps) => string;
export default buildBoxStyles;
