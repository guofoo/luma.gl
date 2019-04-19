"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var DEFAULT_HIGHLIGHT_COLOR = new Uint8Array([0, 255, 255, 255]);
var DEFAULT_MODULE_OPTIONS = {
  pickingSelectedColor: null,
  pickingHighlightColor: DEFAULT_HIGHLIGHT_COLOR,
  pickingThreshold: 1.0,
  pickingActive: false
};

function getUniforms() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_MODULE_OPTIONS;
  var uniforms = {};

  if (opts.pickingSelectedColor !== undefined) {
    if (opts.pickingSelectedColor === null) {
      uniforms.picking_uSelectedColorValid = 0;
    } else {
      var selectedColor = [opts.pickingSelectedColor[0], opts.pickingSelectedColor[1], opts.pickingSelectedColor[2]];
      uniforms.picking_uSelectedColorValid = 1;
      uniforms.picking_uSelectedColor = selectedColor;
    }
  }

  if (opts.pickingHighlightColor !== undefined) {
    uniforms.picking_uHighlightColor = opts.pickingHighlightColor;
  }

  if (opts.pickingThreshold !== undefined) {
    uniforms.picking_uThreshold = opts.pickingThreshold;
  }

  if (opts.pickingActive !== undefined) {
    uniforms.picking_uActive = opts.pickingActive ? 1 : 0;
  }

  return uniforms;
}

var vs = "uniform vec3 picking_uSelectedColor;\nuniform float picking_uThreshold;\nuniform bool picking_uSelectedColorValid;\n\nout vec4 picking_vRGBcolor_Aselected;\n\nconst float COLOR_SCALE = 1. / 255.;\n\nbool isVertexPicked(vec3 vertexColor) {\n  return\n    picking_uSelectedColorValid &&\n    abs(vertexColor.r - picking_uSelectedColor.r) < picking_uThreshold &&\n    abs(vertexColor.g - picking_uSelectedColor.g) < picking_uThreshold &&\n    abs(vertexColor.b - picking_uSelectedColor.b) < picking_uThreshold;\n}\n\nvoid picking_setPickingColor(vec3 pickingColor) {\n  picking_vRGBcolor_Aselected.a =\n    float(isVertexPicked(pickingColor));\n  picking_vRGBcolor_Aselected.rgb = pickingColor * COLOR_SCALE;\n}\n";
var fs = "uniform bool picking_uActive;\nuniform vec3 picking_uSelectedColor;\nuniform vec4 picking_uHighlightColor;\n\nin vec4 picking_vRGBcolor_Aselected;\n\nconst float COLOR_SCALE = 1. / 255.;\nvec4 picking_filterHighlightColor(vec4 color) {\n  bool selected = bool(picking_vRGBcolor_Aselected.a);\n\n  if (selected) {\n    vec4 highLightColor = picking_uHighlightColor * COLOR_SCALE;\n\n    float highLightAlpha = highLightColor.a;\n    float blendedAlpha = highLightAlpha + color.a * (1.0 - highLightAlpha);\n    float highLightRatio = highLightAlpha / blendedAlpha;\n\n    vec3 blendedRGB = mix(color.rgb, highLightColor.rgb, highLightRatio);\n    return vec4(blendedRGB, blendedAlpha);\n  } else {\n    return color;\n  }\n}\nvec4 picking_filterPickingColor(vec4 color) {\n  vec3 pickingColor = picking_vRGBcolor_Aselected.rgb;\n  if (picking_uActive && length(pickingColor) < 0.001) {\n    discard;\n  }\n  return picking_uActive ? vec4(pickingColor, 1.0) : color;\n}\nvec4 picking_filterColor(vec4 color) {\n  vec4 highightColor = picking_filterHighlightColor(color);\n  return picking_filterPickingColor(highightColor);\n}\n\n";
var _default = {
  name: 'picking',
  vs: vs,
  fs: fs,
  getUniforms: getUniforms
};
exports["default"] = _default;
//# sourceMappingURL=picking.js.map