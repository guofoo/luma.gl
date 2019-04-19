import MODULAR_VS from './shaders/modular-vertex.glsl';
import MODULAR_FS from './shaders/modular-fragment.glsl';
export { registerShaderModules, setDefaultShaderModules } from './lib/resolve-modules';
export { assembleShaders } from './lib/assemble-shaders';
export { combineInjects } from './lib/inject-shader';
export { normalizeShaderModule } from './lib/filters/normalize-module';
export { getQualifierDetails, getPassthroughFS, typeToChannelSuffix, typeToChannelCount, convertToVec4 } from './utils/shader-utils';
export { default as fp32 } from './modules/fp32/fp32';
export { default as fp64 } from './modules/fp64/fp64';
export { default as project } from './modules/project/project';
export { default as lights } from './modules/lights/lights';
export { default as dirlight } from './modules/dirlight/dirlight';
export { default as picking } from './modules/picking/picking';
export { default as diffuse } from './modules/diffuse/diffuse';
export { gouraudlighting, phonglighting } from './modules/phong-lighting/phong-lighting';
export { default as pbr } from './modules/pbr/pbr';
export { default as _transform } from './modules/transform/transform';
export var MODULAR_SHADERS = {
  vs: MODULAR_VS,
  fs: MODULAR_FS,
  defaultUniforms: {}
};
//# sourceMappingURL=index.js.map