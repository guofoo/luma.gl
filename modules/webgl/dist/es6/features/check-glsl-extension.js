import isOldIE from './check-old-ie';
import WEBGL_FEATURES from './webgl-features-table';
import { assert } from '../utils';
const compiledGlslExtensions = {};
export default function canCompileGLGSExtension(gl, cap) {
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  const feature = WEBGL_FEATURES[cap];
  assert(feature, cap);

  if (!isOldIE(options)) {
    return true;
  }

  if (cap in compiledGlslExtensions) {
    return compiledGlslExtensions[cap];
  }

  const extensionName = feature[0];
  const source = "#extension GL_".concat(extensionName, " : enable\nvoid main(void) {}");
  const shader = gl.createShader(35633);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const canCompile = gl.getShaderParameter(shader, 35713);
  gl.deleteShader(shader);
  compiledGlslExtensions[cap] = canCompile;
  return canCompile;
}
//# sourceMappingURL=check-glsl-extension.js.map