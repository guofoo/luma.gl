"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _math = require("math.gl");

var IDENTITY_MATRIX = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
var DEFAULT_MODULE_OPTIONS = {
  modelMatrix: IDENTITY_MATRIX,
  viewMatrix: IDENTITY_MATRIX,
  projectionMatrix: IDENTITY_MATRIX,
  cameraPositionWorld: [0, 0, 0]
};

function getUniforms() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_MODULE_OPTIONS;
  var prevUniforms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var uniforms = {};

  if (opts.modelMatrix !== undefined) {
    uniforms.modelMatrix = opts.modelMatrix;
  }

  if (opts.viewMatrix !== undefined) {
    uniforms.viewMatrix = opts.viewMatrix;
  }

  if (opts.projectionMatrix !== undefined) {
    uniforms.projectionMatrix = opts.projectionMatrix;
  }

  if (opts.cameraPositionWorld !== undefined) {
    uniforms.cameraPositionWorld = opts.cameraPositionWorld;
  }

  if (opts.projectionMatrix !== undefined || opts.viewMatrix !== undefined) {
    uniforms.viewProjectionMatrix = new _math.Matrix4(opts.projectionMatrix).multiplyRight(opts.viewMatrix);
  }

  return uniforms;
}

var common = "varying vec4 project_vPositionWorld;\nvarying vec3 project_vNormalWorld;\n\nvec4 project_getPosition_World() {\n  return project_vPositionWorld;\n}\n\nvec3 project_getNormal_World() {\n  return project_vNormalWorld;\n}\n";
var vs = "".concat(common, "\nuniform mat4 modelMatrix;\nuniform mat4 viewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewProjectionMatrix;\nuniform vec3 cameraPositionWorld;\n\nstruct World {\n  vec3 position;\n  vec3 normal;\n};\n\nWorld world;\n\nvoid project_setPosition(vec4 position) {\n  project_vPositionWorld = position;\n}\n\nvoid project_setNormal(vec3 normal) {\n  project_vNormalWorld = normal;\n}\n\nvoid project_setPositionAndNormal_World(vec3 position, vec3 normal) {\n  world.position = position;\n  world.normal = normal;\n}\n\nvoid project_setPositionAndNormal_Model(vec3 position, vec3 normal) {\n  world.position = (modelMatrix * vec4(position, 1.)).xyz;\n  world.normal = mat3(modelMatrix) * normal;\n}\n\nvec4 project_model_to_clipspace(vec4 position) {\n  return viewProjectionMatrix * modelMatrix * position;\n}\n\nvec4 project_model_to_clipspace(vec3 position) {\n  return viewProjectionMatrix * modelMatrix * vec4(position, 1.);\n}\n\nvec4 project_world_to_clipspace(vec3 position) {\n  return viewProjectionMatrix * vec4(position, 1.);\n}\n\nvec4 project_view_to_clipspace(vec3 position) {\n  return projectionMatrix * vec4(position, 1.);\n}\n\nvec4 project_to_clipspace(vec3 position) {\n  return viewProjectionMatrix * vec4(position, 1.);\n}\n");
var fs = "\n".concat(common);
var _default = {
  name: 'project',
  getUniforms: getUniforms,
  vs: vs,
  fs: fs
};
exports["default"] = _default;
//# sourceMappingURL=project.js.map