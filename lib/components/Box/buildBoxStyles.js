"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CHILDREN_SELECTOR = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.array.sort.js");

var _lodash = require("lodash");

var _tokens = require("../../tokens");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Exported for tests
const CHILDREN_SELECTOR = '& > *:not([data-is-hidden]) + *:not([data-is-hidden])';
exports.CHILDREN_SELECTOR = CHILDREN_SELECTOR;

const toBorder = (borderPropName, props) => {
  const propValue = props[borderPropName];
  const borderColor = props["".concat(borderPropName, "Color")] || props['borderColor'] || 'border';
  const borderColorLightness = props["".concat(borderPropName, "ColorLightness")] || props["borderColorLightness"] || undefined;
  return propValue === false ? 'none' : "".concat(_tokens.BORDER_STYLES[propValue === true ? 'normal' : propValue], " ").concat(String(toColor(borderColor, borderColorLightness)));
};

const toBorderColor = (borderPropName, props) => toColor(props["".concat(borderPropName, "Color")], props["".concat(borderPropName, "ColorLightness")]);

const toBorderRadius = borderRadiusPropValue => _tokens.BORDER_RADII[borderRadiusPropValue];

const toColor = function toColor(colorName) {
  let adjustment = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (colorName in _tokens.UNADJUSTABLE_COLORS) {
    return _tokens.UNADJUSTABLE_COLORS[colorName];
  }

  const baseColorName = colorName in _tokens.SPOT_COLORS ? _tokens.SPOT_COLORS[colorName] : colorName;

  if (!adjustment) {
    return _tokens.COLOR_PALETTE[baseColorName];
  }

  const [rootColor, currentLightnessValue = 400] = baseColorName.split('--');
  const adjustedLightnessValue = (0, _lodash.clamp)(typeof adjustment === 'string' ? Number(currentLightnessValue) + Number(adjustment) : adjustment, 100, 700);
  return _tokens.COLOR_PALETTE["".concat(rootColor, "--").concat(adjustedLightnessValue)];
};

const toGridSizeOrLength = propValue => propValue === false ? 0 : propValue === true ? _tokens.GRID_SIZES.normal : typeof propValue === 'number' ? "".concat(propValue, "px") : propValue in _tokens.GRID_SIZES ? _tokens.GRID_SIZES[propValue] : propValue;

const toLength = propValue => typeof propValue === 'number' ? "".concat(propValue, "px") : propValue;

const toNumber = v => v === true ? 1 : v === false ? 0 : Number(v);

const boxPropRenderers = [{
  propName: ['as', 'highlightFocusWithin', 'href', 'position', 'tabIndex', 'zIndex', 'onClick'],
  getCSS: (_, _ref) => {
    let {
      as,
      disabled,
      highlightFocusWithin,
      href,
      position,
      tabIndex,
      zIndex,
      onClick
    } = _ref;
    return highlightFocusWithin || href || onClick || ['button', 'a', 'input', 'textarea', 'select'].includes(as) || typeof tabIndex === 'number' ? {
      cursor: disabled ? 'default' : 'pointer',
      [highlightFocusWithin ? '&:focus-within' : '&:focus']: ["box-shadow: 0 0 0 2px white, 0 0 0 6px ".concat(_tokens.COLOR_PALETTE[_tokens.SPOT_COLORS['focusIndicator']], ";"), "border-radius: ".concat(_tokens.BORDER_RADII.normal, ";"), "position: ".concat(position || 'relative', ";"), "z-index: ".concat(typeof zIndex === 'number' ? zIndex : _tokens.Z_INDEXES[zIndex || '1--stickyElements'], ";")].join('\n')
    } : {};
  }
}, {
  propName: 'additionalCSS',
  getCSS: additionalCSS => ({
    '&': additionalCSS
  })
}, {
  propName: 'alignItems',
  getCSS: alignItems => ({
    'display': 'flex',
    'align-items': alignItems
  })
}, {
  propName: 'alignSelf',
  cssProperty: 'align-self'
}, {
  propName: 'backgroundColor',
  cssProperty: 'background-color',
  getValue: (backgroundColor, _ref2) => {
    let {
      backgroundColorLightness
    } = _ref2;
    return toColor(backgroundColor, backgroundColorLightness);
  }
}, {
  propName: 'border',
  cssProperty: 'border',
  getValue: (_, props) => toBorder('border', props)
}, {
  propName: 'borderBottom',
  cssProperty: 'border-bottom',
  getValue: (_, props) => toBorder('borderBottom', props)
}, {
  propName: 'borderBottomColor',
  cssProperty: 'border-bottom-color',
  getValue: (_, props) => toBorderColor('borderBottom', props)
}, {
  propName: 'borderLeft',
  cssProperty: 'border-left',
  getValue: (_, props) => toBorder('borderLeft', props)
}, {
  propName: 'borderLeftColor',
  cssProperty: 'border-left-color',
  getValue: (_, props) => toBorderColor('borderLeft', props)
}, {
  propName: 'borderRadius',
  cssProperty: 'border-radius',
  getValue: toBorderRadius
}, {
  propName: 'borderBottomLeftRadius',
  cssProperty: 'border-bottom-left-radius',
  getValue: toBorderRadius
}, {
  propName: 'borderBottomRightRadius',
  cssProperty: 'border-bottom-right-radius',
  getValue: toBorderRadius
}, {
  propName: 'borderTopLeftRadius',
  cssProperty: 'border-top-left-radius',
  getValue: toBorderRadius
}, {
  propName: 'borderTopRightRadius',
  cssProperty: 'border-top-right-radius',
  getValue: toBorderRadius
}, {
  propName: 'borderRight',
  cssProperty: 'border-right',
  getValue: (_, props) => toBorder('borderRight', props)
}, {
  propName: 'borderRightColor',
  cssProperty: 'border-right-color',
  getValue: (_, props) => toBorderColor('borderRight', props)
}, {
  propName: 'borderTop',
  cssProperty: 'border-top',
  getValue: (_, props) => toBorder('borderTop', props)
}, {
  propName: 'borderTopColor',
  cssProperty: 'border-top-color',
  getValue: (_, props) => toBorderColor('borderTop', props)
}, {
  propName: 'bottom',
  cssProperty: 'bottom',
  getValue: toGridSizeOrLength
}, {
  propName: 'boxShadow',
  cssProperty: 'box-shadow',
  getValue: boxShadow => _tokens.BOX_SHADOW_STYLES[boxShadow]
}, {
  propName: 'color',
  cssProperty: 'color',
  getValue: (color, _ref3) => {
    let {
      colorLightness
    } = _ref3;
    return toColor(color, colorLightness);
  }
}, {
  propName: 'columnGap',
  getCSS: (columnGap, _ref4) => {
    let {
      columns
    } = _ref4;
    return columns ? {
      'column-gap': toGridSizeOrLength(columnGap)
    } : {
      display: 'flex',
      [CHILDREN_SELECTOR]: "margin-left: ".concat(toGridSizeOrLength(columnGap), ";")
    };
  }
}, {
  propName: 'columns',
  getCSS: propValue => {
    const cssPropertyValue = typeof propValue === 'number' // 3 => '1fr 1fr 1fr'
    ? "repeat(".concat(propValue, ", 1fr)") : Array.isArray(propValue) // [1, 2, '150px'] => '1fr 2fr 150px'
    ? propValue.map(column => typeof column === 'number' ? "repeat(".concat(column, ", 1fr)") : column).join(' ') : propValue;
    return {
      'display': 'grid',
      'grid-template-columns': cssPropertyValue
    };
  }
}, {
  propName: 'cursor',
  cssProperty: 'cursor'
}, {
  propName: 'display',
  cssProperty: 'display'
}, {
  propName: 'flexDirection',
  getCSS: flexDirection => ({
    'display': 'flex',
    'flex-direction': flexDirection
  })
}, {
  propName: 'flexGrow',
  cssProperty: 'flex-grow',
  getValue: toNumber
}, {
  propName: 'flexShrink',
  cssProperty: 'flex-shrink',
  getValue: toNumber
}, {
  propName: 'flexWrap',
  cssProperty: 'flex-wrap'
}, {
  propName: 'fontSize',
  getCSS: fontSize => ({
    'font-size': _tokens.FONT_SIZES[fontSize],
    'line-height': _tokens.LINE_HEIGHTS[fontSize]
  })
}, {
  propName: 'fontStyle',
  cssProperty: 'font-style'
}, {
  propName: 'fontWeight',
  cssProperty: 'font-weight'
}, {
  propName: 'gap',
  getCSS: (gap, _ref5) => {
    let {
      columns,
      flexDirection
    } = _ref5;
    const styles = {};

    if (columns === undefined) {
      const marginEdgeByFlexDirection = {
        'column': 'top',
        'column-reverse': 'bottom',
        'row': 'left',
        'row-reverse': 'right'
      };
      styles['display'] = 'flex';
      styles[CHILDREN_SELECTOR] = "margin-".concat(marginEdgeByFlexDirection[flexDirection || 'row'], ": ").concat(toGridSizeOrLength(gap), ";");
    } else {
      styles['gap'] = toGridSizeOrLength(gap);
    }

    return styles;
  }
}, {
  propName: 'height',
  cssProperty: 'height',
  getValue: toLength
}, {
  propName: 'hoverProps',
  getCSS: hoverProps => ({
    '&:hover, &:focus': buildBoxStyles(hoverProps)
  })
}, {
  propName: 'isFlexible',
  cssProperty: ['flex-grow', 'flex-shrink'],
  getValue: isFlexible => toNumber(isFlexible)
}, {
  propName: 'isOnlyForScreenReaders',
  getCSS: isOnlyForScreenReaders => isOnlyForScreenReaders ? {
    'position': 'absolute',
    'width': '1px',
    'height': '1px',
    'padding': 0,
    'margin': '-1px',
    'overflow': 'hidden',
    'clip': 'rect(0, 0, 0, 0)',
    'white-space': 'nowrap',
    'border': 0
  } : {}
}, {
  propName: 'justifyContent',
  getCSS: justifyContent => ({
    'display': 'flex',
    'justify-content': justifyContent
  })
}, {
  propName: 'justifySelf',
  cssProperty: 'justify-self'
}, {
  propName: 'left',
  cssProperty: 'left',
  getValue: toGridSizeOrLength
}, {
  propName: 'margin',
  cssProperty: 'margin',
  getValue: toGridSizeOrLength
}, {
  propName: 'marginBottom',
  cssProperty: 'margin-bottom',
  getValue: toGridSizeOrLength
}, {
  propName: 'marginLeft',
  cssProperty: 'margin-left',
  getValue: toGridSizeOrLength
}, {
  propName: 'marginRight',
  cssProperty: 'margin-right',
  getValue: toGridSizeOrLength
}, {
  propName: 'marginTop',
  cssProperty: 'margin-top',
  getValue: toGridSizeOrLength
}, {
  propName: 'marginX',
  cssProperty: ['margin-left', 'margin-right'],
  getValue: toGridSizeOrLength
}, {
  propName: 'marginY',
  cssProperty: ['margin-top', 'margin-bottom'],
  getValue: toGridSizeOrLength
}, {
  propName: 'maxLines',
  getCSS: maxLines => ({
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': maxLines,
    'display': '-webkit-box',
    'overflow': 'hidden'
  })
}, {
  propName: 'maxHeight',
  cssProperty: 'max-height',
  getValue: toLength
}, {
  propName: 'maxWidth',
  cssProperty: 'max-width',
  getValue: toLength
}, {
  propName: 'minHeight',
  cssProperty: 'min-height',
  getValue: toLength
}, {
  propName: 'minWidth',
  cssProperty: 'min-width',
  getValue: toLength
}, {
  propName: 'opacity',
  cssProperty: 'opacity'
}, {
  propName: 'overflow',
  cssProperty: 'overflow'
}, {
  propName: 'overflowX',
  cssProperty: 'overflow-x'
}, {
  propName: 'overflowY',
  cssProperty: 'overflow-y'
}, {
  propName: 'padding',
  cssProperty: 'padding',
  getValue: toGridSizeOrLength
}, {
  propName: 'paddingX',
  cssProperty: ['padding-left', 'padding-right'],
  getValue: toGridSizeOrLength
}, {
  propName: 'paddingY',
  cssProperty: ['padding-top', 'padding-bottom'],
  getValue: toGridSizeOrLength
}, {
  propName: 'paddingBottom',
  cssProperty: 'padding-bottom',
  getValue: toGridSizeOrLength
}, {
  propName: 'paddingLeft',
  cssProperty: 'padding-left',
  getValue: toGridSizeOrLength
}, {
  propName: 'paddingRight',
  cssProperty: 'padding-right',
  getValue: toGridSizeOrLength
}, {
  propName: 'paddingTop',
  cssProperty: 'padding-top',
  getValue: toGridSizeOrLength
}, {
  propName: 'pointerEvents',
  cssProperty: 'pointer-events'
}, {
  propName: 'position',
  cssProperty: 'position'
}, {
  propName: 'responsiveProps',
  getCSS: responsiveProps => {
    const styles = {};
    const breakpointNames = Object.keys(responsiveProps);
    breakpointNames.forEach(breakpointName => {
      const breakpointSelector = _tokens.RESPONSIVE_BREAKPOINTS[breakpointName];
      styles[breakpointSelector] = buildBoxStyles(responsiveProps[breakpointName]);
    });
    return styles;
  }
}, {
  propName: 'right',
  cssProperty: 'right',
  getValue: toGridSizeOrLength
}, {
  propName: 'rowGap',
  getCSS: (rowGap, _ref6) => {
    let {
      columns,
      flexDirection
    } = _ref6;
    return columns ? {
      'row-gap': toGridSizeOrLength(rowGap)
    } : {
      'display': 'flex',
      'flex-direction': flexDirection || 'column',
      [CHILDREN_SELECTOR]: "margin-top: ".concat(toGridSizeOrLength(rowGap), ";")
    };
  }
}, {
  propName: 'textAlign',
  cssProperty: 'text-align'
}, {
  propName: 'textDecoration',
  cssProperty: 'text-decoration',
  getValue: textDecoration => _tokens.TEXT_DECORATIONS[textDecoration]
}, {
  propName: 'top',
  cssProperty: 'top',
  getValue: toGridSizeOrLength
}, {
  propName: 'transform',
  cssProperty: 'transform'
}, {
  propName: 'transitionDuration',
  cssProperty: 'transition-duration',
  getValue: transitionDuration => transitionDuration in _tokens.TRANSITION_DURATIONS ? _tokens.TRANSITION_DURATIONS[transitionDuration] : typeof transitionDuration === 'number' ? "".concat(transitionDuration, "ms") : transitionDuration
}, {
  propName: 'transitionProperty',
  getCSS: (transitionProperty, _ref7) => {
    let {
      transitionDuration
    } = _ref7;
    return _objectSpread({
      'transition-property': [].concat(transitionProperty).join(', ')
    }, !transitionDuration && {
      'transition-duration': _tokens.TRANSITION_DURATIONS.normal
    });
  }
}, {
  propName: 'transitionTimingFunction',
  getCSS: (transitionTimingFunction, _ref8) => {
    let {
      transitionDuration
    } = _ref8;
    return _objectSpread({
      'transition-timing-function': transitionTimingFunction
    }, !transitionDuration && {
      'transition-duration': _tokens.TRANSITION_DURATIONS.normal
    });
  }
}, {
  propName: 'whiteSpace',
  cssProperty: 'white-space'
}, {
  propName: 'width',
  cssProperty: 'width',
  getValue: toLength
}, {
  propName: 'zIndex',
  cssProperty: 'z-index',
  getValue: zIndex => typeof zIndex === 'number' ? zIndex : _tokens.Z_INDEXES[zIndex]
}]; // isOnlyForScreenReaders: 'is-only-for-screen-readers',
// maxLines: 'max-lines',

