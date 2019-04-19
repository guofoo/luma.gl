const DEFAULT_MODULE_OPTIONS = {};

function getUniforms() {
  let opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_MODULE_OPTIONS;
  const uniforms = {};
  return uniforms;
}

const vs = "varying vec4 geometry_vPosition;\nvarying vec3 geometry_vNormal;\n\nvoid geometry_setNormal(vec3 normal) {\n  geometry_vNormal = normal;\n}\n\nvoid geometry_setPosition(vec4 position) {\n  geometry_vPosition = position;\n}\n\nvoid geometry_setPosition(vec3 position) {\n  geometry_vPosition = vec4(position, 1.);\n}\n";
const fs = "varying vec4 geometry_vPosition;\nvarying vec3 geometry_vNormal;\n\nvec4 geometry_getPosition() {\n  return geometry_vPosition;\n}\n\nvec3 geometry_getNormal() {\n  return geometry_vNormal;\n}\n";
export default {
  name: 'geometry',
  vs,
  fs,
  getUniforms
};
//# sourceMappingURL=geometry.js.map