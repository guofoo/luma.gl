export const name = 'fog';
export function getUniforms() {
  let _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$fogEnable = _ref.fogEnable,
      fogEnable = _ref$fogEnable === void 0 ? false : _ref$fogEnable,
      _ref$fogColor = _ref.fogColor,
      fogColor = _ref$fogColor === void 0 ? [0.5, 0.5, 0.5] : _ref$fogColor,
      _ref$fogNear = _ref.fogNear,
      fogNear = _ref$fogNear === void 0 ? 1 : _ref$fogNear,
      _ref$fogFar = _ref.fogFar,
      fogFar = _ref$fogFar === void 0 ? 100 : _ref$fogFar;

  return {
    fog_uEnable: fogEnable,
    fog_uColor: fogColor,
    fog_uNear: fogNear,
    fog_uFar: fogFar
  };
}
export const vs = '';
export const fs = "\nuniform bool fog_uEnable;\nuniform vec3 fog_uColor;\nuniform float fog_uNear;\nuniform float fog_uFar;\nvec4 fog_filterColor(vec4 color) {\n  if (fog_uEnable) {\n    float depth = gl_FragCoord.z / gl_FragCoord.w;\n    float fogFactor = smoothstep(fog_uNear, fog_uFar, depth);\n    return mix(color, vec4(fog_uColor, gl_FragColor.w), fogFactor);\n  } else {\n    return color;\n  }\n}\n\n";
//# sourceMappingURL=index.js.map