const buildBoxStyles = function buildBoxStyles() {
  let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const cssProperties = {};
  const nestedSelectors = {};
  boxPropRenderers.forEach(boxPropRenderer => {
    const {
      cssProperty,
      getCSS,
      getValue,
      propName
    } = boxPropRenderer;

    if ([].concat(propName).every(v => [null, undefined].includes(props[v]))) {
      return;
    }

    if (getCSS) {
      const generatedCSS = getCSS(Array.isArray(propName) ? null : props[propName], props);
      Object.keys(generatedCSS).forEach(cssProperty => {
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
      const propValue = getValue ? getValue(props[propName], props) : props[propName];

      if (Array.isArray(cssProperty)) {
        cssProperty.forEach(cssPropertyName => {
          cssProperties[cssPropertyName] = propValue;
        });
      } else {
        cssProperties[cssProperty] = propValue;
      }
    }
  });
  const cssForProperties = Object.keys(cssProperties).sort().map(cssProperty => "".concat(cssProperty, ": ").concat(cssProperties[cssProperty], ";"));
  const cssForNestedSelectors = Object.keys(nestedSelectors).sort().map(selector => ["".concat(selector, " {"), nestedSelectors[selector], '}'].join('\n'));
  return [...cssForProperties, ...cssForNestedSelectors].join('\n');
};

var _default = buildBoxStyles;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvY29tcG9uZW50cy9Cb3gvYnVpbGRCb3hTdHlsZXMudHMiXSwibmFtZXMiOlsiQ0hJTERSRU5fU0VMRUNUT1IiLCJ0b0JvcmRlciIsImJvcmRlclByb3BOYW1lIiwicHJvcHMiLCJwcm9wVmFsdWUiLCJib3JkZXJDb2xvciIsImJvcmRlckNvbG9yTGlnaHRuZXNzIiwidW5kZWZpbmVkIiwiQk9SREVSX1NUWUxFUyIsIlN0cmluZyIsInRvQ29sb3IiLCJ0b0JvcmRlckNvbG9yIiwidG9Cb3JkZXJSYWRpdXMiLCJib3JkZXJSYWRpdXNQcm9wVmFsdWUiLCJCT1JERVJfUkFESUkiLCJjb2xvck5hbWUiLCJhZGp1c3RtZW50IiwiVU5BREpVU1RBQkxFX0NPTE9SUyIsImJhc2VDb2xvck5hbWUiLCJTUE9UX0NPTE9SUyIsIkNPTE9SX1BBTEVUVEUiLCJyb290Q29sb3IiLCJjdXJyZW50TGlnaHRuZXNzVmFsdWUiLCJzcGxpdCIsImFkanVzdGVkTGlnaHRuZXNzVmFsdWUiLCJOdW1iZXIiLCJ0b0dyaWRTaXplT3JMZW5ndGgiLCJHUklEX1NJWkVTIiwibm9ybWFsIiwidG9MZW5ndGgiLCJ0b051bWJlciIsInYiLCJib3hQcm9wUmVuZGVyZXJzIiwicHJvcE5hbWUiLCJnZXRDU1MiLCJfIiwiYXMiLCJkaXNhYmxlZCIsImhpZ2hsaWdodEZvY3VzV2l0aGluIiwiaHJlZiIsInBvc2l0aW9uIiwidGFiSW5kZXgiLCJ6SW5kZXgiLCJvbkNsaWNrIiwiaW5jbHVkZXMiLCJjdXJzb3IiLCJaX0lOREVYRVMiLCJqb2luIiwiYWRkaXRpb25hbENTUyIsImFsaWduSXRlbXMiLCJjc3NQcm9wZXJ0eSIsImdldFZhbHVlIiwiYmFja2dyb3VuZENvbG9yIiwiYmFja2dyb3VuZENvbG9yTGlnaHRuZXNzIiwiYm94U2hhZG93IiwiQk9YX1NIQURPV19TVFlMRVMiLCJjb2xvciIsImNvbG9yTGlnaHRuZXNzIiwiY29sdW1uR2FwIiwiY29sdW1ucyIsImRpc3BsYXkiLCJjc3NQcm9wZXJ0eVZhbHVlIiwiQXJyYXkiLCJpc0FycmF5IiwibWFwIiwiY29sdW1uIiwiZmxleERpcmVjdGlvbiIsImZvbnRTaXplIiwiRk9OVF9TSVpFUyIsIkxJTkVfSEVJR0hUUyIsImdhcCIsInN0eWxlcyIsIm1hcmdpbkVkZ2VCeUZsZXhEaXJlY3Rpb24iLCJob3ZlclByb3BzIiwiYnVpbGRCb3hTdHlsZXMiLCJpc0ZsZXhpYmxlIiwiaXNPbmx5Rm9yU2NyZWVuUmVhZGVycyIsImp1c3RpZnlDb250ZW50IiwibWF4TGluZXMiLCJyZXNwb25zaXZlUHJvcHMiLCJicmVha3BvaW50TmFtZXMiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImJyZWFrcG9pbnROYW1lIiwiYnJlYWtwb2ludFNlbGVjdG9yIiwiUkVTUE9OU0lWRV9CUkVBS1BPSU5UUyIsInJvd0dhcCIsInRleHREZWNvcmF0aW9uIiwiVEVYVF9ERUNPUkFUSU9OUyIsInRyYW5zaXRpb25EdXJhdGlvbiIsIlRSQU5TSVRJT05fRFVSQVRJT05TIiwidHJhbnNpdGlvblByb3BlcnR5IiwiY29uY2F0IiwidHJhbnNpdGlvblRpbWluZ0Z1bmN0aW9uIiwiY3NzUHJvcGVydGllcyIsIm5lc3RlZFNlbGVjdG9ycyIsImJveFByb3BSZW5kZXJlciIsImV2ZXJ5IiwiZ2VuZXJhdGVkQ1NTIiwic2VsZWN0b3IiLCJjc3NQcm9wZXJ0eU5hbWUiLCJjc3NGb3JQcm9wZXJ0aWVzIiwic29ydCIsImNzc0Zvck5lc3RlZFNlbGVjdG9ycyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBdUJBO0FBQ08sTUFBTUEsaUJBQWlCLEdBQzFCLHVEQURHOzs7QUFZUCxNQUFNQyxRQUtLLEdBQUcsQ0FBQ0MsY0FBRCxFQUFpQkMsS0FBakIsS0FBMkI7QUFDckMsUUFBTUMsU0FBUyxHQUFHRCxLQUFLLENBQUNELGNBQUQsQ0FBdkI7QUFDQSxRQUFNRyxXQUFXLEdBQ2JGLEtBQUssV0FBSUQsY0FBSixXQUFM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QkosZUFBZSxDQUFDSSxRQUFELENBQWpDLEVBQTZDLEdBQTdDLEVBQWtEckQsSUFBbEQsQ0FBdUQsSUFBdkQsQ0FIc0IsQ0FBOUI7QUFNQSxTQUFPLENBQUMsR0FBR3VELGdCQUFKLEVBQXNCLEdBQUdFLHFCQUF6QixFQUFnRHpELElBQWhELENBQXFELElBQXJELENBQVA7QUFDSCxDQTVERDs7ZUE4RGUyQixjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVhZGFibGVDb2xvciB9IGZyb20gJ3BvbGlzaGVkJztcbmltcG9ydCB7IGNsYW1wIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7XG4gICAgQk9SREVSX1JBRElJLFxuICAgIEJPUkRFUl9TVFlMRVMsXG4gICAgQk9YX1NIQURPV19TVFlMRVMsXG4gICAgQ09MT1JfUEFMRVRURSxcbiAgICBGT05UX1NJWkVTLFxuICAgIEdSSURfU0laRVMsXG4gICAgTElORV9IRUlHSFRTLFxuICAgIFJFU1BPTlNJVkVfQlJFQUtQT0lOVFMsXG4gICAgU1BPVF9DT0xPUlMsXG4gICAgVEVYVF9ERUNPUkFUSU9OUyxcbiAgICBUUkFOU0lUSU9OX0RVUkFUSU9OUyxcbiAgICBVTkFESlVTVEFCTEVfQ09MT1JTLFxuICAgIFpfSU5ERVhFUyxcbn0gZnJvbSAnLi4vLi4vdG9rZW5zJztcbmltcG9ydCB7XG4gICAgQm9yZGVyU3R5bGUsXG4gICAgQm94U3R5bGVQcm9wcyxcbiAgICBDb2xvcixcbiAgICBDb2xvckNvZGUsXG4gICAgQ29sb3JMaWdodG5lc3MsXG59IGZyb20gJy4vQm94LnR5cGVzJztcblxuLy8gRXhwb3J0ZWQgZm9yIHRlc3RzXG5leHBvcnQgY29uc3QgQ0hJTERSRU5fU0VMRUNUT1IgPVxuICAgICcmID4gKjpub3QoW2RhdGEtaXMtaGlkZGVuXSkgKyAqOm5vdChbZGF0YS1pcy1oaWRkZW5dKSc7XG5cbnR5cGUgQm9yZGVyUHJvcE5hbWUgPVxuICAgIHwgJ2JvcmRlcidcbiAgICB8ICdib3JkZXJUb3AnXG4gICAgfCAnYm9yZGVyUmlnaHQnXG4gICAgfCAnYm9yZGVyQm90dG9tJ1xuICAgIHwgJ2JvcmRlckxlZnQnO1xuXG50eXBlIEJvcmRlckNvbG9yUHJvcE5hbWUgPSBgJHtCb3JkZXJQcm9wTmFtZX1Db2xvcmA7XG5cbmNvbnN0IHRvQm9yZGVyOiAoXG4gICAgYm9yZGVyUHJvcE5hbWU6IEJvcmRlclByb3BOYW1lLFxuICAgIHByb3BzOiB7XG4gICAgICAgIFtwcm9wTmFtZTogc3RyaW5nXTogdW5rbm93bjtcbiAgICB9XG4pID0+IHN0cmluZyA9IChib3JkZXJQcm9wTmFtZSwgcHJvcHMpID0+IHtcbiAgICBjb25zdCBwcm9wVmFsdWUgPSBwcm9wc1tib3JkZXJQcm9wTmFtZV07XG4gICAgY29uc3QgYm9yZGVyQ29sb3IgPVxuICAgICAgICBwcm9wc1tgJHtib3JkZXJQcm9wTmFtZX1Db2xvcmBdIHx8IHByb3BzWydib3JkZXJDb2xvciddIHx8ICdib3JkZXInO1xuICAgIGNvbnN0IGJvcmRlckNvbG9yTGlnaHRuZXNzID1cbiAgICAgICAgcHJvcHNbYCR7Ym9yZGVyUHJvcE5hbWV9Q29sb3JMaWdodG5lc3NgXSB8fFxuICAgICAgICBwcm9wc1tgYm9yZGVyQ29sb3JMaWdodG5lc3NgXSB8fFxuICAgICAgICB1bmRlZmluZWQ7XG5cbiAgICByZXR1cm4gcHJvcFZhbHVlID09PSBmYWxzZVxuICAgICAgICA/ICdub25lJ1xuICAgICAgICA6IGAke1xuICAgICAgICAgICAgICBCT1JERVJfU1RZTEVTW1xuICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlID09PSB0cnVlID8gJ25vcm1hbCcgOiAocHJvcFZhbHVlIGFzIEJvcmRlclN0eWxlKVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgfSAke1N0cmluZyhcbiAgICAgICAgICAgICAgdG9Db2xvcihcbiAgICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yIGFzIENvbG9yLFxuICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3JMaWdodG5lc3MgYXMgQ29sb3JMaWdodG5lc3NcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICl9YDtcbn07XG5cbmNvbnN0IHRvQm9yZGVyQ29sb3I6IChcbiAgICBib3JkZXJQcm9wTmFtZTogQm9yZGVyUHJvcE5hbWUsXG4gICAgcHJvcHM6IFJlY29yZDxzdHJpbmcsIHVua25vd24+XG4pID0+IENvbG9yQ29kZSA9IChib3JkZXJQcm9wTmFtZSwgcHJvcHMpID0+XG4gICAgdG9Db2xvcihcbiAgICAgICAgcHJvcHNbYCR7Ym9yZGVyUHJvcE5hbWV9Q29sb3JgXSBhcyBDb2xvcixcbiAgICAgICAgcHJvcHNbYCR7Ym9yZGVyUHJvcE5hbWV9Q29sb3JMaWdodG5lc3NgXSBhcyBDb2xvckxpZ2h0bmVzc1xuICAgICk7XG5cbmNvbnN0IHRvQm9yZGVyUmFkaXVzID0gKGJvcmRlclJhZGl1c1Byb3BWYWx1ZSkgPT5cbiAgICBCT1JERVJfUkFESUlbYm9yZGVyUmFkaXVzUHJvcFZhbHVlXTtcblxuY29uc3QgdG9Db2xvcjogKFxuICAgIGNvbG9yTmFtZTogQ29sb3IsXG4gICAgYWRqdXN0bWVudD86IGJvb2xlYW4gfCBzdHJpbmcgfCBudW1iZXJcbikgPT4gQ29sb3JDb2RlID0gKGNvbG9yTmFtZSwgYWRqdXN0bWVudCA9IGZhbHNlKSA9PiB7XG4gICAgaWYgKGNvbG9yTmFtZSBpbiBVTkFESlVTVEFCTEVfQ09MT1JTKSB7XG4gICAgICAgIHJldHVybiBVTkFESlVTVEFCTEVfQ09MT1JTW2NvbG9yTmFtZV07XG4gICAgfVxuXG4gICAgY29uc3QgYmFzZUNvbG9yTmFtZSA9XG4gICAgICAgIGNvbG9yTmFtZSBpbiBTUE9UX0NPTE9SUyA/IFNQT1RfQ09MT1JTW2NvbG9yTmFtZV0gOiBjb2xvck5hbWU7XG5cbiAgICBpZiAoIWFkanVzdG1lbnQpIHtcbiAgICAgICAgcmV0dXJuIENPTE9SX1BBTEVUVEVbYmFzZUNvbG9yTmFtZV07XG4gICAgfVxuXG4gICAgY29uc3QgW3Jvb3RDb2xvciwgY3VycmVudExpZ2h0bmVzc1ZhbHVlID0gNDAwXSA9IGJhc2VDb2xvck5hbWUuc3BsaXQoJy0tJyk7XG5cbiAgICBjb25zdCBhZGp1c3RlZExpZ2h0bmVzc1ZhbHVlID0gY2xhbXAoXG4gICAgICAgIHR5cGVvZiBhZGp1c3RtZW50ID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgPyBOdW1iZXIoY3VycmVudExpZ2h0bmVzc1ZhbHVlKSArIE51bWJlcihhZGp1c3RtZW50KVxuICAgICAgICAgICAgOiAoYWRqdXN0bWVudCBhcyBudW1iZXIpLFxuICAgICAgICAxMDAsXG4gICAgICAgIDcwMFxuICAgICk7XG5cbiAgICByZXR1cm4gQ09MT1JfUEFMRVRURVtgJHtyb290Q29sb3J9LS0ke2FkanVzdGVkTGlnaHRuZXNzVmFsdWV9YF07XG59O1xuXG5jb25zdCB0b0dyaWRTaXplT3JMZW5ndGggPSAocHJvcFZhbHVlKSA9PlxuICAgIHByb3BWYWx1ZSA9PT0gZmFsc2VcbiAgICAgICAgPyAwXG4gICAgICAgIDogcHJvcFZhbHVlID09PSB0cnVlXG4gICAgICAgID8gR1JJRF9TSVpFUy5ub3JtYWxcbiAgICAgICAgOiB0eXBlb2YgcHJvcFZhbHVlID09PSAnbnVtYmVyJ1xuICAgICAgICA/IGAke3Byb3BWYWx1ZX1weGBcbiAgICAgICAgOiBwcm9wVmFsdWUgaW4gR1JJRF9TSVpFU1xuICAgICAgICA/IEdSSURfU0laRVNbcHJvcFZhbHVlXVxuICAgICAgICA6IHByb3BWYWx1ZTtcblxuY29uc3QgdG9MZW5ndGggPSAocHJvcFZhbHVlKSA9PlxuICAgIHR5cGVvZiBwcm9wVmFsdWUgPT09ICdudW1iZXInID8gYCR7cHJvcFZhbHVlfXB4YCA6IHByb3BWYWx1ZTtcblxuY29uc3QgdG9OdW1iZXIgPSAodikgPT4gKHYgPT09IHRydWUgPyAxIDogdiA9PT0gZmFsc2UgPyAwIDogTnVtYmVyKHYpKTtcblxudHlwZSBCb3hQcm9wUmVuZGVyZXIgPSB7XG4gICAgcHJvcE5hbWU6IHN0cmluZyB8IEFycmF5PHN0cmluZz47XG4gICAgZ2V0Q1NTPzogKHByb3BWYWx1ZT86IGFueSwgcHJvcHM/OiBhbnkpID0+IGFueTtcbiAgICBjc3NQcm9wZXJ0eT86IHN0cmluZyB8IEFycmF5PHN0cmluZz47XG4gICAgZ2V0VmFsdWU/OiAocHJvcFZhbHVlPzogYW55LCBwcm9wcz86IGFueSkgPT4gYW55O1xufTtcblxuY29uc3QgYm94UHJvcFJlbmRlcmVyczogQXJyYXk8Qm94UHJvcFJlbmRlcmVyPiA9IFtcbiAgICB7XG4gICAgICAgIHByb3BOYW1lOiBbXG4gICAgICAgICAgICAnYXMnLFxuICAgICAgICAgICAgJ2hpZ2hsaWdodEZvY3VzV2l0aGluJyxcbiAgICAgICAgICAgICdocmVmJyxcbiAgICAgICAgICAgICdwb3NpdGlvbicsXG4gICAgICAgICAgICAndGFiSW5kZXgnLFxuICAgICAgICAgICAgJ3pJbmRleCcsXG4gICAgICAgICAgICAnb25DbGljaycsXG4gICAgICAgIF0sXG4gICAgICAgIGdldENTUzogKFxuICAgICAgICAgICAgXyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBhcyxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZCxcbiAgICAgICAgICAgICAgICBoaWdobGlnaHRGb2N1c1dpdGhpbixcbiAgICAgICAgICAgICAgICBocmVmLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uLFxuICAgICAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgICAgIHpJbmRleCxcbiAgICAgICAgICAgICAgICBvbkNsaWNrLFxuICAgICAgICAgICAgfVxuICAgICAgICApID0+XG4gICAgICAgICAgICBoaWdobGlnaHRGb2N1c1dpdGhpbiB8fFxuICAgICAgICAgICAgaHJlZiB8fFxuICAgICAgICAgICAgb25DbGljayB8fFxuICAgICAgICAgICAgWydidXR0b24nLCAnYScsICdpbnB1dCcsICd0ZXh0YXJlYScsICdzZWxlY3QnXS5pbmNsdWRlcyhhcykgfHxcbiAgICAgICAgICAgIHR5cGVvZiB0YWJJbmRleCA9PT0gJ251bWJlcidcbiAgICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IGRpc2FibGVkID8gJ2RlZmF1bHQnIDogJ3BvaW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgIFtoaWdobGlnaHRGb2N1c1dpdGhpbiA/ICcmOmZvY3VzLXdpdGhpbicgOiAnJjpmb2N1cyddOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGBib3gtc2hhZG93OiAwIDAgMCAycHggd2hpdGUsIDAgMCAwIDZweCAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ09MT1JfUEFMRVRURVtTUE9UX0NPTE9SU1snZm9jdXNJbmRpY2F0b3InXV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfTtgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBgYm9yZGVyLXJhZGl1czogJHtCT1JERVJfUkFESUkubm9ybWFsfTtgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBgcG9zaXRpb246ICR7cG9zaXRpb24gfHwgJ3JlbGF0aXZlJ307YCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYHotaW5kZXg6ICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2YgekluZGV4ID09PSAnbnVtYmVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gekluZGV4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBaX0lOREVYRVNbekluZGV4IHx8ICcxLS1zdGlja3lFbGVtZW50cyddXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH07YCxcbiAgICAgICAgICAgICAgICAgICAgICBdLmpvaW4oJ1xcbicpLFxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDoge30sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHByb3BOYW1lOiAnYWRkaXRpb25hbENTUycsXG4gICAgICAgIGdldENTUzogKGFkZGl0aW9uYWxDU1MpID0+ICh7XG4gICAgICAgICAgICAnJic6IGFkZGl0aW9uYWxDU1MsXG4gICAgICAgIH0pLFxuICAgIH0sXG4gICAge1xuICAgICAgICBwcm9wTmFtZTogJ2FsaWduSXRlbXMnLFxuICAgICAgICBnZXRDU1M6IChhbGlnbkl0ZW1zKSA9PiAoe1xuICAgICAgICAgICAgJ2Rpc3BsYXknOiAnZmxleCcsXG4gICAgICAgICAgICAnYWxpZ24taXRlbXMnOiBhbGlnbkl0ZW1zLFxuICAgICAgICB9KSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcHJvcE5hbWU6ICdhbGlnblNlbGYnLFxuICAgICAgICBjc3NQcm9wZXJ0eTogJ2FsaWduLXNlbGYnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBwcm9wTmFtZTogJ2JhY2tncm91bmRDb2xvcicsXG4gICAgICAgIGNzc1Byb3BlcnR5OiAnYmFja2dyb3VuZC1jb2xvcicsXG4gICAgICAgIGdldFZhbHVlOiAoYmFja2dyb3VuZENvbG9yLCB7IGJhY2tncm91bmRDb2xvckxpZ2h0bmVzcyB9KSA9PlxuICAgICAgICAgICAgdG9Db2xvcihiYWNrZ3JvdW5kQ29sb3IsIGJhY2tncm91bmRDb2xvckxpZ2h0bmVzcyksXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHByb3BOYW1lOiAnYm9yZGVyJyxcbiAgICAgICAgY3NzUHJvcGVydHk6ICdib3JkZXInLFxuICAgICAgICBnZXRWYWx1ZTogKF8sIHByb3BzKSA9PiB0b0JvcmRlcignYm9yZGVyJywgcHJvcHMpLFxuICAgIH0sXG4gICAge1xuICAgICAgICBwcm9wTmFtZTogJ2JvcmRlckJvdHRvbScsXG4gICAgICAgIGNzc1Byb3BlcnR5OiAnYm9yZGVyLWJvdHRvbScsXG4gICAgICAgIGdldFZhbHVlOiAoXywgcHJvcHMpID0+IHRvQm9yZGVyKCdib3JkZXJCb3R0b20nLCBwcm9wcyksXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHByb3BOYW1lOiAnYm9yZGVyQm90dG9tQ29sb3InLFxuICAgICAgICBjc3NQcm9wZXJ0eTogJ2JvcmRlci1ib3R0b20tY29sb3InLFxuICAgICAgICBnZXRWYWx1ZTogKF8sIHByb3BzKSA9PiB0b0JvcmRlckNvbG9yKCdib3JkZXJCb3R0b20nLCBwcm9wcyksXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHByb3BOYW1lOiAnYm9yZGVyTGVmdCcsXG4gICAgICAgIGNzc1Byb3BlcnR5OiAnYm9yZGVyLWxlZnQnLFxuICAgICAgICBnZXRWYWx1ZTogKF8sIHByb3BzKSA9PiB0b0JvcmRlcignYm9yZGVyTGVmdCcsIHByb3BzKSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcHJvcE5hbWU6ICdib3JkZXJMZWZ0Q29sb3InLFxuICAgICAgICBjc3NQcm9wZXJ0eTogJ2JvcmRlci1sZWZ0LWNvbG9yJyxcbiAgICAgICAgZ2V0VmFsdWU6IChfLCBwcm9wcykgPT4gdG9Cb3JkZXJDb2xvcignYm9yZGVyTGVmdCcsIHByb3BzKSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcHJvcE5hbWU6ICdib3JkZXJSYWRpdXMnLFxuICAgICAgICBjc3NQcm9wZXJ0eTogJ2JvcmRlci1yYWRpdXMnLFxuICAgICAgICBnZXRWYWx1ZTogdG9Cb3JkZXJSYWRpdXMsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHByb3BOYW1lOiAnYm9yZGVyQm90dG9tTGVmdFJhZGl1cycsXG4gICAgICAgIGNzc1Byb3BlcnR5OiAnYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1cycsXG4gICAgICAgIGdldFZhbHVlOiB0b0JvcmRlclJhZGl1cyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcHJvcE5hbWU6ICdib3JkZXJCb3R0b21SaWdodFJhZGl1cycsXG4gICAgICAgIGNzc1Byb3BlcnR5OiAnYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXMnLFxuICAgICAgICBnZXRWYWx1ZTogdG9Cb3JkZXJSYWRpdXMsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHByb3BOYW1lOiAnYm9yZGVyVG9wTGVmdFJhZGl1cycsXG4gICAgICAgIGNzc1Byb3BlcnR5OiAnYm9yZGVyLXRvcC1sZWZ0LXJhZGl1cycsXG4gICAgICAgIGdldFZhbHVlOiB0b0JvcmRlclJhZGl1cyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcHJvcE5hbWU6ICdib3JkZXJUb3BSaWdodFJhZGl1cycsXG4gICAgICAgIGNzc1Byb3BlcnR5OiAnYm9yZGVyLXRvcC1yaWdodC1yYWRpdXMnLFxuICAgICAgICBnZXRWYWx1ZTogdG9Cb3JkZXJSYWRpdXMsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHByb3BOYW1lOiAnYm9yZGVyUmlnaHQnLFxuICAgICAgICBjc3NQcm9wZXJ0eTogJ2JvcmRlci1yaWdodCcsXG4gICAgICAgIGdldFZhbHVlOiAoXywgcHJvcHMpID0+IHRvQm9yZGVyKCdib3JkZXJSaWdodCcsIHByb3BzKSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcHJvcE5hbWU6ICdib3JkZXJSaWdodENvbG9yJyxcbiAgICAgICAgY3NzUHJvcGVydHk6ICdib3JkZXItcmlnaHQtY29sb3InLFxuICAgICAgICBnZXRWYWx1ZTogKF8sIHByb3BzKSA9PiB0b0JvcmRlckNvbG9yKCdib3JkZXJSaWdodCcsIHByb3BzKSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcHJvcE5hbWU6ICdib3JkZXJUb3AnLFxuICAgICAgICBjc3NQcm9wZXJ0eTogJ2JvcmRlci10b3AnLFxuICAgICAgICBnZXRWYWx1ZTogKF8sIHByb3BzKSA9PiB0b0JvcmRlcignYm9yZGVyVG9wJywgcHJvcHMpLFxuICAgIH0sXG4gICAge1xuICAgICAgICBwcm9wTmFtZTogJ2JvcmRlclRvcENvbG9yJyxcbiAgICAgICAgY3NzUHJvcGVydHk6ICdib3JkZXItdG9wLWNvbG9yJyxcbiAgICAgICAgZ2V0VmFsdWU6IChfLCBwcm9wcykgPT4gdG9Cb3JkZXJDb2xvcignYm9yZGVyVG9wJywgcHJvcHMpLFxuICAgIH0sXG4gICAge1xuICAgICAgICBwcm9wTmFtZTogJ2JvdHRvbScsXG4gICAgICAgIGNzc1Byb3BlcnR5OiAnYm90dG9tJyxcbiAgICAgICAgZ2V0VmFsdWU6IHRvR3JpZFNpemVPckxlbmd0aCxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcHJvcE5hbWU6ICdib3hTaGFkb3cnLFxuICAgICAgICBjc3NQcm9wZXJ0eTogJ2JveC1zaGFkb3cnLFxuICAgICAgICBnZXRWYWx1ZTogKGJveFNoYWRvdykgPT4gQk9YX1NIQURPV19TVFlMRVNbYm94U2hhZG93XSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcHJvcE5hbWU6ICdjb2xvcicsXG4gICAgICAgIGNzc1Byb3BlcnR5OiAnY29sb3InLFxuICAgICAgICBnZXRWYWx1ZTogKGNvbG9yLCB7IGNvbG9yTGlnaHRuZXNzIH0pID0+IHRvQ29sb3IoY29sb3IsIGNvbG9yTGlnaHRuZXNzKSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcHJvcE5hbWU6ICdjb2x1bW5HYXAnLFxuICAgICAgICBnZXRDU1M6IChjb2x1bW5HYXAsIHsgY29sdW1ucyB9KSA9PlxuICAgICAgICAgICAgY29sdW1uc1xuICAgICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgICAgICdjb2x1bW4tZ2FwJzogdG9HcmlkU2l6ZU9yTGVuZ3RoKGNvbHVtbkdhcCksXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgIFtDSElMRFJFTl9TRUxFQ1RPUl06IGBtYXJnaW4tbGVmdDogJHt0b0dyaWRTaXplT3JMZW5ndGgoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbkdhcFxuICAgICAgICAgICAgICAgICAgICAgICl9O2AsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgICBwcm9wTmFtZTogJ2NvbHVtbnMnLFxuICAgICAgICBnZXRDU1M6IChwcm9wVmFsdWUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNzc1Byb3BlcnR5VmFsdWUgPVxuICAgICAgICAgICAgICAgIHR5cGVvZiBwcm9wVmFsdWUgPT09ICdudW1iZXInIC8vIDMgPT4gJzFmciAxZnIgMWZyJ1xuICAgICAgICAgICAgICAgICAgICA/IGByZXBlYXQoJHtwcm9wVmFsdWV9LCAxZnIpYFxuICAgICAgICAgICAgICAgICAgICA6IEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSAvLyBbMSwgMiwgJzE1MHB4J10gPT4gJzFmciAyZnIgMTUwcHgnXG4gICAgICAgICAgICAgICAgICAgID8gcHJvcFZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoKGNvbHVtbikgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiBjb2x1bW4gPT09ICdudW1iZXInXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBgcmVwZWF0KCR7Y29sdW1ufSwgMWZyKWBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGNvbHVtblxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5qb2luKCcgJylcbiAgICAgICAgICAgICAgICAgICAgOiBwcm9wVmFsdWU7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgJ2Rpc3BsYXknOiAnZ3JpZCcsXG4gICAgICAgICAgICAgICAgJ2dyaWQtdGVtcGxhdGUtY29sdW1ucyc6IGNzc1Byb3BlcnR5VmFsdWUsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgICBwcm9wTmFtZTogJ2N1cnNvcicsXG4gICAgICAgIGNzc1Byb3BlcnR5OiAnY3Vyc29yJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcHJvcE5hbWU6ICdkaXNwbGF5JyxcbiAgICAgICAgY3NzUHJvcGVydHk6ICdkaXNwbGF5JyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcHJvcE5hbWU6ICdmbGV4RGlyZWN0aW9uJyxcbiAgICAgICAgZ2V0Q1NTOiAoZmxleERpcmVjdGlvbikgPT4gKHtcbiAgICAgICAgICAgICdkaXNwbGF5JzogJ2ZsZXgnLFxuICAgICAgICAgICAgJ2ZsZXgtZGlyZWN0aW9uJzogZmxleERpcmVjdGlvbixcbiAgICAgICAgfSksXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHByb3BOYW1lOiAnZmxleEdyb3cnLFxuICAgICAgICBjc3NQcm9wZXJ0eTogJ2ZsZXgtZ3JvdycsXG4gICAgICAgIGdldFZhbHVlOiB0b051bWJlcixcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcHJvcE5hbWU6ICdmbGV4U2hyaW5rJyxcbiAgICAgICAgY3NzUHJvcGVydHk6ICdmbGV4LXNocmluaycsXG4gICAgICAgIGdldFZhbHVlOiB0b051bWJlcixcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcHJvcE5hbWU6ICdmbGV4V3JhcCcsXG4gICAgICAgIGNzc1Byb3BlcnR5OiAnZmxleC13cmFwJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcHJvcE5hbWU6ICdmb250U2l6ZScsXG4gICAgICAgIGdldENTUzogKGZvbnRTaXplKSA9PiAoe1xuICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6IEZPTlRfU0laRVNbZm9udFNpemVdLFxuICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogTElORV9IRUlHSFRTW2ZvbnRTaXplXSxcbiAgICAgICAgfSksXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHByb3BOYW1lOiAnZm9udFN0eWxlJyxcbiAgICAgICAgY3NzUHJvcGVydHk6ICdmb250LXN0eWxlJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcHJvcE5hbWU6ICdmb250V2VpZ2h0JyxcbiAgICAgICAgY3NzUHJvcGVydHk6ICdmb250LXdlaWdodCcsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHByb3BOYW1lOiAnZ2FwJyxcbiAgICAgICAgZ2V0Q1NTOiAoZ2FwLCB7IGNvbHVtbnMsIGZsZXhEaXJlY3Rpb24gfSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3R5bGVzID0ge307XG5cbiAgICAgICAgICAgIGlmIChjb2x1bW5zID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXJnaW5FZGdlQnlGbGV4RGlyZWN0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICAnY29sdW1uJzogJ3RvcCcsXG4gICAgICAgICAgICAgICAgICAgICdjb2x1bW4tcmV2ZXJzZSc6ICdib3R0b20nLFxuICAgICAgICAgICAgICAgICAgICAncm93JzogJ2xlZnQnLFxuICAgICAgICAgICAgICAgICAgICAncm93LXJldmVyc2UnOiAncmlnaHQnLFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBzdHlsZXNbJ2Rpc3BsYXknXSA9ICdmbGV4JztcbiAgICAgICAgICAgICAgICBzdHlsZXNbQ0hJTERSRU5fU0VMRUNUT1JdID0gYG1hcmdpbi0ke1xuICAgICAgICAgICAgICAgICAgICBtYXJnaW5FZGdlQnlGbGV4RGlyZWN0aW9uW2ZsZXhEaXJlY3Rpb24gfHwgJ3JvdyddXG4gICAgICAgICAgICAgICAgfTogJHt0b0dyaWRTaXplT3JMZW5ndGgoZ2FwKX07YDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3R5bGVzWydnYXAnXSA9IHRvR3JpZFNpemVPckxlbmd0aChnYXApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gc3R5bGVzO1xuICAgICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgICBwcm9wTmFtZTogJ2hlaWdodCcsXG4gICAgICAgIGNzc1Byb3BlcnR5OiAnaGVpZ2h0JyxcbiAgICAgICAgZ2V0VmFsdWU6IHRvTGVuZ3RoLFxuICAgIH0sXG4gICAge1xuICAgICAgICBwcm9wTmFtZTogJ2hvdmVyUHJvcHMnLFxuICAgICAgICBnZXRDU1M6IChob3ZlclByb3BzKSA9PiAoe1xuICAgICAgICAgICAgJyY6aG92ZXIsICY6Zm9jdXMnOiBidWlsZEJveFN0eWxlcyhob3ZlclByb3BzKSxcbiAgICAgICAgfSksXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHByb3BOYW1lOiAnaXNGbGV4aWJsZScsXG4gICAgICAgIGNzc1Byb3BlcnR5OiBbJ2ZsZXgtZ3JvdycsICdmbGV4LXNocmluayddLFxuICAgICAgICBnZXRWYWx1ZTogKGlzRmxleGlibGUpID0+IHRvTnVtYmVyKGlzRmxleGlibGUpLFxuICAgIH0sXG4gICAge1xuICAgICAgICBwcm9wTmFtZTogJ2lzT25seUZvclNjcmVlblJlYWRlcnMnLFxuICAgICAgICBnZXRDU1M6IChpc09ubHlGb3JTY3JlZW5SZWFkZXJzKSA9PlxuICAgICAgICAgICAgaXNPbmx5Rm9yU2NyZWVuUmVhZGVyc1xuICAgICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgICAgICdwb3NpdGlvbic6ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgICAgICAgJ3dpZHRoJzogJzFweCcsXG4gICAgICAgICAgICAgICAgICAgICAgJ2hlaWdodCc6ICcxcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICdwYWRkaW5nJzogMCxcbiAgICAgICAgICAgICAgICAgICAgICAnbWFyZ2luJzogJy0xcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICdvdmVyZmxvdyc6ICdoaWRkZW4nLFxuICAgICAgICAgICAgICAgICAgICAgICdjbGlwJzogJ3JlY3QoMCwgMCwgMCwgMCknLFxuICAgICAgICAgICAgICAgICAgICAgICd3aGl0ZS1zcGFjZSc6ICdub3dyYXAnLFxuICAgICAgICAgICAgICAgICAgICAgICdib3JkZXInOiAwLFxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDoge30sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHByb3BOYW1lOiAnanVzdGlmeUNvbnRlbnQnLFxuICAgICAgICBnZXRDU1M6IChqdXN0aWZ5Q29udGVudCkgPT4gKHtcbiAgICAgICAgICAgICdkaXNwbGF5JzogJ2ZsZXgnLFxuICAgICAgICAgICAgJ2p1c3RpZnktY29udGVudCc6IGp1c3RpZnlDb250ZW50LFxuICAgICAgICB9KSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcHJvcE5hbWU6ICdqdXN0aWZ5U2VsZicsXG4gICAgICAgIGNzc1Byb3BlcnR5OiAnanVzdGlmeS1zZWxmJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcHJvcE5hbWU6ICdsZWZ0JyxcbiAgICAgICAgY3NzUHJvcGVydHk6ICdsZWZ0JyxcbiAgICAgICAgZ2V0VmFsdWU6IHRvR3JpZFNpemVPckxlbmd0aCxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcHJvcE5hbWU6ICdtYXJnaW4nLFxuICAgICAgICBjc3NQcm9wZXJ0eTogJ21hcmdpbicsXG4gICAgICAgIGdldFZhbHVlOiB0b0dyaWRTaXplT3JMZW5ndGgsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHByb3BOYW1lOiAnbWFyZ2luQm90dG9tJyxcbiAgICAgICAgY3NzUHJvcGVydHk6ICdtYXJnaW4tYm90dG9tJyxcbiAgICAgICAgZ2V0VmFsdWU6IHRvR3JpZFNpemVPckxlbmd0aCxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcHJvcE5hbWU6ICdtYXJnaW5MZWZ0JyxcbiAgICAgICAgY3NzUHJvcGVydHk6ICdtYXJnaW4tbGVmdCcsXG4gICAgICAgIGdldFZhbHVlOiB0b0dyaWRTaXplT3JMZW5ndGgsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHByb3BOYW1lOiAnbWFyZ2luUmlnaHQnLFxuICAgICAgICBjc3NQcm9wZXJ0eTogJ21hcmdpbi1yaWdodCcsXG4gICAgICAgIGdldFZhbHVlOiB0b0dyaWRTaXplT3JMZW5ndGgsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHByb3BOYW1lOiAnbWFyZ2luVG9wJyxcbiAgICAgICAgY3NzUHJvcGVydHk6ICdtYXJnaW4tdG9wJyxcbiAgICAgICAgZ2V0VmFsdWU6IHRvR3JpZFNpemVPckxlbmd0aCxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcHJvcE5hbWU6ICdtYXJnaW5YJyxcbiAgICAgICAgY3NzUHJvcGVydHk6IFsnbWFyZ2luLWxlZnQnLCAnbWFyZ2luLXJpZ2h0J10sXG4gICAgICAgIGdldFZhbHVlOiB0b0dyaWRTaXplT3JMZW5ndGgsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHByb3BOYW1lOiAnbWFyZ2luWScsXG4gICAgICAgIGNzc1Byb3BlcnR5OiBbJ21hcmdpbi10b3AnLCAnbWFyZ2luLWJvdHRvbSddLFxuICAgICAgICBnZXRWYWx1ZTogdG9HcmlkU2l6ZU9yTGVuZ3RoLFxuICAgIH0sXG4gICAge1xuICAgICAgICBwcm9wTmFtZTogJ21heExpbmVzJyxcbiAgICAgICAgZ2V0Q1NTOiAobWF4TGluZXMpID0+ICh7XG4gICAgICAgICAgICAnLXdlYmtpdC1ib3gtb3JpZW50JzogJ3ZlcnRpY2FsJyxcbiAgICAgICAgICAgICctd2Via2l0LWxpbmUtY2xhbXAnOiBtYXhMaW5lcyxcbiAgICAgICAgICAgICdkaXNwbGF5JzogJy13ZWJraXQtYm94JyxcbiAgICAgICAgICAgICdvdmVyZmxvdyc6ICdoaWRkZW4nLFxuICAgICAgICB9KSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcHJvcE5hbWU6ICdtYXhIZWlnaHQnLFxuICAgICAgICBjc3NQcm9wZXJ0eTogJ21heC1oZWlnaHQnLFxuICAgICAgICBnZXRWYWx1ZTogdG9MZW5ndGgsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHByb3BOYW1lOiAnbWF4V2lkdGgnLFxuICAgICAgICBjc3NQcm9wZXJ0eTogJ21heC13aWR0aCcsXG4gICAgICAgIGdldFZhbHVlOiB0b0xlbmd0aCxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcHJvcE5hbWU6ICdtaW5IZWlnaHQnLFxuICAgICAgICBjc3NQcm9wZXJ0eTogJ21pbi1oZWlnaHQnLFxuICAgICAgICBnZXRWYWx1ZTogdG9MZW5ndGgsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHByb3BOYW1lOiAnbWluV2lkdGgnLFxuICAgICAgICBjc3NQcm9wZXJ0eTogJ21pbi13aWR0aCcsXG4gICAgICAgIGdldFZhbHVlOiB0b0xlbmd0aCxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcHJvcE5hbWU6ICdvcGFjaXR5JyxcbiAgICAgICAgY3NzUHJvcGVydHk6ICdvcGFjaXR5JyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcHJvcE5hbWU6ICdvdmVyZmxvdycsXG4gICAgICAgIGNzc1Byb3BlcnR5OiAnb3ZlcmZsb3cnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBwcm9wTmFtZTogJ292ZXJmbG93WCcsXG4gICAgICAgIGNzc1Byb3BlcnR5OiAnb3ZlcmZsb3cteCcsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHByb3BOYW1lOiAnb3ZlcmZsb3dZJyxcbiAgICAgICAgY3NzUHJvcGVydHk6ICdvdmVyZmxvdy15JyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcHJvcE5hbWU6ICdwYWRkaW5nJyxcbiAgICAgICAgY3NzUHJvcGVydHk6ICdwYWRkaW5nJyxcbiAgICAgICAgZ2V0VmFsdWU6IHRvR3JpZFNpemVPckxlbmd0aCxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcHJvcE5hbWU6ICdwYWRkaW5nWCcsXG4gICAgICAgIGNzc1Byb3BlcnR5OiBbJ3BhZGRpbmctbGVmdCcsICdwYWRkaW5nLXJpZ2h0J10sXG4gICAgICAgIGdldFZhbHVlOiB0b0dyaWRTaXplT3JMZW5ndGgsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHByb3BOYW1lOiAncGFkZGluZ1knLFxuICAgICAgICBjc3NQcm9wZXJ0eTogWydwYWRkaW5nLXRvcCcsICdwYWRkaW5nLWJvdHRvbSddLFxuICAgICAgICBnZXRWYWx1ZTogdG9HcmlkU2l6ZU9yTGVuZ3RoLFxuICAgIH0sXG4gICAge1xuICAgICAgICBwcm9wTmFtZTogJ3BhZGRpbmdCb3R0b20nLFxuICAgICAgICBjc3NQcm9wZXJ0eTogJ3BhZGRpbmctYm90dG9tJyxcbiAgICAgICAgZ2V0VmFsdWU6IHRvR3JpZFNpemVPckxlbmd0aCxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcHJvcE5hbWU6ICdwYWRkaW5nTGVmdCcsXG4gICAgICAgIGNzc1Byb3BlcnR5OiAncGFkZGluZy1sZWZ0JyxcbiAgICAgICAgZ2V0VmFsdWU6IHRvR3JpZFNpemVPckxlbmd0aCxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcHJvcE5hbWU6ICdwYWRkaW5nUmlnaHQnLFxuICAgICAgICBjc3NQcm9wZXJ0eTogJ3BhZGRpbmctcmlnaHQnLFxuICAgICAgICBnZXRWYWx1ZTogdG9HcmlkU2l6ZU9yTGVuZ3RoLFxuICAgIH0sXG4gICAge1xuICAgICAgICBwcm9wTmFtZTogJ3BhZGRpbmdUb3AnLFxuICAgICAgICBjc3NQcm9wZXJ0eTogJ3BhZGRpbmctdG9wJyxcbiAgICAgICAgZ2V0VmFsdWU6IHRvR3JpZFNpemVPckxlbmd0aCxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcHJvcE5hbWU6ICdwb2ludGVyRXZlbnRzJyxcbiAgICAgICAgY3NzUHJvcGVydHk6ICdwb2ludGVyLWV2ZW50cycsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHByb3BOYW1lOiAncG9zaXRpb24nLFxuICAgICAgICBjc3NQcm9wZXJ0eTogJ3Bvc2l0aW9uJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcHJvcE5hbWU6ICdyZXNwb25zaXZlUHJvcHMnLFxuICAgICAgICBnZXRDU1M6IChyZXNwb25zaXZlUHJvcHMpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlcyA9IHt9O1xuICAgICAgICAgICAgY29uc3QgYnJlYWtwb2ludE5hbWVzID0gT2JqZWN0LmtleXMocmVzcG9uc2l2ZVByb3BzKTtcblxuICAgICAgICAgICAgYnJlYWtwb2ludE5hbWVzLmZvckVhY2goKGJyZWFrcG9pbnROYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYnJlYWtwb2ludFNlbGVjdG9yID1cbiAgICAgICAgICAgICAgICAgICAgUkVTUE9OU0lWRV9CUkVBS1BPSU5UU1ticmVha3BvaW50TmFtZV07XG4gICAgICAgICAgICAgICAgc3R5bGVzW2JyZWFrcG9pbnRTZWxlY3Rvcl0gPSBidWlsZEJveFN0eWxlcyhcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZVByb3BzW2JyZWFrcG9pbnROYW1lXVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHN0eWxlcztcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcHJvcE5hbWU6ICdyaWdodCcsXG4gICAgICAgIGNzc1Byb3BlcnR5OiAncmlnaHQnLFxuICAgICAgICBnZXRWYWx1ZTogdG9HcmlkU2l6ZU9yTGVuZ3RoLFxuICAgIH0sXG4gICAge1xuICAgICAgICBwcm9wTmFtZTogJ3Jvd0dhcCcsXG4gICAgICAgIGdldENTUzogKHJvd0dhcCwgeyBjb2x1bW5zLCBmbGV4RGlyZWN0aW9uIH0pID0+XG4gICAgICAgICAgICBjb2x1bW5zXG4gICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgICAgJ3Jvdy1nYXAnOiB0b0dyaWRTaXplT3JMZW5ndGgocm93R2FwKSxcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAnZGlzcGxheSc6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAnZmxleC1kaXJlY3Rpb24nOiBmbGV4RGlyZWN0aW9uIHx8ICdjb2x1bW4nLFxuICAgICAgICAgICAgICAgICAgICAgIFtDSElMRFJFTl9TRUxFQ1RPUl06IGBtYXJnaW4tdG9wOiAke3RvR3JpZFNpemVPckxlbmd0aChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcm93R2FwXG4gICAgICAgICAgICAgICAgICAgICAgKX07YCxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHByb3BOYW1lOiAndGV4dEFsaWduJyxcbiAgICAgICAgY3NzUHJvcGVydHk6ICd0ZXh0LWFsaWduJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcHJvcE5hbWU6ICd0ZXh0RGVjb3JhdGlvbicsXG4gICAgICAgIGNzc1Byb3BlcnR5OiAndGV4dC1kZWNvcmF0aW9uJyxcbiAgICAgICAgZ2V0VmFsdWU6ICh0ZXh0RGVjb3JhdGlvbikgPT4gVEVYVF9ERUNPUkFUSU9OU1t0ZXh0RGVjb3JhdGlvbl0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHByb3BOYW1lOiAndG9wJyxcbiAgICAgICAgY3NzUHJvcGVydHk6ICd0b3AnLFxuICAgICAgICBnZXRWYWx1ZTogdG9HcmlkU2l6ZU9yTGVuZ3RoLFxuICAgIH0sXG4gICAge1xuICAgICAgICBwcm9wTmFtZTogJ3RyYW5zZm9ybScsXG4gICAgICAgIGNzc1Byb3BlcnR5OiAndHJhbnNmb3JtJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcHJvcE5hbWU6ICd0cmFuc2l0aW9uRHVyYXRpb24nLFxuICAgICAgICBjc3NQcm9wZXJ0eTogJ3RyYW5zaXRpb24tZHVyYXRpb24nLFxuICAgICAgICBnZXRWYWx1ZTogKHRyYW5zaXRpb25EdXJhdGlvbikgPT5cbiAgICAgICAgICAgIHRyYW5zaXRpb25EdXJhdGlvbiBpbiBUUkFOU0lUSU9OX0RVUkFUSU9OU1xuICAgICAgICAgICAgICAgID8gVFJBTlNJVElPTl9EVVJBVElPTlNbdHJhbnNpdGlvbkR1cmF0aW9uXVxuICAgICAgICAgICAgICAgIDogdHlwZW9mIHRyYW5zaXRpb25EdXJhdGlvbiA9PT0gJ251bWJlcidcbiAgICAgICAgICAgICAgICA/IGAke3RyYW5zaXRpb25EdXJhdGlvbn1tc2BcbiAgICAgICAgICAgICAgICA6IHRyYW5zaXRpb25EdXJhdGlvbixcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcHJvcE5hbWU6ICd0cmFuc2l0aW9uUHJvcGVydHknLFxuICAgICAgICBnZXRDU1M6ICh0cmFuc2l0aW9uUHJvcGVydHksIHsgdHJhbnNpdGlvbkR1cmF0aW9uIH0pID0+ICh7XG4gICAgICAgICAgICAndHJhbnNpdGlvbi1wcm9wZXJ0eSc6IFtdLmNvbmNhdCh0cmFuc2l0aW9uUHJvcGVydHkpLmpvaW4oJywgJyksXG4gICAgICAgICAgICAuLi4oIXRyYW5zaXRpb25EdXJhdGlvbiAmJiB7XG4gICAgICAgICAgICAgICAgJ3RyYW5zaXRpb24tZHVyYXRpb24nOiBUUkFOU0lUSU9OX0RVUkFUSU9OUy5ub3JtYWwsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgfSksXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHByb3BOYW1lOiAndHJhbnNpdGlvblRpbWluZ0Z1bmN0aW9uJyxcbiAgICAgICAgZ2V0Q1NTOiAodHJhbnNpdGlvblRpbWluZ0Z1bmN0aW9uLCB7IHRyYW5zaXRpb25EdXJhdGlvbiB9KSA9PiAoe1xuICAgICAgICAgICAgJ3RyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uJzogdHJhbnNpdGlvblRpbWluZ0Z1bmN0aW9uLFxuICAgICAgICAgICAgLi4uKCF0cmFuc2l0aW9uRHVyYXRpb24gJiYge1xuICAgICAgICAgICAgICAgICd0cmFuc2l0aW9uLWR1cmF0aW9uJzogVFJBTlNJVElPTl9EVVJBVElPTlMubm9ybWFsLFxuICAgICAgICAgICAgfSksXG4gICAgICAgIH0pLFxuICAgIH0sXG4gICAge1xuICAgICAgICBwcm9wTmFtZTogJ3doaXRlU3BhY2UnLFxuICAgICAgICBjc3NQcm9wZXJ0eTogJ3doaXRlLXNwYWNlJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcHJvcE5hbWU6ICd3aWR0aCcsXG4gICAgICAgIGNzc1Byb3BlcnR5OiAnd2lkdGgnLFxuICAgICAgICBnZXRWYWx1ZTogdG9MZW5ndGgsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHByb3BOYW1lOiAnekluZGV4JyxcbiAgICAgICAgY3NzUHJvcGVydHk6ICd6LWluZGV4JyxcbiAgICAgICAgZ2V0VmFsdWU6ICh6SW5kZXgpID0+XG4gICAgICAgICAgICB0eXBlb2YgekluZGV4ID09PSAnbnVtYmVyJyA/IHpJbmRleCA6IFpfSU5ERVhFU1t6SW5kZXhdLFxuICAgIH0sXG5dO1xuXG4vLyBpc09ubHlGb3JTY3JlZW5SZWFkZXJzOiAnaXMtb25seS1mb3Itc2NyZWVuLXJlYWRlcnMnLFxuLy8gbWF4TGluZXM6ICdtYXgtbGluZXMnLFxuXG5jb25zdCBidWlsZEJveFN0eWxlcyA9IChwcm9wczogQm94U3R5bGVQcm9wcyA9IHt9KSA9PiB7XG4gICAgY29uc3QgY3NzUHJvcGVydGllcyA9IHt9O1xuICAgIGNvbnN0IG5lc3RlZFNlbGVjdG9ycyA9IHt9O1xuXG4gICAgYm94UHJvcFJlbmRlcmVycy5mb3JFYWNoKChib3hQcm9wUmVuZGVyZXIpID0+IHtcbiAgICAgICAgY29uc3QgeyBjc3NQcm9wZXJ0eSwgZ2V0Q1NTLCBnZXRWYWx1ZSwgcHJvcE5hbWUgfSA9IGJveFByb3BSZW5kZXJlcjtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICAoW10gYXMgQXJyYXk8c3RyaW5nPilcbiAgICAgICAgICAgICAgICAuY29uY2F0KHByb3BOYW1lKVxuICAgICAgICAgICAgICAgIC5ldmVyeSgodikgPT4gW251bGwsIHVuZGVmaW5lZF0uaW5jbHVkZXMocHJvcHNbdl0pKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChnZXRDU1MpIHtcbiAgICAgICAgICAgIGNvbnN0IGdlbmVyYXRlZENTUyA9IGdldENTUyhcbiAgICAgICAgICAgICAgICBBcnJheS5pc0FycmF5KHByb3BOYW1lKSA/IG51bGwgOiBwcm9wc1twcm9wTmFtZV0sXG4gICAgICAgICAgICAgICAgcHJvcHNcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGdlbmVyYXRlZENTUykuZm9yRWFjaCgoY3NzUHJvcGVydHkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoWycmJywgJ0AnLCAnOiddLmluY2x1ZGVzKGNzc1Byb3BlcnR5WzBdKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RvciA9IGNzc1Byb3BlcnR5O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXN0ZWRTZWxlY3RvcnNbc2VsZWN0b3JdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5lc3RlZFNlbGVjdG9yc1tzZWxlY3Rvcl0gPSAnJztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIG5lc3RlZFNlbGVjdG9yc1tzZWxlY3Rvcl0gKz0gZ2VuZXJhdGVkQ1NTW3NlbGVjdG9yXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjc3NQcm9wZXJ0aWVzW2Nzc1Byb3BlcnR5XSA9IGdlbmVyYXRlZENTU1tjc3NQcm9wZXJ0eV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHByb3BOYW1lID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgY29uc3QgcHJvcFZhbHVlID0gZ2V0VmFsdWVcbiAgICAgICAgICAgICAgICA/IGdldFZhbHVlKHByb3BzW3Byb3BOYW1lXSwgcHJvcHMpXG4gICAgICAgICAgICAgICAgOiBwcm9wc1twcm9wTmFtZV07XG5cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNzc1Byb3BlcnR5KSkge1xuICAgICAgICAgICAgICAgIGNzc1Byb3BlcnR5LmZvckVhY2goKGNzc1Byb3BlcnR5TmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjc3NQcm9wZXJ0aWVzW2Nzc1Byb3BlcnR5TmFtZV0gPSBwcm9wVmFsdWU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNzc1Byb3BlcnRpZXNbY3NzUHJvcGVydHkgYXMgc3RyaW5nXSA9IHByb3BWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY3NzRm9yUHJvcGVydGllcyA9IE9iamVjdC5rZXlzKGNzc1Byb3BlcnRpZXMpXG4gICAgICAgIC5zb3J0KClcbiAgICAgICAgLm1hcCgoY3NzUHJvcGVydHkpID0+IGAke2Nzc1Byb3BlcnR5fTogJHtjc3NQcm9wZXJ0aWVzW2Nzc1Byb3BlcnR5XX07YCk7XG5cbiAgICBjb25zdCBjc3NGb3JOZXN0ZWRTZWxlY3RvcnMgPSBPYmplY3Qua2V5cyhuZXN0ZWRTZWxlY3RvcnMpXG4gICAgICAgIC5zb3J0KClcbiAgICAgICAgLm1hcCgoc2VsZWN0b3IpID0+XG4gICAgICAgICAgICBbYCR7c2VsZWN0b3J9IHtgLCBuZXN0ZWRTZWxlY3RvcnNbc2VsZWN0b3JdLCAnfSddLmpvaW4oJ1xcbicpXG4gICAgICAgICk7XG5cbiAgICByZXR1cm4gWy4uLmNzc0ZvclByb3BlcnRpZXMsIC4uLmNzc0Zvck5lc3RlZFNlbGVjdG9yc10uam9pbignXFxuJyk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBidWlsZEJveFN0eWxlcztcbiJdfQ==