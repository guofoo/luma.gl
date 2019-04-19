import { assert } from '../utils';
export var ERR_CONTEXT = 'Invalid WebGLRenderingContext';
export var ERR_WEBGL = ERR_CONTEXT;
export var ERR_WEBGL2 = 'Requires WebGL2';
export function isWebGL(gl) {
  return Boolean(gl && Number.isFinite(gl._version));
}
export function isWebGL2(gl) {
  return Boolean(gl && gl._version === 2);
}
export function assertWebGLContext(gl) {
  assert(isWebGL(gl), ERR_CONTEXT);
}
export function assertWebGL2Context(gl) {
  assert(isWebGL2(gl), ERR_WEBGL2);
}
//# sourceMappingURL=webgl-checks.js.map